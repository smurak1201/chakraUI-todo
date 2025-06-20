// ReactのuseStateフックをインポート
import { useState } from "react";
// Chakra UIのレイアウト・見出し・カラートークン取得フック
import { Flex, Heading, useToken } from "@chakra-ui/react";
// カラーモード切替ボタン
import { ColorModeToggle } from "./components/ColorModeToggle";
// Todo追加フォーム
import { TodoForm } from "./components/TodoForm";
// Todoリスト
import { TodoList } from "./components/TodoList";

// アプリ全体のレイアウトコンポーネント
export default function App() {
  // Todoリストの状態
  const [todos, setTodos] = useState<string[]>([]);
  // 入力欄の状態
  const [input, setInput] = useState("");
  // Chakra UIのテーマカラー取得
  const [teal500] = useToken("colors", ["teal.500"]);

  // Todo追加処理
  const addTodo = () => {
    if (input.trim() === "") return; // 空白のみなら追加しない
    // 入力値をトリムして空白を除去し、Todoリストに追加
    setTodos([...todos, input.trim()]);
    setInput("");
  };
  // Todo削除処理
  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  // Todo編集処理
  const updateTodo = (index: number, value: string) => {
    if (value.trim() === "") return; // 空白のみなら編集しない
    setTodos(todos.map((t, i) => (i === index ? value : t)));
  };

  return (
    // 全体レイアウト
    <Flex direction="column" align="center" minH="100vh" p={8}>
      {/* カラーモード切替ボタン */}
      <ColorModeToggle />
      {/* タイトル */}
      <Heading mb={6} color={teal500}>
        Chakra UI Todoアプリ
      </Heading>
      {/* Todo追加フォーム */}
      <TodoForm input={input} setInput={setInput} addTodo={addTodo} />
      {/* Todoリスト */}
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        setTodos={setTodos}
      />
    </Flex>
  );
}
