
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LessonPage from "./pages/LessonPage";
import NotFound from "./pages/NotFound";

// Tablet Flow Pages
import WelcomePage from "./pages/WelcomePage";
import CategoryPage from "./pages/CategoryPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import CoffeePairingPage from "./pages/CoffeePairingPage";
import CheckoutPage from "./pages/CheckoutPage";
import CoffeePage from "./pages/CoffeePage";

// Check if we should use the tablet flow based on URL param
const useTabletFlow = window.location.search.includes('tablet=true') || 
                      window.location.pathname.startsWith('/welcome') ||
                      window.location.pathname.startsWith('/categories') ||
                      window.location.pathname.startsWith('/items') ||
                      window.location.pathname.startsWith('/item-detail') ||
                      window.location.pathname.startsWith('/coffee-pairing') ||
                      window.location.pathname.startsWith('/checkout') ||
                      window.location.pathname.startsWith('/coffee');

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect to tablet flow or original flow based on parameter */}
          <Route path="/" element={useTabletFlow ? <Navigate to="/welcome" /> : <Index />} />
          
          {/* Tablet Flow Routes */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/item-detail/:itemId" element={<ItemDetailPage />} />
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/coffee-pairing/:itemId" element={<CoffeePairingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Original Routes */}
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
