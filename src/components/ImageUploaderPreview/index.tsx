"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import type { ImagePreviewProps } from "./type";

const DEFAULT_ACCEPT = "image/png,image/jpeg";
const DEFAULT_MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

// バイト数を「3MB」「100KB」のような表示用の文字列にする（上限の表示なので切り捨て）
const formatFileSize = (bytes: number) => {
  const mb = bytes / 1024 / 1024;
  if (mb >= 1) return `${Math.floor(mb * 10) / 10}MB`;
  return `${Math.floor(bytes / 1024)}KB`;
};

const ImageUploaderPreview = ({
  imageFile,
  accept = DEFAULT_ACCEPT,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  disabled = false,
  onChange,
}: ImagePreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // previewUrl の型（画像の URL が入る / 未選択なら ""
  const [previewUrl, setPreviewUrl] = useState<string>(imageFile || "");
  const [error, setError] = useState<string | null>(null);

  // 作成した blob URL を解放する（メモリリーク対策）
  useEffect(() => {
    return () => {
      // blob URL を解放する関数
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openFileDialog = () => fileInputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 選択されたファイルを 1 つ取り出す（未選択なら undefined）
    const file = e.target.files?.[0];

    // 同じファイルを選び直しても onChange が発火するように input の値をリセットする
    e.target.value = "";
    if (!file) return;

    if (!accept.split(",").includes(file.type)) {
      setError("png / jpg / jpeg 形式の画像を選択してください");
      return;
    }
    if (file.size > maxFileSize) {
      setError(`ファイルサイズは${formatFileSize(maxFileSize)}以下にしてください`);
      return;
    }

    setError(null);
    // File からプレビュー用の URL を作る
    setPreviewUrl(URL.createObjectURL(file));
    // 親コンポーネントに選択したファイルを渡す（onChange は省略可能）
    onChange?.(file);
  };

  return (
    <>
      {/* wrapper は画像の有無にかかわらず常に表示する */}
      <div className={`${styles.wrapper} ${previewUrl ? styles.hasImage : ""}`}>
        {/* プレビューする画像があるかどうかで表示を切り替える */}
        {previewUrl ? (
          // 画像があるとき：画像をクリックすると選び直せる
          <button
            type="button"
            className={styles.imageButton}
            disabled={disabled}
            onClick={openFileDialog}
            aria-label="画像を選び直す"
          >
            <Image src={previewUrl} alt="プレビュー画像" fill className={styles.image} unoptimized />
          </button>
        ) : (
          // 画像がないとき：アップロードボタンを表示 後にボタンコンポーネントに置き換え
          <button type="button" disabled={disabled} onClick={openFileDialog}>
            画像アップロード
          </button>
        )}
      </div>
      {/* ref と onChange を input に紐づける */}
      <input type="file" accept={accept} ref={fileInputRef} onChange={handleChange} hidden />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default ImageUploaderPreview;
