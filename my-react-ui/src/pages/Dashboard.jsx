import { Button, Card, Grid, Group, Stack, Text, Title, Badge, Box, Paper, ThemeIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { IconRocket, IconBriefcase, IconMessageChatbot, IconFileText, IconCheck } from '@tabler/icons-react';

function Dashboard() {
  const nav = useNavigate();
  const { resumeId } = useApp();

  return (
    <Box px="xl" py={50}>
      <Stack gap={40}>
        <Box>
          <Title order={1} size="2.625rem" fw={700} mb="md" c="var(--mantine-color-text)">
            HR Intelligence Platform
          </Title>
          <Text size="xl" c="dimmed" maw={700}>
            Streamline your HR operations with AI-powered resume analysis, role recommendations, and intelligent document management
          </Text>
        </Box>

        {resumeId && (
          <Paper shadow="md" p="xl" radius="lg" withBorder bg="var(--mantine-color-blue-light)">
            <Group justify="space-between" wrap="nowrap">
              <Box>
                <Group gap="sm" mb="xs">
                  <ThemeIcon size="lg" radius="xl" color="green" variant="light">
                    <IconCheck size={20} />
                  </ThemeIcon>
                  <Title order={4} fw={600}>Active Session</Title>
                </Group>
                <Text size="sm" c="dimmed">Resume ID: <Text span fw={500} c="var(--mantine-color-text)">{resumeId}</Text></Text>
              </Box>
              <Badge size="lg" variant="light" color="green">
                🛡️ READY
              </Badge>
            </Group>
          </Paper>
        )}

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="md" padding="xl" radius="lg" withBorder h="100%">
              <Stack gap="lg" h="100%">
                <Box>
                  <ThemeIcon size={60} radius="md" variant="light" color="blue" mb="md">
                    <IconRocket size={34} />
                  </ThemeIcon>
                  <Title order={3} fw={600} mb="sm">Getting Started</Title>
                  <Text c="dimmed" size="sm" style={{ lineHeight: 1.7 }}>
                    Begin your journey by uploading your resume. Our AI will analyze your skills,
                    experience, and qualifications to provide personalized recommendations and insights.
                  </Text>
                </Box>

                <Group gap="sm" mt="auto">
                  <Button size="md" onClick={() => nav('/upload-resume')}>
                    Upload Resume
                  </Button>
                  <Button size="md" variant="light" onClick={() => nav('/upload-hr-doc')}>
                    Upload HR Docs
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="md" padding="xl" radius="lg" withBorder h="100%">
              <Stack gap="lg" h="100%">
                <Box>
                  <ThemeIcon size={60} radius="md" variant="light" color="violet" mb="md">
                    <IconBriefcase size={34} />
                  </ThemeIcon>
                  <Title order={3} fw={600} mb="sm">Quick Actions</Title>
                  <Text c="dimmed" size="sm" mb="md" style={{ lineHeight: 1.7 }}>
                    Access our core features to get role recommendations and chat with the HR assistant.
                    A resume upload is required to unlock these capabilities.
                  </Text>

                  {resumeId && (
                    <Paper withBorder p="md" radius="md" bg="var(--mantine-color-green-light)" mb="md">
                      <Group gap="xs">
                        <Badge color="green" variant="dot" size="lg">Active Resume</Badge>
                      </Group>
                    </Paper>
                  )}
                </Box>

                <Stack gap="sm" mt="auto">
                  <Button
                    size="md"
                    variant="light"
                    fullWidth
                    disabled={!resumeId}
                    onClick={() => nav('/recommend-role')}
                  >
                    Get Role Recommendation
                  </Button>
                  <Button
                    size="md"
                    variant="light"
                    fullWidth
                    disabled={!resumeId}
                    onClick={() => nav('/chat')}
                  >
                    Ask HR Assistant
                  </Button>
                  {!resumeId && (
                    <Text size="xs" c="dimmed" ta="center" mt="xs">
                      Please upload a resume to enable these features
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Box>
          <Title order={2} fw={600} mb="xl" ta="center">Platform Features</Title>
          <Grid gutter="md">
            {[
              { icon: IconRocket, title: 'Upload Resume', description: 'Securely upload your resume in PDF or DOCX format', color: 'blue' },
              { icon: IconBriefcase, title: 'Role Recommendation', description: 'Get AI-powered job role suggestions based on your profile', color: 'teal' },
              { icon: IconMessageChatbot, title: 'HR Assistant', description: 'Chat with our intelligent HR assistant for instant answers', color: 'violet' },
              { icon: IconFileText, title: 'HR Documentation', description: 'Upload and manage your HR policy documents', color: 'orange' },
            ].map((feature, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
                  <ThemeIcon size={50} radius="md" variant="light" color={feature.color} mb="md">
                    <feature.icon size={26} />
                  </ThemeIcon>
                  <Text fw={600} size="lg" mb="xs">{feature.title}</Text>
                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>{feature.description}</Text>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

export default Dashboard;