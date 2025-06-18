// ===============================
// カラーモード切替ボタンコンポーネント
// シンプルなカラーモード切替（アニメーションなし）
// ===============================

// Chakra UIのButtonをインポート
import { Button } from "@chakra-ui/react";
// カラーモード切替用のカスタムフックをインポート
import { useColorMode } from "@/components/ui/color-mode";
import { useRef } from "react";

// ===============================
// ColorModeToggle: カラーモード切替ボタン本体
// ===============================
export function ColorModeToggle() {
  // Chakra UIのカラーモード切替関数を取得
  const { toggleColorMode } = useColorMode();
  // ボタン要素への参照（今後の拡張用）
  const btnRef = useRef<HTMLButtonElement>(null);

  // ボタンクリック時に即座にカラーモードを切り替える
  const handleClick = () => {
    toggleColorMode();
  };

  return (
    // ボタンのみを表示（アニメーションなし）
    <div
      style={{ position: "relative", alignSelf: "flex-end", marginBottom: 16 }}
    >
      <Button ref={btnRef} onClick={handleClick} zIndex={2} position="relative">
        カラーモード切替
      </Button>
    </div>
  );
}
// --- 学習用コメント ---
// ・アニメーションなしで即座にカラーモードを切り替えるシンプルな実装
// ・Chakra UIのuseColorModeでカラーモードを制御
