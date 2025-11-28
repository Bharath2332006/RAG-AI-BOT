import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { uploadResume } from '../api/backend.js';
import FileUploadCard from '../components/FileUploadCard.jsx';
import { Stack, Text, Title, Box, Paper, Badge, Group, Grid, ThemeIcon } from '@mantine/core';
import { IconUpload, IconCheck } from '@tabler/icons-react';

function UploadResume() {
  const { setResumeId, notify } = useApp();

  const handleUpload = async (file) => {
    const data = await uploadResume(file);
    setResumeId(data.resume_id);
    notify('Resume Uploaded', `Resume ID: ${data.resume_id}`, 'teal');
  };

  return (
    <Box px="xl" py={50}>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }} offset={{ base: 0, lg: 2 }}>
          <Stack gap="xl">
            <Box>
              <Title order={1} fw={700} mb="md">Upload Your Resume</Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
                Upload your resume to unlock AI-powered role recommendations and access our intelligent HR assistant.
                Your data is processed securely and stored with enterprise-grade encryption.
              </Text>
            </Box>

            <Paper shadow="lg" p={40} radius="lg" withBorder>
              <Stack gap="xl">
                <Box>
                  <Group gap="xs" mb="md">
                    <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                      <IconUpload size={20} />
                    </ThemeIcon>
                    <Title order={3} fw={600}>Document Upload</Title>
                  </Group>
                  <Text size="sm" c="dimmed" mb="lg">
                    We accept PDF, DOC, and DOCX files up to 10MB in size
                  </Text>

                  <Group gap="sm" mb="lg">
                    <Badge size="lg" variant="light" color="blue">PDF</Badge>
                    <Badge size="lg" variant="light" color="blue">DOC</Badge>
                    <Badge size="lg" variant="light" color="blue">DOCX</Badge>
                    <Badge size="lg" variant="light" color="gray">Max 10MB</Badge>
                  </Group>
                </Box>

                <FileUploadCard title="Upload Resume" onUpload={handleUpload} accept=".pdf,.doc,.docx" />

                <Box>
                  <Title order={4} fw={600} mb="md">What happens next?</Title>
                  <Stack gap="sm">
                    {[
                      'Your resume is securely uploaded and encrypted',
                      'AI analyzes your skills, experience, and qualifications',
                      'You receive a unique Resume ID for future reference',
                      'All platform features become available instantly'
                    ].map((item, i) => (
                      <Group key={i} gap="sm" wrap="nowrap">
                        <ThemeIcon size="sm" radius="xl" variant="light" color="green">
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
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default UploadResume;