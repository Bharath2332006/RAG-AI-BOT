import { Paper, Text, Box, useMantineTheme } from '@mantine/core';
import { User, Bot } from 'lucide-react';

export default function ChatBubble({ role = 'user', content }) {
  const isUser = role === 'user';
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        animation: "fadeInMessage 0.3s ease-in",
      }}
    >
      <Box
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          maxWidth: "75%",
          flexDirection: isUser ? "row-reverse" : "row",
        }}
      >
        {/* Avatar */}
        <Paper
          radius="xl"
          p="xs"
          style={{
            background: isUser
              ? "linear-gradient(135deg, #4C6EF5 0%, #5F3DC4 100%)"
              : "var(--mantine-color-gray-1)",
            minWidth: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isUser
              ? "0 4px 12px rgba(76, 110, 245, 0.3)"
              : "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          {isUser ? (
            <User size={20} color="white" strokeWidth={2.5} />
          ) : (
            <Bot size={20} color="#4C6EF5" strokeWidth={2.5} />
          )}
        </Paper>

        {/* Message Bubble */}
        <Box style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Role Label */}
          <Text
            fw={600}
            size="xs"
            c={isUser ? "indigo.6" : "dimmed"}
            style={{
              textTransform: "uppercase",
              letterSpacing: 0.5,
              paddingLeft: isUser ? 0 : 12,
              paddingRight: isUser ? 12 : 0,
              textAlign: isUser ? "right" : "left",
            }}
          >
            {isUser ? "You" : "AI Assistant"}
          </Text>

          {/* Message Content */}
          <Paper
            shadow="md"
            p="md"
            radius="xl"
            style={{
              background: isUser
                ? "linear-gradient(135deg, #4C6EF5 0%, #5F3DC4 100%)"
                : "var(--mantine-color-gray-0)",
              border: isUser ? "none" : "1px solid var(--mantine-color-gray-3)",
              position: "relative",
              boxShadow: isUser
                ? "0 4px 16px rgba(76, 110, 245, 0.25)"
                : "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                color: isUser ? "white" : "var(--mantine-color-text)",
                fontSize: "15px",
                fontFamily: "var(--mantine-font-family)",
              }}
            >
              {content}
            </div>

            {/* Decorative Triangle */}
            <Box
              style={{
                position: "absolute",
                top: 12,
                [isUser ? "right" : "left"]: -6,
                width: 0,
                height: 0,
                borderTop: isUser
                  ? "8px solid transparent"
                  : "8px solid var(--mantine-color-gray-0)",
                borderBottom: "8px solid transparent",
                [isUser ? "borderLeft" : "borderRight"]: isUser
                  ? "8px solid #4C6EF5"
                  : "8px solid var(--mantine-color-gray-0)",
              }}
            />
          </Paper>
        </Box>
      </Box>

      <style>{`
        @keyframes fadeInMessage {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}