// ===============================
// useTodos: Todoリストの状態・API通信・ローカルモード管理をまとめたカスタムフック
// ===============================
import { useState, useEffect } from "react";

export interface Todo {
  id: number;
  text: string;
}

export function useTodos(isLoggedIn: boolean) {
  // Todoリストの状態
  const [todos, setTodos] = useState<Todo[]>([]);
  // ローカルモード（API通信せずメモリだけで動作）
  const [isLocalMode, setIsLocalMode] = useState(() => {
    return localStorage.getItem("localMode") === "true";
  });
  // エラーメッセージ
  const [error, setError] = useState("");

  // ログイン後、Todo一覧をAPIから取得（ローカルモード時はスキップ）
  useEffect(() => {
    if (!isLoggedIn) return;
    if (isLocalMode) return;
    fetch("http://localhost/chakuraUI-todo/todo.php")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch(() => {
        setIsLocalMode(true);
        localStorage.setItem("localMode", "true");
      });
  }, [isLoggedIn, isLocalMode]);

  // ローカルモード時のTodo操作
  function handleLocalTodo(
    action: "add" | "remove" | "update",
    payload?: any
  ) {
    if (action === "add") {
      setTodos((prev) => [...prev, { id: Date.now(), text: payload }]);
    } else if (action === "remove") {
      setTodos((prev) => prev.filter((_, i) => i !== payload));
    } else if (action === "update") {
      setTodos((prev) => prev.map((t, i) => (i === payload.idx ? { ...t, text: payload.value } : t)));
    }
  }

  // Todo追加
  const addTodo = async (input: string) => {
    if (input.trim() === "") return;
    if (isLocalMode) {
      handleLocalTodo("add", input);
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
      setTodos((prev) => [...prev, newTodo]);
    } catch {
      setIsLocalMode(true);
      handleLocalTodo("add", input);
    }
  };

  // Todo削除
  const removeTodo = async (index: number) => {
    if (isLocalMode) {
      handleLocalTodo("remove", index);
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
      handleLocalTodo("remove", index);
    } catch {
      setIsLocalMode(true);
      handleLocalTodo("remove", index);
    }
  };

  // Todo編集
  const updateTodo = async (index: number, value: string) => {
    if (value.trim() === "") return;
    if (isLocalMode) {
      handleLocalTodo("update", { idx: index, value });
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
      handleLocalTodo("update", { idx: index, value });
    } catch {
      setIsLocalMode(true);
      handleLocalTodo("update", { idx: index, value });
    }
  };

  return {
    todos,
    setTodos,
    addTodo,
    removeTodo,
    updateTodo,
    isLocalMode,
    setIsLocalMode,
    error,
    setError,
  };
}
