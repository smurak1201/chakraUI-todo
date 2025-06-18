import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  IconButton,
  useToken,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useColorMode } from "@/components/ui/color-mode";
import { transparentize } from "@chakra-ui/theme-tools";

export default function App() {
  // Todoリストの状態（配列）
  const [todos, setTodos] = useState<string[]>([]);
  // 入力欄の状態
  const [input, setInput] = useState("");
  // カラーモード（light/dark）切替用のフック
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra UIのカラートークン（テーマカラー）を取得
  const [teal500, gray700, white] = useToken("colors", [
    "teal.500",
    "gray.700",
    "white",
  ]);

  // Todoを追加する関数
  const addTodo = () => {
    if (input.trim() === "") return; // 空文字は追加しない
    setTodos([...todos, input.trim()]); // 新しいTodoを追加
    setInput(""); // 入力欄をクリア
  };

  // 指定したTodoを削除する関数
  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // リストアイテムの背景色をカラーモードに応じて半透明で設定
  const itemBg = (
    colorMode === "dark"
      ? transparentize(gray700, 0.7)
      : transparentize(white, 0.7)
  ).toString();

  return (
    // 全体レイアウト
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      p={8}
    >
      {/* カラーモード切替ボタン */}
      <Button onClick={toggleColorMode} alignSelf="flex-end" mb={4}>
        カラーモード切替
      </Button>
      {/* タイトル */}
      <Heading mb={6} color={teal500}>
        Chakra UI Todoアプリ
      </Heading>
      {/* Todo追加フォーム */}
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault(); // フォーム送信時のリロード防止
          addTodo();
        }}
        mb={6}
        gap={2}
      >
        <Input
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          bg={colorMode === "dark" ? gray700 : white}
        />
        <Button colorScheme="teal" onClick={addTodo} type="submit">
          追加
        </Button>
      </Flex>
      {/* Todoリスト表示エリア */}
      <Box w="100%" maxW="md">
        <Stack gap={3}>
          {todos.map((todo, idx) => (
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
              {/* 削除ボタン（ゴミ箱アイコン） */}
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
    </Flex>
  );
}
