
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from '@/contexts/AuthContext';
import Dashboard from '@/pages/Dashboard';
import Deposit from '@/pages/Deposit';
import Withdraw from '@/pages/Withdraw';
import Transactions from '@/pages/Transactions';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import AuthLayout from '@/components/auth/AuthLayout';
import LiveChat from '@/components/LiveChat';

function App() {
  const queryClient = new QueryClient();

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Toaster />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={
                <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your account">
                  <Login />
                </AuthLayout>
              } />
              <Route path="/signup" element={
                <AuthLayout title="Create an account" subtitle="Enter your details to get started">
                  <Signup />
                </AuthLayout>
              } />
            </Routes>
            <LiveChat />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}

export default App;
