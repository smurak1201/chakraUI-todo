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
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra UIのカラートークンを取得
  const [teal500, gray700, white] = useToken("colors", [
    "teal.500",
    "gray.700",
    "white",
  ]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // テーマツールで背景色を半透明にカスタマイズ
  const itemBg = (
    colorMode === "dark"
      ? transparentize(gray700, 0.7)
      : transparentize(white, 0.7)
  ).toString();

  return (
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      p={8}
    >
      <Button onClick={toggleColorMode} alignSelf="flex-end" mb={4}>
        カラーモード切替
      </Button>
      <Heading mb={6} color={teal500}>
        Chakra UI Todoアプリ
      </Heading>
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
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
              {todo}
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
