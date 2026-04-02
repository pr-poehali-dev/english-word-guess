import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpaceHome from "./pages/SpaceHome";
import ArticlesGame from "./pages/ArticlesGame";
import PresentSimpleGame from "./pages/PresentSimpleGame";
import QuestionWordsGame from "./pages/QuestionWordsGame";
import SportsGame from "./pages/SportsGame";
import ProfessionsGame from "./pages/ProfessionsGame";
import AppearanceGame from "./pages/AppearanceGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpaceHome />} />
          <Route path="/articles" element={<ArticlesGame />} />
          <Route path="/present-simple" element={<PresentSimpleGame />} />
          <Route path="/question-words" element={<QuestionWordsGame />} />
          <Route path="/sports" element={<SportsGame />} />
          <Route path="/professions" element={<ProfessionsGame />} />
          <Route path="/appearance" element={<AppearanceGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
