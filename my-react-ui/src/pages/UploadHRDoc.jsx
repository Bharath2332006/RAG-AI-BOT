import { Container, Stack, Text, Title, Box, Paper, Badge, Group, ThemeIcon } from '@mantine/core';
import FileUploadCard from '../components/FileUploadCard.jsx';
import { uploadHRDoc } from '../api/backend.js';
import { useApp } from '../context/AppContext.jsx';
import { IconFileText, IconCheck } from '@tabler/icons-react';

function UploadHRDoc() {
  const { notify } = useApp();

  const handleUpload = async (file) => {
    const data = await uploadHRDoc(file);
    notify('HR Doc Uploaded', data.message || 'Indexed successfully', 'teal');
  };

  return (
    <Container size="md" py={50}>
      <Stack gap="xl">
        <Box>
          <Title order={1} fw={700} mb="md">Upload HR Documentation</Title>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
            Upload your organization's HR policies, handbooks, and documentation. These documents will be
            indexed and used by our AI assistant to provide accurate, policy-compliant answers.
          </Text>
        </Box>

        <Paper shadow="lg" p={40} radius="lg" withBorder>
          <Stack gap="xl">
            <Box>
              <Group gap="xs" mb="md">
                <ThemeIcon size="lg" radius="md" variant="light" color="orange">
                  <IconFileText size={20} />
                </ThemeIcon>
                <Title order={3} fw={600}>Document Management</Title>
              </Group>
              <Text size="sm" c="dimmed" mb="lg">
                Supported formats: PDF, DOC, DOCX • Maximum file size: 25MB
              </Text>

              <Group gap="sm" mb="lg">
                <Badge size="lg" variant="light" color="orange">PDF</Badge>
                <Badge size="lg" variant="light" color="orange">DOC</Badge>
                <Badge size="lg" variant="light" color="orange">DOCX</Badge>
                <Badge size="lg" variant="light" color="gray">Max 25MB</Badge>
              </Group>
            </Box>

            <FileUploadCard title="Upload HR Document" onUpload={handleUpload} accept=".pdf,.doc,.docx" />

            <Box>
              <Title order={4} fw={600} mb="md">Document Processing</Title>
              <Stack gap="sm">
                {[
                  'Documents are securely encrypted and stored',
                  'Content is automatically indexed for quick retrieval',
                  'AI assistant gains access to policy information',
                  'Updates are reflected in real-time across the platform'
                ].map((item, i) => (
                  <Group key={i} gap="sm" wrap="nowrap">
                    <ThemeIcon size="sm" radius="xl" variant="light" color="orange">
                      <IconCheck size={12} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">{item}</Text>
                  </Group>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default UploadHRDoc;