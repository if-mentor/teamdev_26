"use client";

// setIsAuthenticatedが使われていないという警告が出るので、isAuthenticatedをfalseに固定するようにしています。
// import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const Header = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = false;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {isAuthenticated ? (
          <>
            <Link className={styles.leftLink} href="/articles/new">
              新規作成
            </Link>

            <Link className={styles.rightLink} href="#">
              ログアウト
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.leftLink} href="/login">
              ログイン
            </Link>

            <Link className={styles.rightLink} href="/signup">
              新規登録
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
