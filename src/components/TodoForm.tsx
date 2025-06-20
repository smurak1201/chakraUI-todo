// ===============================
// Todo追加フォームのコンポーネント
// ===============================
// Chakra UIのButton, Flex, Inputをインポート
import { Button, Flex, Input, Box } from "@chakra-ui/react";
// カラーモード切替用のカスタムフックをインポート
import { useColorMode } from "@/components/ui/color-mode";

// ===============================
// TodoFormコンポーネントのprops型定義
// ===============================
interface TodoFormProps {
  input: string; // 入力欄の値
  setInput: (v: string) => void; // 入力欄の値を更新する関数
  addTodo: () => void; // Todoを追加する関数
}

// ===============================
// Todo追加フォーム本体
// ===============================
export function TodoForm({ input, setInput, addTodo }: TodoFormProps) {
  // カラーモード取得（dark/light）
  const { colorMode } = useColorMode();

  return (
    <Box position="relative" w="100%">
      {/* フォーム全体のレイアウト */}
      <Box w="100%" maxW="md" mx="auto" mb={6}>
        <Flex
          as="form"
          onSubmit={(e) => {
            e.preventDefault(); // フォーム送信時のリロード防止
            addTodo(); // Todo追加処理
          }}
          gap={2}
          bg={colorMode === "dark" ? "gray.800" : "white"}
          borderRadius="md"
          boxShadow="md"
          p={{ base: 2, md: 4 }}
          align="center"
        >
          {/* 入力欄 */}
          <Input
            placeholder="新しいタスクを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)} // 入力値の変更を反映
            bg={colorMode === "dark" ? "gray.700" : "gray.100"} // カラーモードで背景色切替
            fontSize="16px" // スマホでの自動ズーム防止
            flex={1}
          />
          {/* 追加ボタン */}
          <Button
            colorScheme="teal"
            type="submit"
            variant="outline"
            fontSize="16px"
          >
            追加
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
