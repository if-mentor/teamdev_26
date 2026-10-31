"use client";

import { useState } from "react";
import TextBox from "@/components/TextBox";

const TestTextBox = () => {
  const [value, setValue] = useState("");

  const error =
    value.length > 0 && (value.length < 10 || value.length > 1000)
      ? "記事詳細は10字〜1000文字で入力してください"
      : undefined;
  return (
    <div style={{ width: "720px", margin: "0 auto", padding: "60px 0" }}>
      <TextBox
        name="content"
        value={value}
        minLength={10}
        maxLength={1000}
        onChange={(e) => setValue(e.target.value)}
        error={error}
      />
    </div>
  );
};

export default TestTextBox;
