// ===============================
// useAuth: ログイン状態・認証処理をまとめたカスタムフック
// ===============================
import { useState } from "react";

export function useAuth() {
  // ログイン状態
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  // ログイン処理
  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  // ログアウト処理
  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
  };

  return {
    isLoggedIn,
    login,
    logout,
    setIsLoggedIn,
  };
}
