import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from '@/pages/HomePage';
import { ReviewPage } from '@/pages/ReviewPage';
import { SuccessPage } from '@/pages/SuccessPage';
import { RejectedPage } from '@/pages/RejectedPage';
import { TestPortalPage } from '@/pages/TestPortalPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/approve/:token" element={<ReviewPage />} />
          <Route path="/approve/:token/success" element={<SuccessPage />} />
          <Route path="/approve/:token/rejected" element={<RejectedPage />} />
          <Route path="/test" element={<TestPortalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
