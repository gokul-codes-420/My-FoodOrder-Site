import { Link } from "wouter";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, tax, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any delicious food yet. Check out our menu to get started!
        </p>
        <Link href="/menu">
          <Button size="lg" className="rounded-full px-8">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold mb-8">Your Cart ({itemCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl border shadow-sm">
              <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              
              <div className="flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-md hover:bg-white hover:shadow-sm"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-md hover:bg-white hover:shadow-sm"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Link href="/menu">
            <Button variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" /> Add more items
            </Button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-24">
            <h3 className="font-bold text-xl mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & Charges (5%)</span>
                <span>₹{tax}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">To Pay</span>
              <span className="font-bold text-2xl text-primary">₹{total}</span>
            </div>
            
            <Link href="/checkout">
              <Button className="w-full text-lg py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                Proceed to Checkout <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
