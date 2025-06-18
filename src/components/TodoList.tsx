// Chakra UIのレイアウト・UI部品をインポート
import { Box, Stack, Flex, IconButton, useToken } from "@chakra-ui/react";
// ゴミ箱アイコン
import { MdDelete } from "react-icons/md";
// 背景色を半透明にするユーティリティ
import { transparentize } from "@chakra-ui/theme-tools";
// カラーモード取得用
import { useColorMode } from "@/components/ui/color-mode";

// TodoListコンポーネントのprops型定義
interface TodoListProps {
  todos: string[]; // Todoリスト配列
  removeTodo: (index: number) => void; // Todo削除関数
}

// Todoリスト本体
export function TodoList({ todos, removeTodo }: TodoListProps) {
  // カラーモード取得
  const { colorMode } = useColorMode();
  // テーマカラー取得
  const [gray700, white] = useToken("colors", ["gray.700", "white"]);
  // リストアイテムの背景色をカラーモードで半透明に
  const itemBg = (
    colorMode === "dark"
      ? transparentize(gray700, 0.7)
      : transparentize(white, 0.7)
  ).toString();

  return (
    // リスト全体のラッパー
    <Box w="100%" maxW="md">
      {/* Todoリスト（縦並び） */}
      <Stack gap={3}>
        {todos.map((todo, idx) => (
          // 1つのTodoアイテム
          <Flex
            key={idx}
            align="center"
            justify="space-between"
            bg={itemBg}
            p={3}
            borderRadius="md"
            boxShadow="sm"
          >
            {/* Todoの内容 */}
            {todo}
            {/* 削除ボタン */}
            <IconButton
              aria-label="削除"
              colorScheme="red"
              variant="ghost"
              size="sm"
              onClick={() => removeTodo(idx)}
            >
              <MdDelete />
            </IconButton>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
