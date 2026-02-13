import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DialectProvider } from "@/contexts/DialectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExternalRedirect from "./pages/ExternalRedirect";

const LetsBeFamily5 = lazy(() => import("./pages/LetsBeFamily5"));
const WestWingBlessedMap = lazy(() => import("./pages/WestWingBlessedMap"));
const DroneCoverageCalculatorUSAT = lazy(() => import("./pages/DroneCoverageCalculatorUSAT"));
const OpenSourceAcknowledgments = lazy(() => import("./pages/OpenSourceAcknowledgments"));
const SafewordPatent = lazy(() => import("./pages/SafewordPatent"));

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
            <Route path="/letsbeFamily⁵" element={<Suspense fallback={null}><LetsBeFamily5 /></Suspense>} />
            <Route path="/letsbeFamily5" element={<Suspense fallback={null}><LetsBeFamily5 /></Suspense>} />
            <Route path="/west-wing-blessed-map" element={<Suspense fallback={null}><WestWingBlessedMap /></Suspense>} />
            <Route path="/drone-coverage-calculator" element={<Suspense fallback={null}><DroneCoverageCalculatorUSAT /></Suspense>} />
            <Route path="/open-source-acknowledgments" element={<Suspense fallback={null}><OpenSourceAcknowledgments /></Suspense>} />
            <Route path="/safewordpatent" element={<Suspense fallback={null}><SafewordPatent /></Suspense>} />
            <Route path="/guilt+guiltprevention" element={<ExternalRedirect url="https://github.com/LifesaverLabs/safeword/tree/develop/" />} />
            <Route path="/storiesofstandards/safeword" element={<ExternalRedirect url="https://github.com/LifesaverLabs/safeword/tree/develop/personal_experience" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DialectProvider>
  </QueryClientProvider>
);

export default App;
