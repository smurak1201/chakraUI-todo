// ===============================
// カラーモード切替ボタンコンポーネント
// ===============================
import { ColorModeButton } from "@/components/ui/color-mode";

// ColorModeToggle: ColorModeButtonのラッパー（後方互換用）
export function ColorModeToggle() {
  return <ColorModeButton />;
}
// --- 学習用コメント ---
// ・ColorModeButtonはカラーモード切替の共通UI
// ・今後はColorModeButtonを直接使うことで重複を防げる
