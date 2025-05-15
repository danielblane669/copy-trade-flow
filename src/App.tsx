
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthRedirect from "@/components/auth/AuthRedirect";
import LiveChat from "@/components/LiveChat";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes - Redirect to Dashboard if authenticated */}
              <Route 
                path="/" 
                element={
                  <AuthRedirect>
                    <Index />
                  </AuthRedirect>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <AuthRedirect>
                    <Login />
                  </AuthRedirect>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <AuthRedirect>
                    <Signup />
                  </AuthRedirect>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/deposit" 
                element={
                  <ProtectedRoute>
                    <Deposit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/withdraw" 
                element={
                  <ProtectedRoute>
                    <Withdraw />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/transactions" 
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <LiveChat />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
