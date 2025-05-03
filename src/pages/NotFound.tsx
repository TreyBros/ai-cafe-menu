import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.1
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

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/30 dark:to-blue-950/60">
      <motion.div 
        className="text-center px-6 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-blue-100/80 dark:bg-blue-800/30 blur-lg"></div>
            <div className="relative">
              <Coffee size={96} className="text-blue-medium mx-auto" />
            </div>
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-5xl font-cafe font-bold mb-6 text-blue-dark dark:text-blue-light"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-xl text-muted-foreground mb-10"
        >
          Sorry, this menu item is no longer available. 
          <br />
          Our chef might be brewing a new version.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            className="bg-transparent hover:bg-blue-50 text-blue-medium hover:text-blue-dark border-2 border-blue-medium"
            size="lg"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            className="bg-blue-medium hover:bg-blue-dark text-white"
            size="lg"
          >
            <Home size={18} className="mr-2" />
            Return to Menu
          </Button>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-16 text-sm text-muted-foreground"
        >
          <p>Error 404 - Page not found</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
