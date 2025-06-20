// ===============================
// カラーモード切替ボタンコンポーネント
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
    <Button
      ref={btnRef}
      onClick={handleClick}
      zIndex={2}
      position="relative"
      size="sm"
      variant="outline"
      colorScheme="teal"
      fontWeight="bold"
      borderRadius="md"
      boxShadow="md"
      letterSpacing={1}
    >
      カラーモード切替
    </Button>
  );
}
// --- 学習用コメント ---
// ・アニメーションなしで即座にカラーモードを切り替えるシンプルな実装
// ・Chakra UIのuseColorModeでカラーモードを制御
// ・useColorModeは、カラーモード（ライトモード・ダークモード）を切り替えるためのカスタムフック
// ・toggleColorMode関数を呼び出すことで、現在のカラーモードが即座に反転
// ・ボタンをクリックするだけで、簡単にカラーモードを切り替え可能
