import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Coffee, ClipboardList, CreditCard, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TabletLayout from '@/components/layout/TabletLayout';
import { useSessionStore } from '@/stores/sessionStore';
import { getMenuItemById, getCoffeeItemById } from '@/data/menu-items';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, setEmail, completeOrderItem, getReceipt } = useSessionStore();
  const [email, setEmailInput] = useState(session.emailAddress || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const currentOrder = session.currentOrder[0] || null;
  const menuItem = currentOrder ? getMenuItemById(currentOrder.menuItemId) : null;
  const coffeeItem = currentOrder && currentOrder.coffeeItemId 
    ? getCoffeeItemById(currentOrder.coffeeItemId) 
    : null;
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };
  
  const handleSubmit = () => {
    if (currentOrder) {
      setIsSubmitting(true);
      
      // Simulate processing with a slight delay
      setTimeout(() => {
        // Save email if provided
        if (email) {
          setEmail(email);
        }
        
        // Complete the order
        completeOrderItem(currentOrder.id);
        setIsSubmitting(false);
        setIsComplete(true);
        
        // After a short delay, show completion animation
        setTimeout(() => {
          // Here we could redirect to a receipt page, but for tablet flow,
          // we'll just show the completion state in this page
        }, 800);
      }, 1500);
    }
  };
  
  // Calculate the total
  const calculateTotal = () => {
    let total = 0;
    
    if (menuItem) {
      total += parseFloat(menuItem.price.replace('$', ''));
    }
    
    if (coffeeItem) {
      total += parseFloat(coffeeItem.price.replace('$', ''));
    }
    
    return total.toFixed(2);
  };
  
  return (
    <TabletLayout
      currentStep={6}
      showNextButton={false}
      showBackButton={!isComplete}
    >
      <div className="max-w-4xl mx-auto">
        {!isComplete ? (
          // Checkout form
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-5 gap-8"
          >
            {/* Order summary section - 2 columns */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <ClipboardList size={20} className="text-blue-dark mr-2" />
                <h2 className="text-xl font-bold text-blue-dark">Order Summary</h2>
              </div>
              
              {menuItem && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-slate-100 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={menuItem.image} 
                        alt={menuItem.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-dark">{menuItem.title}</h3>
                      <div className="text-sm text-slate-600 mb-1">{menuItem.category} • {menuItem.duration}</div>
                      <div className="text-blue-600 font-medium">{menuItem.price}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {coffeeItem && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-amber-50 rounded overflow-hidden mr-3 flex-shrink-0">
                      <Coffee size={24} className="m-2 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-dark">{coffeeItem.name}</h3>
                      <div className="text-sm text-slate-600 mb-1">Coffee Pairing</div>
                      <div className="text-blue-600 font-medium">{coffeeItem.price}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 font-bold text-lg">
                <span className="text-blue-dark">Total:</span>
                <span className="text-blue-600">${calculateTotal()}</span>
              </div>
            </motion.div>
            
            {/* Checkout form section - 3 columns */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-3 bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center mb-6">
                <CreditCard size={20} className="text-blue-dark mr-2" />
                <h2 className="text-xl font-bold text-blue-dark">Complete Your Order</h2>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email (Optional)
                </label>
                <div className="flex items-center">
                  <Mail size={16} className="text-slate-400 absolute ml-3" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  We'll use this to send you the receipt and learning materials
                </p>
              </div>
              
              <p className="text-sm text-slate-600 mb-6">
                Your AI learning experience will be available immediately after checkout.
                No payment is required for this demo.
              </p>
              
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-dark hover:bg-blue-darker text-white"
                size="lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2" size={16} />
                    Complete Order
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          // Order complete view
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={48} className="text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-4 text-blue-dark">Order Complete!</h1>
            <p className="text-xl text-slate-600 mb-6">
              Your AI learning experience is ready
            </p>
            
            {menuItem && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-bold text-lg text-blue-dark mb-2">{menuItem.title}</h3>
                {coffeeItem && (
                  <div className="text-slate-600 mb-2">
                    Paired with: {coffeeItem.name}
                  </div>
                )}
                <div className="text-green-600 font-bold">
                  Purchased for ${calculateTotal()}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => navigate('/lesson/' + currentOrder?.menuItemId)}
                className="bg-blue-dark hover:bg-blue-darker"
                size="lg"
              >
                Start Learning
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/categories')}
              >
                Explore More Courses
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </TabletLayout>
  );
};

export default CheckoutPage; 