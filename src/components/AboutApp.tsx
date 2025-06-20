// ===============================
// AboutApp: README.mdの内容をアプリ内で表示するコンポーネント
// ===============================
import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { AiOutlineClose } from "react-icons/ai";

// 区切り線コンポーネント（Divider代用）
function SectionDivider() {
  const { colorMode } = useColorMode();
  const border = colorMode === "dark" ? "gray.600" : "gray.200";
  return <Box w="100%" h="1px" my={4} bg={border} />;
}

export function AboutApp({ onClose }: { onClose?: () => void }) {
  const { colorMode } = useColorMode();
  const border = colorMode === "dark" ? "gray.700" : "gray.200";
  const tableBg = colorMode === "dark" ? "gray.700" : "gray.50";
  const cellBorder = colorMode === "dark" ? "gray.600" : "gray.200";
  const bg = colorMode === "dark" ? "gray.800" : "white";
  const linkColor = "teal.500";
  return (
    <Box
      maxW={["full", "md", "lg"]}
      w={["90vw", "90vw", "auto"]}
      mx="auto"
      mt={[4, 8]}
      p={[2, 4, 6]}
      borderWidth={1}
      borderRadius="md"
      borderColor={border}
      bg={bg}
      boxShadow="md"
      position="relative"
    >
      {/* 閉じるボタン（右上） */}
      {onClose && (
        <Button
          size="md"
          variant="ghost"
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          onClick={onClose}
          fontSize="2xl"
          fontWeight="bold"
          p={2}
          minW={10}
          minH={10}
          borderRadius="full"
          color="gray.500"
          _hover={{
            bg: colorMode === "dark" ? "gray.700" : "gray.200",
            color: "teal.500",
          }}
          aria-label="閉じる"
        >
          <AiOutlineClose />
        </Button>
      )}
      <Heading
        as="h2"
        size="lg"
        mb={4}
        textAlign="center"
        fontSize={["lg", "xl"]}
      >
        Chakra UI Todo アプリについて
      </Heading>
      <Box textAlign="center" mb={4}>
        <img
          src="/list-todo.svg"
          alt="Todo App Icon"
          width={36}
          style={{ opacity: 0.8, margin: "0 auto" }}
        />
      </Box>
      <Text fontSize={["sm", "md"]} mb={4}>
        Chakra UI × React によるシンプルかつ洗練された Todo 管理アプリ。
        <br />
        ログイン・API 連携・ローカルモード・ダーク/ライト切替など、現代的な
        UI/UX を実装。
      </Text>
      <SectionDivider />
      <Heading as="h3" size="md" mb={2} fontSize={["md", "lg"]}>
        技術スタック
      </Heading>
      <Box
        as="div"
        w="100%"
        mb={4}
        borderRadius="md"
        overflowX="auto"
        bg={tableBg}
      >
        <Box as="table" minW="340px" w="100%" borderCollapse="collapse">
          <tbody>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                言語
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                TypeScript / JavaScript
              </Box>
            </tr>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                フレームワーク
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                React
              </Box>
            </tr>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                UI
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                Chakra UI, framer-motion, react-icons, next-themes
              </Box>
            </tr>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                ビルド
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                Vite
              </Box>
            </tr>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                状態管理
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                React Hooks（useState, useEffect, カスタムフック）
              </Box>
            </tr>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                認証/データAPI
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                PHP（login.php, todo.php など）
              </Box>
            </tr>
            <tr>
              <Box
                as="td"
                p={2}
                borderBottomWidth={1}
                borderColor={cellBorder}
                fontWeight="bold"
              >
                DB
              </Box>
              <Box as="td" p={2} borderBottomWidth={1} borderColor={cellBorder}>
                MySQL 等（サーバ側）／ローカルモード時はフロントのみ
              </Box>
            </tr>
            <tr>
              <Box as="td" p={2} fontWeight="bold">
                その他
              </Box>
              <Box as="td" p={2}>
                ESLint, Lucide/Material Icons
              </Box>
            </tr>
          </tbody>
        </Box>
      </Box>
      <SectionDivider />
      <Heading as="h3" size="md" mb={2} fontSize={["md", "lg"]}>
        アイコン著作権
      </Heading>
      <Text fontSize={["xs", "sm"]} mb={1}>
        <Link
          href="https://lucide.dev"
          color={linkColor}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lucide
        </Link>{" "}
        MIT License
        <br />
        <Link
          href="https://fonts.google.com/icons"
          color={linkColor}
          target="_blank"
          rel="noopener noreferrer"
        >
          Material Icons
        </Link>{" "}
        by Google, Apache License 2.0
      </Text>
      <SectionDivider />
      <Text fontSize={["2xs", "xs"]} color="gray.500" textAlign="center">
        © 2025 Chakra UI Todo App. All rights reserved.
      </Text>
    </Box>
  );
}
