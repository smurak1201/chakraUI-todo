// Chakra UIのButtonをインポート
import { Button } from "@chakra-ui/react";
// カラーモード切替用のカスタムフックをインポート
import { useColorMode } from "@/components/ui/color-mode";

// カラーモード切替ボタン本体
export function ColorModeToggle() {
  // カラーモードをトグルする関数を取得
  const { toggleColorMode } = useColorMode();
  return (
    // 右上に配置するカラーモード切替ボタン
    <Button onClick={toggleColorMode} alignSelf="flex-end" mb={4}>
      カラーモード切替
    </Button>
  );
}
