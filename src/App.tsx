import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DialectProvider } from "@/contexts/DialectContext";
import Index from "./pages/Index";
import LetsBeFamily5 from "./pages/LetsBeFamily5";
import WestWingBlessedMap from "./pages/WestWingBlessedMap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DialectProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/letsbeFamily⁵" element={<LetsBeFamily5 />} />
            <Route path="/letsbeFamily5" element={<LetsBeFamily5 />} />
            <Route path="/west-wing-blessed-map" element={<WestWingBlessedMap />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DialectProvider>
  </QueryClientProvider>
);

export default App;
