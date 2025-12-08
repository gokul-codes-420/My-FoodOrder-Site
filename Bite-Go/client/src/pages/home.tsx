import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, ShieldCheck, Utensils } from "lucide-react";
import heroImage from "@assets/stock_images/delicious_indian_foo_171055a3.jpg";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Indian Feast" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white animate-in slide-in-from-left duration-700 fade-in">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Order Delicious <br />
              <span className="text-primary">Indian Food</span> Online
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
              Fresh, hot, and authentic flavors delivered straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8 h-14 rounded-full">
                  View Menu <Utensils className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-white text-white hover:bg-white hover:text-black">
                  Start Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Utensils, title: "Authentic Dishes", desc: "Real spices, traditional recipes" },
              { icon: Clock, title: "Fast Delivery", desc: "Hot food at your door in 30 mins" },
              { icon: ShieldCheck, title: "Safe & Hygienic", desc: "Top safety standards followed" },
              { icon: MapPin, title: "Live Tracking", desc: "Track your order in real-time" },
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-4xl font-bold mb-6">Hungry?</h2>
            <Link href="/menu">
              <Button size="lg" className="rounded-full px-10">
                Browse All Dishes <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
