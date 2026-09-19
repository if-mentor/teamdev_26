// import styles from "./styles.module.css";

import SelectBox from "@/components/SelectBox/SelectBox";
import type { Option } from "@/components/SelectBox/type";

const options: Option[] = [
  {
    id: 1,
    value: "東京",
  },
  {
    id: 2,
    value: "大阪",
  },
  {
    id: 3,
    value: "福岡",
  },
];

export default function Home() {
  return (
    // <div>
    //   <h1 className={styles.title}>Hello Teamdev!!</h1>
    // </div>

    <SelectBox options={options} label="カテゴリー" placeholder="カテゴリ選択" />
  );
}
