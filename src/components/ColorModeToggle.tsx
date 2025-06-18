// ===============================
// カラーモード切替ボタンコンポーネント
// Chakra UI + framer-motionでアニメーション付き
// ===============================

// Chakra UIのButtonをインポート
import { Button } from "@chakra-ui/react";
// カラーモード切替用のカスタムフックをインポート
import { useColorMode } from "@/components/ui/color-mode";
import { useRef, useState } from "react";
// framer-motionでアニメーションを制御
import { motion, AnimatePresence } from "framer-motion";

// ===============================
// ColorModeToggle: カラーモード切替ボタン本体
// ===============================
export function ColorModeToggle() {
  // Chakra UIのカラーモード切替関数を取得
  const { toggleColorMode } = useColorMode();
  // アニメーション中かどうかの状態
  const [animating, setAnimating] = useState(false);
  // ボタン要素への参照（今後の拡張用）
  const btnRef = useRef<HTMLButtonElement>(null);

  // ボタンクリック時の処理
  // 1. アニメーション開始
  // 2. 0.4秒後にカラーモード切替
  // 3. アニメーション終了
  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      toggleColorMode();
      setAnimating(false);
    }, 400); // アニメーション後に切替
  };

  return (
    // ボタンとアニメーション円を重ねるためrelative配置
    <div
      style={{ position: "relative", alignSelf: "flex-end", marginBottom: 16 }}
    >
      {/* カラーモード切替ボタン */}
      <Button ref={btnRef} onClick={handleClick} zIndex={2} position="relative">
        カラーモード切替
      </Button>
      {/* アニメーション用の円。animating=trueの間だけ表示 */}
      <AnimatePresence>
        {animating && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }} // 初期状態: 小さく半透明
            animate={{ scale: 8, opacity: 0 }} // 拡大しつつ透明に
            exit={{ opacity: 0 }} // 終了時: 透明
            transition={{ duration: 0.4, ease: "easeOut" }} // 0.4秒で実行
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "currentColor",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
