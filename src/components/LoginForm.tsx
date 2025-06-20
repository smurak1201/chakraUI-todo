import { useState } from "react";
import { Box, Button, Flex, Heading, Input, useToken } from "@chakra-ui/react";

export function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [teal500] = useToken("colors", ["teal.500"]);

  const handleLogin = async () => {
    const res = await fetch("http://localhost/chakuraUI-todo/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      onLogin();
    } else {
      setError("ログイン失敗");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        minW="320px"
        w="100%"
        maxW="400px"
      >
        <Heading mb={6} color={teal500} size="lg" textAlign="center">
          ログイン
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Input
            mb={4}
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="md"
            autoFocus
            bg="gray.100"
          />
          <Input
            mb={4}
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="md"
            bg="gray.100"
          />
          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
            width="100%"
            mb={2}
          >
            ログイン
          </Button>
          {error && (
            <Box color="red.500" textAlign="center">
              {error}
            </Box>
          )}
        </form>
      </Box>
    </Flex>
  );
}
