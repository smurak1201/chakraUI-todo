// ===============================
// アプリ全体のメインコンポーネント
// ===============================
// ReactのuseStateフックをインポート
import { useState } from "react";
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
// アプリ情報
import { AboutApp } from "./components/AboutApp";
// カスタムフック（状態管理・認証・カラーモード）をインポート
import { useTodos } from "./hooks/useTodos";
import { useAuth } from "./hooks/useAuth";
import { useColorMode } from "@/components/ui/color-mode";

// ===============================
// App: アプリ全体のレイアウト・状態管理
// ===============================
export default function App() {
  // 認証・Todoロジックをカスタムフックで取得
  const { isLoggedIn, login, logout } = useAuth();
  // Todoリストやローカルモード・エラー管理もカスタムフックで一括取得
  const {
    todos,
    setTodos,
    addTodo,
    removeTodo,
    updateTodo,
    isLocalMode,
    setIsLocalMode,
    error,
    setError,
  } = useTodos(isLoggedIn);
  // 入力欄の値（フォームの状態）
  const [input, setInput] = useState("");
  // Chakra UIのカラートークン取得（色のカスタマイズ用）
  const [teal500] = useToken("colors", ["teal.500"]);
  // カラーモード制御用（ライト/ダーク切替）
  const { setColorMode } = useColorMode();
  // アプリ情報表示用の状態
  const [showAbout, setShowAbout] = useState(false);

  // ===============================
  // ログアウト時にライトモードへ強制切り替え
  // ===============================
  // ダークモードのままログアウトした場合でも、ログイン画面は必ずライトモードで表示される
  const handleLogout = () => {
    logout(); // ログイン状態を解除
    setColorMode("light"); // カラーモードをライトに強制
  };

  // ===============================
  // ログインしていない場合はLoginFormを表示
  // ===============================
  if (!isLoggedIn) {
    return (
      <LoginForm
        onLogin={(localMode = false, errorMsg = "") => {
          login(); // ログイン状態にする
          if (localMode) {
            setIsLocalMode(true); // ローカルモードON
            setTodos([]); // DBデータを消す
            setError(errorMsg); // エラー表示
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
        {/* ログアウトボタン：押すとライトモードに戻る */}
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          fontWeight="bold"
          borderRadius="md"
          boxShadow="md"
          letterSpacing={1}
          onClick={handleLogout}
        >
          ログアウト
        </Button>
        {/* カラーモード切替ボタン */}
        <ColorModeToggle />
      </Flex>
      {/* アプリ情報表示ボタン */}
      <Button
        size="xs"
        variant="ghost"
        colorScheme="gray"
        mt={2}
        mb={2}
        onClick={() => setShowAbout(true)}
        alignSelf="flex-end"
      >
        アプリについて
      </Button>
      {/* アプリ情報ダイアログ風表示 */}
      {showAbout && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box position="relative" zIndex={1001}>
            <AboutApp />
            <Button
              size="sm"
              mt={2}
              w="100%"
              onClick={() => setShowAbout(false)}
            >
              閉じる
            </Button>
          </Box>
        </Box>
      )}
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
      <TodoForm
        input={input}
        setInput={setInput}
        addTodo={() => addTodo(input).then(() => setInput(""))}
      />
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
