import { Card, Text } from '@mantine/core';

export default function ResponseBox({ title = 'Response', content }) {
  return (
    <Card withBorder shadow="xs" radius="md">
      <Text fw={600} mb="xs">{title}</Text>
      <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>{content || '—'}</Text>
    </Card>
  );
}
