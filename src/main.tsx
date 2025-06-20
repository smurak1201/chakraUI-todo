// ===============================
// アプリのエントリーポイント
// ===============================
// Provider: Chakra UIやカラーモードの設定を全体に適用するラッパー
import { Provider } from "@/components/ui/provider";
// React本体のインポート
import React from "react";
// React 18以降の新しいレンダリング用API
import ReactDOM from "react-dom/client";
// アプリ本体のコンポーネント
import App from "./App";

// ===============================
// Reactアプリの描画処理
// ===============================
// 1. index.html内の<div id="root">を取得
// 2. ReactのStrictModeでアプリ全体をラップ（開発時のバグ検出を強化）
// 3. ProviderでChakra UIやカラーモードの設定を全体に適用
// 4. Appコンポーネントが実際の画面UI
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
