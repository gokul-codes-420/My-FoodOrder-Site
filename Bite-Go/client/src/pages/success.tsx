import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const [orderId, setOrderId] = useState<string>("");
  
  useEffect(() => {
    // Get order ID from localStorage
    const lastOrderId = localStorage.getItem("last_order_id");
    if (lastOrderId) {
      setOrderId(lastOrderId);
    }

    // Confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/10 text-center">
      <div className="bg-card p-8 md:p-12 rounded-3xl shadow-xl border max-w-lg w-full animate-in zoom-in duration-500">
        <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-success-title">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for ordering with Bite Go. Your delicious food is being prepared.
        </p>
        
        <div className="bg-muted/30 p-4 rounded-xl mb-8 text-left space-y-2">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-bold" data-testid="text-order-id">
                  {orderId ? `#ORD${orderId}` : `#ORD${Math.floor(Math.random() * 10000)}`}
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Time</span>
                <span className="font-bold">35-45 mins</span>
            </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/home">
            <Button className="w-full h-12 text-lg rounded-xl" data-testid="button-home">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" className="w-full h-12 text-lg rounded-xl" data-testid="button-order-more">
              <ShoppingBag className="mr-2 h-4 w-4" /> Order More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
