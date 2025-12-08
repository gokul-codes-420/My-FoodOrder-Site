import { MenuItem } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function FoodCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
            {item.veg ? (
                <div className="h-6 w-6 rounded-sm border-2 border-green-600 p-0.5 flex items-center justify-center bg-white/90" title="Veg">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                </div>
            ) : (
                <div className="h-6 w-6 rounded-sm border-2 border-red-600 p-0.5 flex items-center justify-center bg-white/90" title="Non-Veg">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                </div>
            )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <span className="font-bold text-primary whitespace-nowrap">₹{item.price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
          {item.description}
        </p>
        
        <Button 
            onClick={handleAdd} 
            className="w-full mt-auto gap-2 group-hover:bg-primary group-hover:text-white"
            variant="outline"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
