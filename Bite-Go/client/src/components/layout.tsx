import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Menu, User, LogOut, Phone, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide navbar/footer on login page
  if (location === "/") {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const NavLinks = () => (
    <>
      <Link href="/home">
        <a className="text-foreground/80 hover:text-primary transition-colors font-medium">Home</a>
      </Link>
      <Link href="/menu">
        <a className="text-foreground/80 hover:text-primary transition-colors font-medium">Menu</a>
      </Link>
      <Link href="/home#contact">
        <a className="text-foreground/80 hover:text-primary transition-colors font-medium">Contact</a>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home">
            <a className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-primary tracking-tight">Bite Go</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <a className="relative p-2 hover:bg-accent rounded-full transition-colors group">
                <ShoppingCart className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </a>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/">
                <Button>Login</Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Bite Go</h3>
              <p className="text-muted-foreground text-sm">
                Authentic Indian flavors delivered to your doorstep. Fresh, hot, and delicious.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/menu">Menu</Link></li>
                <li><Link href="/cart">Cart</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 9361033010</li>
                <li>support@bitego.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:text-primary"><Instagram className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="hover:text-primary"><Facebook className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Bite Go. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
