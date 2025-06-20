// ReactのuseStateフックをインポート
import { useState, useEffect } from "react";
// Chakra UIのレイアウト・見出し・カラートークン取得フック
import { Flex, Heading, useToken } from "@chakra-ui/react";
// カラーモード切替ボタン
import { ColorModeToggle } from "./components/ColorModeToggle";
// Todo追加フォーム
import { TodoForm } from "./components/TodoForm";
// Todoリスト
import { TodoList } from "./components/TodoList";
// ログインフォーム
import { LoginForm } from "./components/LoginForm";

// アプリ全体のレイアウトコンポーネント
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Todoリストの状態（id, text型に変更）
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [teal500] = useToken("colors", ["teal.500"]);

  // Todo一覧取得
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("http://localhost/chakuraUI-todo/todo.php")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [isLoggedIn]);

  // Todo追加
  const addTodo = async () => {
    if (input.trim() === "") return;
    const res = await fetch("http://localhost/chakuraUI-todo/todo.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput("");
  };
  // Todo削除
  const removeTodo = async (index: number) => {
    const id = todos[index].id;
    await fetch("http://localhost/chakuraUI-todo/todo.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter((_, i) => i !== index));
  };
  // Todo編集
  const updateTodo = async (index: number, value: string) => {
    if (value.trim() === "") return;
    const id = todos[index].id;
    await fetch("http://localhost/chakuraUI-todo/todo.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: value }),
    });
    setTodos(todos.map((t, i) => (i === index ? { ...t, text: value } : t)));
  };

  // ログインしていない場合はLoginFormを表示
  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

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
