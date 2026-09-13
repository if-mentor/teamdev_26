# 目次

- [環境構築](#環境構築)
- [開発フロー](#開発フロー)
  - [Issue](#1-issue)
  - [Branch](#2-branch)
  - [Commit](#3-commit)
  - [PullRequest](#4-pullrequest)
- [使用技術](#使用技術)

# 環境構築

**1. リポジトリのclone**

```sh
git clone ~~~
```

**2. 依存関係のインストール**

```sh
npm install
```

**3. 環境変数の設定**

```sh
cp .env.example .env.local
```

**4. 起動方法**

```sh
npm run dev
```

**5. 動作確認**

```
http://localhost:3000
```

# 開発フロー

## 1. Issue

1. Issue を作成してください。
2. Assignees で担当者を指定してください。
3. Projects で GitHub Projects のタスクに紐付けてください。

### バグ報告の際の注意

- バグや表示崩れに関しては、Issue タイプを「Bug report」としてください。
- 実装途中にバグを発見した場合でも、個別に Issue を作成してください。
- 必要であればミーティングで修正対応を議論します。

## 2. Branch

### ブランチ命名規則（`プレフィックス/カテゴリ/内容`の形式）

- **プレフィックス（対象）**
  - `fe`: フロントエンド
  - `be`: バックエンド

- **カテゴリ**
  - `feature`: 機能追加
  - `fix`: リファクタリングや軽微な修正
  - `bug`: バグ修正

**＜例＞**

```sh
# switch コマンド
git switch -c 'fe/feature/home'

# checkout コマンド
git checkout -b 'fe/feature/home'
```

## 3. Commit

### コミットメッセージルール

コミットメッセージは、 **「どの種類の変更を」「何に対して」「何をしたのか」** が明確にわかるように記述してください。

**基本フォーマット**
```
<Prefix>: <対象> <変更内容>
```

**例：**
```
git commit -m 'feat: ログイン画面 作成'
git commit -m 'fix: ログイン画面 パスワード入力エラーを修正'
git commit -m 'chore: 開発環境 Docker 設定を更新'
```

**Prefix**

変更内容に応じて、以下のPrefixを使用してください。

| Prefix | 用途 | 例 |
| --- | --- | --- |
|feat | 新しい機能・画面の追加 | feat: 商品一覧画面 作成|
|fix | バグ・不具合の修正 | fix: ログイン画面 バリデーションエラーを修正|
|chore | 設定変更・依存関係更新・雑務など | chore: ESLint 設定を更新|
|docs | ドキュメントの追加・変更 | docs: README セットアップ手順を追加|
|test |	テストの追加・修正 | test: ログイン処理のテストを追加|

## 4. PullRequest

### 1. プルリクエスト前に行うこと

- プルリクエストを上げる前に必ず、自分が作業を行なっているブランチで `git pull origin main` を行うこと。
- コンフリクトが発生した場合は、ローカル上で解決してください。解決の仕方がわからない場合は、メンバーに相談する。

### 2. パッケージ更新の確認

- package に更新がないか、確認するため、 `npm install` コマンドを実行する。<br/>

### 3. プルリクエスト作成時のルール

- `develop` ブランチへのマージを作成してください。
- Issue 番号を必ず紐づけてください（例: `#1`）。
- `Assignees` にPR作成者を指定してください。
- `Reviewers` にレビュー担当者を指定してください。
- PR 内でメンションし、レビュー依頼してください。

### 4. マージルール

- マージ時は **`Squash and merge`** を選択

## 使用技術

### フロントエンド

- [HTML](https://developer.mozilla.org/ja/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/ja/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org)
- [React](https://ja.react.dev)
- [Next.js](https://nextjs.org)

### バックエンド

- [Node.js](https://nodejs.org)
- [Supabase](https://supabase.com)
- [Prisma](https://www.prisma.io)

### インフラ

- [Vercel](https://vercel.com)

### ツール

- [Postman](https://www.postman.com)
- [GitHub](https://github.co.jp)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm-version)
