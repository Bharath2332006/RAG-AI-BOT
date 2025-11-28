import { Card, Group, Button, FileInput, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

export default function FileUploadCard({ title = 'Upload file', onUpload, accept = '' }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const doUpload = async () => {
    if (!file) return;
    setBusy(true);
    try {
      await onUpload(file);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card withBorder shadow="sm" radius="md">
      <Text fw={600} mb="sm">{title}</Text>
      <Group align="flex-end" gap="sm">
        <FileInput
          placeholder="Choose a file"
          accept={accept}
          value={file}
          onChange={setFile}
          w={420}
        />
        <Button leftSection={<IconUpload size={16} />} loading={busy} onClick={doUpload} disabled={!file}>
          Upload
        </Button>
      </Group>
    </Card>
  );
}
