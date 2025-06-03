import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
  <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
  <span className="font-bold text-lg"></span>
</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors"> Inicio</Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">  Calculadora</Link>
              <Link to="/costo" className="text-sm font-medium text-foreground hover:text-primary transition-colors"> Calculá tu costo </Link>
              <Link to="/nosotros" className="text-sm font-medium hover:text-primary transition-colors">Nosotros</Link>
              <Link to="/contacto">Contacto</Link>
              <a href="#contacto" className="text-black/80 hover:text-black transition-colors duration-200">Contacto</a>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#inicio" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md">Inicio</a>
            <a href="#calculadora" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md">Calculadora</a>
            <a href="#calculacosto" className="text-sm font-medium text-foreground hover:text-primary transition-colors"> Calculá tu costo </a>
            <a href="#nosotros" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md">Nosotros</a>
            <a href="#contacto" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
};



export default Navbar;
