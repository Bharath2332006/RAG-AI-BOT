import { useNavigate, useLocation } from 'react-router-dom';
import { Group, Button, Text, Container, ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconFileTypePdf } from '@tabler/icons-react';
import { useApp } from '../context/AppContext.jsx';

export default function NavbarComp() {
  const nav = useNavigate();
  const { resumeId } = useApp();
  const loc = useLocation();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const active = (path) => (loc.pathname === path ? 'light' : 'subtle');

  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => nav('/')}>
          <IconFileTypePdf size={30} color="var(--mantine-color-indigo-6)" />
          <Text fw={800} size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
            RAG Resume
          </Text>
        </Group>

        <Group gap="sm">
          <Button variant={active('/')} onClick={() => nav('/')}>Dashboard</Button>
          <Button variant={active('/upload-resume')} onClick={() => nav('/upload-resume')}>Upload Resume</Button>
          <Button variant={active('/recommend-role')} onClick={() => nav('/recommend-role')}>Recommend Role</Button>
          <Button variant={active('/chat')} onClick={() => nav('/chat')}>Chat</Button>
          <Button variant={active('/upload-hr-doc')} onClick={() => nav('/upload-hr-doc')}>Upload HR Doc</Button>

          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
          >
            {computedColorScheme === 'light' ? <IconMoon size={18} stroke={1.5} /> : <IconSun size={18} stroke={1.5} />}
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
}
