import { useState } from "react";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
  Text,
  Box,
  ThemeIcon,
} from "@mantine/core";
import { useApp } from "../context/AppContext.jsx";
import { recommendRole } from "../api/backend.js";
import ResponseBox from "../components/ResponseBox.jsx";
import { IconBriefcase } from "@tabler/icons-react";

function RecommendRole() {
  const { resumeId, notify, isBusy, setIsBusy } = useApp();
  const [id, setId] = useState(resumeId || "");
  const [result, setResult] = useState("");

  const run = async () => {
    if (!id)
      return notify(
        "Missing Resume ID",
        "Please paste your resume_id from Upload Resume",
        "red"
      );

    setIsBusy(true);
    setResult("");

    try {
      const data = await recommendRole(id);

      // Format readable text
      const text = `
Recommended Role: ${data.recommended_role}

Strengths:
${data.strengths?.map((s) => "- " + s).join("\n")}

Reasoning:
${data.reasoning?.map((r) => "- " + r).join("\n")}
`;

      setResult(text.trim());
    } catch (e) {
      notify("Error", e.message || "Failed to recommend role", "red");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Container size="lg" py={50}>
      <Stack gap="xl">
        <Box>
          <Title order={1} fw={700} mb="md">
            AI Role Recommendation
          </Title>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
            Get personalized job role recommendations powered by AI. Enter your
            resume ID below to start.
          </Text>
        </Box>

        <Paper shadow="lg" p={40} radius="lg" withBorder>
          <Stack gap="xl">
            <Group gap="xs" mb="md">
              <ThemeIcon size="lg" radius="md" variant="light" color="violet">
                <IconBriefcase size={20} />
              </ThemeIcon>
              <Title order={3} fw={600}>Role Analysis</Title>
            </Group>

            <TextInput
              label="Resume ID"
              description="Your unique identifier from the resume upload process"
              placeholder="e.g., resume_abc123xyz"
              value={id}
              onChange={(e) => setId(e.currentTarget.value)}
              size="lg"
            />

            <Group>
              <Button size="lg" loading={isBusy} disabled={!id} onClick={run}>
                Get Recommendation
              </Button>
              <Text size="sm" c="dimmed">
                ⏱️ Takes 2-5 seconds
              </Text>
            </Group>
          </Stack>
        </Paper>

        {result && <ResponseBox title="Recommended Role" content={result} />}
      </Stack>
    </Container>
  );
}

export default RecommendRole;
