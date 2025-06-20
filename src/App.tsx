// ===============================
// アプリ全体のメインコンポーネント
// ===============================
// ReactのuseState, useEffectフックをインポート
import { useState, useEffect } from "react";
// Chakra UIのレイアウト・見出し・カラートークン取得フック
import { Flex, Heading, useToken, Button, Box } from "@chakra-ui/react";
// カラーモード切替ボタン
import { ColorModeToggle } from "./components/ColorModeToggle";
// Todo追加フォーム
import { TodoForm } from "./components/TodoForm";
// Todoリスト
import { TodoList } from "./components/TodoList";
// ログインフォーム
import { LoginForm } from "./components/LoginForm";

// ===============================
// App: アプリ全体のレイアウト・状態管理
// ===============================
export default function App() {
  // ログイン状態を管理（localStorageで永続化）
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // localStorageから初期値を取得
    return localStorage.getItem("isLoggedIn") === "true";
  });
  // Todoリストの状態（id, text型の配列）
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  // 入力欄の値
  const [input, setInput] = useState("");
  // Chakra UIのカラートークン取得
  const [teal500] = useToken("colors", ["teal.500"]);
  // ローカルモード（API通信せずメモリだけで動作）
  const [isLocalMode, setIsLocalMode] = useState(() => {
    return localStorage.getItem("localMode") === "true";
  });
  // エラーメッセージ
  const [error, setError] = useState("");

  // ===============================
  // ログイン後、Todo一覧をAPIから取得（ローカルモード時はスキップ）
  // ===============================
  useEffect(() => {
    if (!isLoggedIn) return;
    if (isLocalMode) return; // ローカルモード時はAPI通信しない
    fetch("http://localhost/chakuraUI-todo/todo.php")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch(() => {
        setIsLocalMode(true); // API失敗時はローカルモードに切り替え
        localStorage.setItem("localMode", "true");
      });
  }, [isLoggedIn, isLocalMode]);

  // ===============================
  // Todo追加処理
  // ===============================
  const addTodo = async () => {
    if (input.trim() === "") return;
    if (isLocalMode) {
      // ローカルモード: useStateのみで管理
      const newTodo = { id: Date.now(), text: input };
      setTodos([...todos, newTodo]);
      setInput("");
      return;
    }
    try {
      const res = await fetch("http://localhost/chakuraUI-todo/todo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error();
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setInput("");
    } catch {
      setIsLocalMode(true);
      // ローカルモードで追加
      const newTodo = { id: Date.now(), text: input };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };
  // ===============================
  // Todo削除処理
  // ===============================
  const removeTodo = async (index: number) => {
    if (isLocalMode) {
      setTodos(todos.filter((_, i) => i !== index));
      return;
    }
    const id = todos[index].id;
    try {
      const res = await fetch("http://localhost/chakuraUI-todo/todo.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setTodos(todos.filter((_, i) => i !== index));
    } catch {
      setIsLocalMode(true);
      setTodos(todos.filter((_, i) => i !== index));
    }
  };
  // ===============================
  // Todo編集処理
  // ===============================
  const updateTodo = async (index: number, value: string) => {
    if (value.trim() === "") return;
    if (isLocalMode) {
      setTodos(todos.map((t, i) => (i === index ? { ...t, text: value } : t)));
      return;
    }
    const id = todos[index].id;
    try {
      const res = await fetch("http://localhost/chakuraUI-todo/todo.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, text: value }),
      });
      if (!res.ok) throw new Error();
      setTodos(todos.map((t, i) => (i === index ? { ...t, text: value } : t)));
    } catch {
      setIsLocalMode(true);
      setTodos(todos.map((t, i) => (i === index ? { ...t, text: value } : t)));
    }
  };

  // ===============================
  // ログインしていない場合はLoginFormを表示
  // ===============================
  if (!isLoggedIn) {
    return (
      <LoginForm
        onLogin={(localMode = false, errorMsg = "") => {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          if (localMode) {
            setIsLocalMode(true);
            setTodos([]); // ローカルモード時はDBデータを消す
            setError(errorMsg);
          } else {
            setIsLocalMode(false);
            localStorage.removeItem("localMode");
            setError("");
          }
        }}
      />
    );
  }

  // ===============================
  // ログイン後の画面レイアウト
  // ===============================
  return (
    // 全体レイアウト
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      p={8}
      position="relative"
      mt={12}
    >
      {/* 上部バー：ログアウトボタンとカラーモード切替ボタンを左右に配置 */}
      <Flex
        w="100%"
        maxW="md"
        mx="auto"
        justify="space-between"
        align="center"
        mb={4}
        position="absolute"
        top={4}
        left="50%"
        transform="translateX(-50%)"
      >
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          fontWeight="bold"
          borderRadius="md"
          boxShadow="md"
          letterSpacing={1}
          onClick={() => {
            setIsLoggedIn(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
          }}
        >
          ログアウト
        </Button>
        <ColorModeToggle />
      </Flex>
      {/* タイトル */}
      <Heading mb={6} color={teal500} mt={12}>
        Chakra UI Todoアプリ
      </Heading>
      {/* ローカルモード時の案内・エラー表示 */}
      {isLocalMode && error && (
        <Box color="orange.400" textAlign="center" mb={4} fontWeight="bold">
          {error}
        </Box>
      )}
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
