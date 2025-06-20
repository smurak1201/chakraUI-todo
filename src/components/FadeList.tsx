// ===============================
// アニメーション付きリスト表示コンポーネント
// ===============================
// framer-motionのアニメーション用コンポーネントをインポート
import { AnimatePresence, motion } from "framer-motion";
// 型インポート（verbatimModuleSyntax対応）
import type { ReactNode } from "react";

interface FadeListProps {
  children: ReactNode[];
  gap?: number;
}

// ===============================
// FadeList: 子要素の追加・削除時にfadeアニメーションを付与するリスト
// ===============================
export function FadeList({ children, gap = 12 }: FadeListProps) {
  return (
    <AnimatePresence initial={false}>
      {children.map((child, idx) => (
        <motion.div
          key={(child as any).key ?? idx} // Reactのkeyを利用
          initial={{ opacity: 0, y: 16 }} // 追加時: 下からフェードイン
          animate={{ opacity: 1, y: 0 }} // 表示時: 通常表示
          exit={{ opacity: 0, y: -16 }} // 削除時: 上にフェードアウト
          transition={{ duration: 0.25 }} // アニメーション速度
          style={{
            width: "100%",
            marginBottom: idx !== children.length - 1 ? gap : 0,
          }}
        >
          {child}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
// --- 学習用コメント ---
// ・framer-motionを使うと、要素の追加・削除にアニメーションを簡単に付けられる
// ・keyはReactの再描画のために必須
