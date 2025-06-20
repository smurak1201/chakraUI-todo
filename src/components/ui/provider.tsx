// ===============================
// Chakra UIとカラーモードProviderのラッパー
// ===============================
"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

// ===============================
// Provider: アプリ全体にChakra UIとカラーモードを適用する
// ===============================
export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
// --- 学習用コメント ---
// ・このProviderでアプリ全体にChakra UIのデザインとカラーモードを適用できる
// ・App.tsxの外側で使うことで全体にテーマが効く
