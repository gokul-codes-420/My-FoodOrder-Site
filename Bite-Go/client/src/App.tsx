import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { Layout } from "@/components/layout";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import MenuPage from "@/pages/menu";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import SuccessPage from "@/pages/success";
import NotFound from "@/pages/not-found";

// Wrapper for protected routes
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect to="/" />;
  }
  
  return <Component />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/home">
          <ProtectedRoute component={HomePage} />
        </Route>
        <Route path="/menu">
          <ProtectedRoute component={MenuPage} />
        </Route>
        <Route path="/cart">
          <ProtectedRoute component={CartPage} />
        </Route>
        <Route path="/checkout">
          <ProtectedRoute component={CheckoutPage} />
        </Route>
        <Route path="/success">
          <ProtectedRoute component={SuccessPage} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
