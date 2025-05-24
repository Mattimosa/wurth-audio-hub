
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import Index from "./pages/Index";
import Digital from "./pages/Digital";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SeriesPage from "./pages/SeriesPage";
import EpisodePage from "./pages/EpisodePage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/series/:slug" element={<SeriesPage />} />
            <Route path="/series/:slug/:episodeId" element={<EpisodePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
