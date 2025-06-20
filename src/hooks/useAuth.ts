// ===============================
// useAuth: ログイン状態・認証処理をまとめたカスタムフック
// ===============================
import { useState } from "react";

export function useAuth() {
  // ログイン状態
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // ログイン処理
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  // ログアウト処理
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return {
    isLoggedIn,
    login,
    logout,
    setIsLoggedIn,
  };
}
