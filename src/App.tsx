
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PodcastProvider } from "./contexts/PodcastContext";
import Index from "./pages/Index";
import Digital from "./pages/Digital";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import PodcastDetail from "./pages/PodcastDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PodcastProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PodcastProvider>
  </QueryClientProvider>
);

export default App;
