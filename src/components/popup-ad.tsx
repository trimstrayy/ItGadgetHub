import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PRODUCTS, Product } from '@/data/products';
import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export function PopupAd() {
  const [isOpen, setIsOpen] = useState(false);
  const [randomProduct, setRandomProduct] = useState<Product | null>(null);

  const showAd = () => {
    const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
    setRandomProduct(PRODUCTS[randomIndex]);
    setIsOpen(true);
  };

  useEffect(() => {
    const showAdIfNeeded = () => {
      const lastAdTime = localStorage.getItem('lastAdTime');
      const now = new Date().getTime();

      if (!lastAdTime || now - Number(lastAdTime) > 10 * 60 * 1000) {
        showAd();
      }
    };

    // Show on initial load/refresh
    showAdIfNeeded();

    const interval = setInterval(() => {
      showAd();
    }, 10 * 60 * 1000); // 10 minutes

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!isOpen || !randomProduct) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] glass-strong">
        <DialogHeader>
          <DialogTitle>Check out this amazing deal!</DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <Link to="/product/$slug" params={{ slug: randomProduct.slug }} onClick={() => setIsOpen(false)}>
            <img
              src={randomProduct.image}
              alt={randomProduct.name}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{randomProduct.name}</h3>
            <p className="text-primary font-bold text-xl">NPR {randomProduct.price.toLocaleString()}</p>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
