import { useState } from "react";
import { Box, Button, Flex, Input, Spinner, useToken } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

export function LoginForm({
  onLogin,
}: {
  onLogin: (localMode?: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [teal500] = useToken("colors", ["teal.500"]);
  const { colorMode } = useColorMode();
  const boxBg = colorMode === "dark" ? "gray.800" : "white";
  const pageBg = colorMode === "dark" ? "gray.900" : "gray.50";
  const inputBg = colorMode === "dark" ? "gray.700" : "gray.100";

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost/chakuraUI-todo/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        // サーバに接続できない場合のみローカルモード
        localStorage.setItem("localMode", "true");
        onLogin(true);
        return;
      }
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("localMode");
        onLogin(false);
      } else {
        // サーバ接続時は認証失敗時もローカルモード
        localStorage.setItem("localMode", "true");
        onLogin(true);
      }
    } catch (e) {
      // サーバに接続できない場合のみローカルモード
      onLogin(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg={pageBg}
      p={4}
    >
      <Box
        bg={boxBg}
        p={{ base: 6, md: 10 }}
        borderRadius="xl"
        boxShadow="2xl"
        minW="320px"
        w="100%"
        maxW="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <form
          style={{ width: "100%" }}
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
            bg={inputBg}
            borderRadius="md"
            boxShadow="sm"
          />
          <Input
            mb={6}
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="md"
            bg={inputBg}
            borderRadius="md"
            boxShadow="sm"
          />
          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
            width="100%"
            size="md"
            fontWeight="bold"
            mb={2}
            borderRadius="md"
            boxShadow="md"
            letterSpacing={1}
            color={teal500}
            loading={loading}
            loadingText="ログイン中..."
            spinnerPlacement="start"
            spinner={<Spinner size="sm" color={teal500} />}
            disabled={loading}
          >
            ログイン
          </Button>
          {error && (
            <Box color="red.500" textAlign="center" mt={2} fontWeight="bold">
              {error}
            </Box>
          )}
        </form>
      </Box>
    </Flex>
  );
}
