import { useState, useEffect, useRef } from "react";
import {
  Container,
  Stack,
  TextInput,
  Title,
  Text,
  Box,
  Paper,
  Group,
  ScrollArea,
  Badge,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { Send, Bot, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { chat } from "../api/backend.js";
import ChatBubble from "../components/ChatBubble.jsx";

function Chat() {
  const { resumeId, notify, isBusy, setIsBusy } = useApp();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello! I'm your AI resume assistant. Ask me anything about resumes, skills, or career guidance."
    }
  ]);
  const [currentResumeId, setCurrentResumeId] = useState(resumeId || "");
  const viewport = useRef(null);

  // Auto-load saved resume ID
  useEffect(() => {
    const savedId = localStorage.getItem("resume_id");
    if (savedId) setCurrentResumeId(savedId);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isBusy]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setQuestion("");
    setIsBusy(true);

    try {
      const data = await chat(question, currentResumeId);
      const answer = data.answer || "No answer returned";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer.trim() },
      ]);
    } catch (e) {
      notify("Error", e.message || "Failed to get answer", "red");
      // Optionally remove the user message or show an error state
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Container size="lg" py={50}>
      <Stack gap="xl">
        {/* Header Section */}
        <Box>
          <Group mb="md" align="center">
            <Sparkles size={32} color="#4C6EF5" />
            <Title order={1} fw={700} style={{ color: "var(--mantine-color-text)" }}>
              Super Chatbot
            </Title>
            {currentResumeId && (
              <Badge
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                size="lg"
                leftSection={<Bot size={16} />}
              >
                Resume Loaded
              </Badge>
            )}
          </Group>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
            Ask questions about any resume or HR document. Your Resume ID will be auto-loaded if you've uploaded one.
          </Text>
        </Box>

        {/* Main Chat Container */}
        <Paper
          shadow="xl"
          radius="xl"
          withBorder
          style={{
            border: "1px solid var(--mantine-color-gray-3)",
            overflow: "hidden",
            background: "var(--mantine-color-body)",
          }}
        >
          <Stack gap={0}>
            {/* Resume ID Input Header */}
            <Box
              p="xl"
              style={{
                background: "linear-gradient(135deg, #4C6EF5 0%, #5F3DC4 100%)",
              }}
            >
              <TextInput
                label={
                  <Text component="span" fw={600} c="white" size="sm" mb={4} style={{ display: 'block' }}>
                    Resume ID (Optional)
                  </Text>
                }
                description={
                  <Text component="span" c="rgba(255,255,255,0.8)" size="xs" style={{ display: 'block' }}>
                    Auto-loaded if you've uploaded a resume
                  </Text>
                }
                placeholder="e.g., resume_abc123xyz"
                value={currentResumeId}
                onChange={(e) => setCurrentResumeId(e.currentTarget.value)}
                size="md"
                styles={{
                  input: {
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                    "::placeholder": {
                      color: "rgba(255,255,255,0.6)",
                    },
                    "&:focus": {
                      background: "rgba(255,255,255,0.25)",
                      border: "1px solid rgba(255,255,255,0.5)",
                    },
                  },
                }}
              />
            </Box>

            <Divider />

            {/* Messages Area */}
            <ScrollArea
              viewportRef={viewport}
              style={{
                height: 500,
                background: "var(--mantine-color-body)",
              }}
              p="xl"
            >
              <Stack gap="lg">
                {messages.map((msg, i) => (
                  <ChatBubble key={i} role={msg.role} content={msg.content} />
                ))}

                {/* Typing Indicator */}
                {isBusy && (
                  <Box style={{ display: "flex", justifyContent: "flex-start", animation: "fadeIn 0.3s ease-in" }}>
                    <Group gap="sm" align="flex-start">
                      <Paper
                        radius="xl"
                        p="xs"
                        style={{
                          background: "linear-gradient(135deg, #F1F3F5 0%, #E9ECEF 100%)",
                          minWidth: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Bot size={20} color="#4C6EF5" />
                      </Paper>
                      <Paper
                        shadow="sm"
                        p="md"
                        radius="xl"
                        style={{
                          background: "var(--mantine-color-gray-0)",
                          border: "1px solid var(--mantine-color-gray-3)",
                        }}
                      >
                        <Group gap="xs">
                          <Box
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#ADB5BD",
                              animation: "pulse 1.4s ease-in-out infinite",
                            }}
                          />
                          <Box
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#ADB5BD",
                              animation: "pulse 1.4s ease-in-out 0.2s infinite",
                            }}
                          />
                          <Box
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#ADB5BD",
                              animation: "pulse 1.4s ease-in-out 0.4s infinite",
                            }}
                          />
                        </Group>
                      </Paper>
                    </Group>
                  </Box>
                )}
              </Stack>
            </ScrollArea>

            <Divider />

            {/* Input Area */}
            <Box
              p="xl"
              style={{
                background: "var(--mantine-color-body)",
              }}
            >
              <Group gap="md" align="flex-end">
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Type your message..."
                  value={question}
                  onChange={(e) => setQuestion(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isBusy && sendMessage()}
                  size="lg"
                  radius="xl"
                  styles={{
                    input: {
                      border: "2px solid var(--mantine-color-gray-3)",
                      "&:focus": {
                        border: "2px solid #4C6EF5",
                      },
                    },
                  }}
                />
                <ActionIcon
                  size={48}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                  onClick={sendMessage}
                  disabled={isBusy || !question.trim()}
                  style={{
                    transition: "transform 0.2s ease",
                  }}
                >
                  <Send size={20} />
                </ActionIcon>
              </Group>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </Container>
  );
}

export default Chat;