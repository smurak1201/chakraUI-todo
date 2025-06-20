import { useState } from "react";
import { Box, Button, Flex, Input, Spinner, useToken } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

export function LoginForm({
  onLogin,
}: {
  onLogin: (localMode?: boolean, errorMsg?: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLocalConfirm, setShowLocalConfirm] = useState(false);
  const [localErrorType, setLocalErrorType] = useState<
    "auth" | "server" | null
  >(null);
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
        setLocalErrorType("server");
        setShowLocalConfirm(true);
        return;
      }
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("localMode");
        window.scrollTo(0, 0); // ログイン成功時に画面を最上部へ
        onLogin(false, "");
      } else {
        setLocalErrorType("auth");
        setShowLocalConfirm(true);
      }
    } catch (e) {
      setLocalErrorType("server");
      setShowLocalConfirm(true);
    } finally {
      setLoading(false);
    }
  };

  // ローカルモードで続行する場合の処理
  const handleLocalContinue = () => {
    localStorage.setItem("localMode", "true");
    setShowLocalConfirm(false);
    let msg = "";
    if (localErrorType === "auth") {
      msg =
        "ユーザー名またはパスワードが違います。ローカルモードで動作します。";
    } else if (localErrorType === "server") {
      msg = "サーバに接続できません。ローカルモードで動作します。";
    }
    setError(msg);
    window.scrollTo(0, 0); // ローカルモードで続行時も画面を最上部へ
    onLogin(true, msg);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg={pageBg}
      p={4}
      position="relative"
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
            fontSize={16}
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
            fontSize={16}
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
        {/* カスタムダイアログ */}
        {showLocalConfirm && (
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
            <Box
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="2xl"
              minW="300px"
              maxW="90vw"
            >
              <Box
                fontWeight="bold"
                fontSize="lg"
                mb={4}
                color="orange.500"
                textAlign="center"
              >
                ローカルモードで続行しますか？
              </Box>
              <Box mb={6} color="gray.700" textAlign="center">
                {localErrorType === "auth"
                  ? "ユーザー名またはパスワードが違います。"
                  : "サーバに接続できません。"}
                <br />
                サーバ認証なしでローカルモードで続行しますか？
              </Box>
              <Flex justify="flex-end">
                <Button
                  onClick={() => setShowLocalConfirm(false)}
                  mr={3}
                  variant="outline"
                  colorScheme="gray"
                >
                  キャンセル
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={handleLocalContinue}
                  ml={3}
                >
                  ローカルで続行
                </Button>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
