// Chakra UIのレイアウト・UI部品をインポート
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
// ゴミ箱アイコンと編集アイコン
import { MdDelete, MdEdit } from "react-icons/md";
// カラーモード取得用
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react";
import { Reorder } from "framer-motion";

// TodoListコンポーネントのprops型定義
interface TodoListProps {
  todos: { id: number; text: string }[]; // Todoリスト配列
  removeTodo: (index: number) => void;
  updateTodo: (index: number, value: string) => void;
  setTodos: (todos: { id: number; text: string }[]) => void;
}

// Todoリスト本体
export function TodoList({
  todos,
  removeTodo,
  updateTodo,
  setTodos,
}: TodoListProps) {
  // 編集中のインデックスと値を管理
  const [editIdx, setEditIdx] = useState<number | null>(null); // 編集中のTodoのインデックス
  const [editValue, setEditValue] = useState(""); // 編集中の値
  // リストアイテムの背景色をカラーモードで切り替え（Inputと同じ色に）
  const itemBg = useColorModeValue("white", "gray.700");

  return (
    // リスト全体のラッパー
    <Box w="100%" maxW="md">
      <Reorder.Group axis="y" values={todos} onReorder={setTodos}>
        {todos.map((todo, idx) => (
          <Reorder.Item
            value={todo}
            key={todo.id}
            style={{
              listStyle: "none",
              width: "100%",
              marginBottom: idx !== todos.length - 1 ? 12 : 0,
            }}
          >
            <Flex
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
                  fontSize="16px" // スマホでの自動ズーム防止
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
                <span style={{ flex: 1 }}>{todo.text}</span>
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
                    setEditValue(todo.text);
                  }}
                  mr={1}
                  _hover={{ bg: "blue.100" }}
                  _dark={{ _hover: { bg: "blue.700" } }}
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
                _hover={{ bg: "red.100" }}
                _dark={{ _hover: { bg: "red.700" } }}
              >
                <MdDelete />
              </IconButton>
            </Flex>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Box>
  );
}
