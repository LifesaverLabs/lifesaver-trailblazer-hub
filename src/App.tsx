import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const LetsBeFamily5 = lazy(() => import("./pages/LetsBeFamily5"));
const WestWingBlessedMap = lazy(() => import("./pages/WestWingBlessedMap"));
const DroneCoverageCalculatorUSAT = lazy(() => import("./pages/DroneCoverageCalculatorUSAT"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/letsbeFamily⁵" element={<Suspense fallback={null}><LetsBeFamily5 /></Suspense>} />
          <Route path="/letsbeFamily5" element={<Suspense fallback={null}><LetsBeFamily5 /></Suspense>} />
          <Route path="/west-wing-blessed-map" element={<Suspense fallback={null}><WestWingBlessedMap /></Suspense>} />
          <Route path="/drone-coverage-calculator" element={<Suspense fallback={null}><DroneCoverageCalculatorUSAT /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
