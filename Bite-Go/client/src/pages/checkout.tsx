import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, QrCode, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { items, total, subtotal, deliveryFee, tax, clearCart } = useCart();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "Mumbai",
    pincode: "",
    instructions: "",
    transactionId: "",
  });

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const orderData = {
        userId: user?.id || null,
        customerName: formData.name,
        customerEmail: user?.email || "",
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        deliveryInstructions: formData.instructions || null,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        deliveryFee,
        tax,
        total,
        paymentMethod,
        transactionId: paymentMethod === "qr" ? formData.transactionId : null,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const order = await response.json();
      
      // Store order ID for success page
      localStorage.setItem("last_order_id", order.id.toString());
      
      clearCart();
      setLocation("/success");
    } catch (error: any) {
      toast({
        title: "Order failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    required 
                    data-testid="input-checkout-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    required 
                    data-testid="input-checkout-phone"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="House no, Street, Area..." 
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  required 
                  data-testid="input-checkout-address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    data-testid="input-checkout-city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input 
                    id="pincode" 
                    type="number" 
                    value={formData.pincode}
                    onChange={(e) => updateFormData("pincode", e.target.value)}
                    required 
                    data-testid="input-checkout-pincode"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="online" id="online" data-testid="radio-payment-online" />
                  <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                        <div className="font-bold">Pay Online</div>
                        <div className="text-xs text-muted-foreground">UPI, Cards, NetBanking</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="qr" id="qr" data-testid="radio-payment-qr" />
                  <Label htmlFor="qr" className="flex items-center gap-2 cursor-pointer flex-1">
                    <QrCode className="h-5 w-5 text-primary" />
                    <div>
                        <div className="font-bold">Scan QR Code</div>
                        <div className="text-xs text-muted-foreground">Scan and pay via any UPI app</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "qr" && (
                <div className="mt-6 p-6 bg-muted/30 rounded-lg flex flex-col items-center text-center animate-in fade-in slide-in-from-top-2">
                  <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
                     <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=merchant@upi&pn=BiteGo&am=${total}`}
                        alt="Payment QR" 
                        className="h-32 w-32"
                     />
                  </div>
                  <p className="text-sm font-medium mb-2">Scan with GPay, PhonePe, or Paytm</p>
                  <div className="w-full max-w-xs space-y-2 text-left">
                      <Label htmlFor="txn" className="text-xs">Enter Transaction ID (Optional)</Label>
                      <Input 
                        id="txn" 
                        placeholder="Txn ID / Ref No." 
                        value={formData.transactionId}
                        onChange={(e) => updateFormData("transactionId", e.target.value)}
                        data-testid="input-transaction-id"
                      />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20 shadow-lg shadow-primary/5">
                <CardHeader className="bg-primary/5 border-b">
                    <CardTitle className="text-primary">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-2">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm" data-testid={`order-item-${item.id}`}>
                                <span>{item.quantity}x {item.name}</span>
                                <span className="font-medium">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div className="py-4 space-y-2">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total to Pay</span>
                            <span data-testid="text-total">₹{total}</span>
                        </div>
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full py-6 text-lg font-bold" 
                        disabled={isSubmitting}
                        data-testid="button-place-order"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                            </>
                        ) : "Place Order"}
                    </Button>
                </CardContent>
            </Card>
        </div>
      </form>
    </div>
  );
}
