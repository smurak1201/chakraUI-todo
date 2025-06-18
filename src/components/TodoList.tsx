// Chakra UIのレイアウト・UI部品をインポート
import {
  Box,
  Stack,
  Flex,
  IconButton,
  Input,
  useToken,
} from "@chakra-ui/react";
// ゴミ箱アイコンと編集アイコン
import { MdDelete, MdEdit } from "react-icons/md";
// 背景色を半透明にするユーティリティ
import { transparentize } from "@chakra-ui/theme-tools";
// カラーモード取得用
import { useColorMode } from "@/components/ui/color-mode";
import { useState } from "react";

// TodoListコンポーネントのprops型定義
interface TodoListProps {
  todos: string[]; // Todoリスト配列
  removeTodo: (index: number) => void; // Todo削除関数
  updateTodo: (index: number, value: string) => void; // Todo編集関数
}

// Todoリスト本体
export function TodoList({ todos, removeTodo, updateTodo }: TodoListProps) {
  // カラーモード取得（dark/light）
  const { colorMode } = useColorMode();
  // テーマカラー取得
  const [gray700, white] = useToken("colors", ["gray.700", "white"]);
  // 編集中のインデックスと値を管理
  const [editIdx, setEditIdx] = useState<number | null>(null); // 編集中のTodoのインデックス
  const [editValue, setEditValue] = useState(""); // 編集中の値
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
            {/* 編集モード：編集ボタンを押したときだけInput表示 */}
            {editIdx === idx ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                size="sm"
                onBlur={() => {
                  updateTodo(idx, editValue); // 編集確定
                  setEditIdx(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo(idx, editValue); // Enterで確定
                    setEditIdx(null);
                  }
                  if (e.key === "Escape") {
                    setEditIdx(null); // Escでキャンセル
                  }
                }}
                autoFocus
                mr={2}
              />
            ) : (
              // 通常表示：テキストのみ
              <span style={{ flex: 1 }}>{todo}</span>
            )}
            {/* 編集ボタン：押すと編集モードに */}
            {editIdx === idx ? null : (
              <IconButton
                aria-label="編集"
                colorScheme="blue"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditIdx(idx);
                  setEditValue(todo);
                }}
                mr={1}
              >
                <MdEdit />
              </IconButton>
            )}
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
