
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MenuDisplay from '@/components/menu/MenuDisplay';
import { menuItems } from '@/data/menu-items';
import Layout from '@/components/layout/Layout';
import ReceiptSummary from '@/components/receipt/ReceiptSummary';
import { Coffee, ChevronDown } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';

const Index = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const { session } = useSessionStore();
  const hasCompletedItems = session.completedItems.length > 0;
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="mb-12 py-12 px-4 bg-gradient-to-br from-coffee-cream to-white dark:from-coffee-dark dark:to-coffee-medium/50 rounded-xl text-center">
        <div className="relative inline-block mb-6">
          <Coffee size={48} className="text-coffee-dark dark:text-coffee-cream" />
          <div className="steam left-2" />
          <div className="steam left-5" style={{ animationDelay: '0.5s' }} />
          <div className="steam left-3" style={{ animationDelay: '1s' }} />
        </div>
        <h1 className="text-4xl md:text-5xl font-cafe font-bold text-coffee-dark dark:text-coffee-cream mb-4">
          VSP AI Café
        </h1>
        <p className="text-xl md:text-2xl text-coffee-medium dark:text-coffee-light mb-8 max-w-2xl mx-auto">
          Grab a quick AI learning coffee break - energizing knowledge in just minutes
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-coffee-medium hover:bg-coffee-dark font-medium text-white"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Browse Menu
            <ChevronDown size={16} className="ml-2" />
          </Button>
          
          {hasCompletedItems && (
            <Button 
              size="lg" 
              variant="outline"
              className="border-coffee-medium text-coffee-dark dark:text-coffee-light"
              onClick={() => setShowReceipt(!showReceipt)}
            >
              {showReceipt ? 'Hide Receipt' : 'View Learning Receipt'}
            </Button>
          )}
        </div>
      </section>
      
      {/* Receipt section (conditionally shown) */}
      {showReceipt && hasCompletedItems && (
        <section className="mb-12">
          <ReceiptSummary />
        </section>
      )}
      
      {/* Menu section */}
      <section id="menu">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-3">
            Today's Learning Menu
          </h2>
          <p className="text-muted-foreground">
            Browse our selection of bite-sized AI learning modules designed for quick consumption
          </p>
        </div>
        <MenuDisplay items={menuItems} />
      </section>
    </Layout>
  );
};

export default Index;
