import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell, Box } from '@mantine/core';
import NavbarComp from './components/NavbarComp.jsx';
import '@mantine/core/styles.css';
import { AppProvider } from './context/AppContext.jsx';

import Dashboard from './pages/Dashboard.jsx';
import UploadResume from './pages/UploadResume.jsx';
import RecommendRole from './pages/RecommendRole.jsx';
import Chat from './pages/Chat.jsx';
import UploadHRDoc from './pages/UploadHRDoc.jsx';

function App() {
  return (
    <AppProvider>
      <AppShell
        header={{ height: 70 }}
        padding="md"
      >
        <AppShell.Header>
          <NavbarComp />
        </AppShell.Header>

        <AppShell.Main>
          <Box p="md">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload-resume" element={<UploadResume />} />
              <Route path="/recommend-role" element={<RecommendRole />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/upload-hr-doc" element={<UploadHRDoc />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </AppShell.Main>
      </AppShell>
    </AppProvider>
  );
}

export default App;