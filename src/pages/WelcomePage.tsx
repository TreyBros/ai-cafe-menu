import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/stores/sessionStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TabletLayout from '@/components/layout/TabletLayout';

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

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { session, setUserName } = useSessionStore();
  const [name, setName] = useState(session.userName || '');
  const [isNameValid, setIsNameValid] = useState(Boolean(session.userName));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(newName.trim().length > 0);
  };

  const handleContinue = () => {
    if (isNameValid) {
      setUserName(name.trim());
      navigate('/categories');
    }
  };

  return (
    <TabletLayout 
      currentStep={1}
      showBackButton={false}
      showNextButton={false}
    >
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative inline-block mb-8" variants={itemVariants}>
          <div className="absolute -z-10 w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20"></div>
          <div className="relative">
            <motion.div 
              animate={{
                boxShadow: ['0 0 15px 2px rgba(0, 57, 166, 0.3)', '0 0 25px 8px rgba(0, 57, 166, 0.5)', '0 0 15px 2px rgba(0, 57, 166, 0.3)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="rounded-full p-3"
            >
              <Coffee size={64} className="text-blue-dark" />
            </motion.div>
            <div className="steam left-2" />
            <div className="steam left-5" style={{ animationDelay: '0.5s' }} />
            <div className="steam left-3" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-2">
          <Badge className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white">
            <Sparkles size={16} className="mr-1" /> VSP Premium Experience
          </Badge>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl font-bold mb-4 font-cafe text-blue-dark"
        >
          Welcome to VSP AI Café
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-xl text-slate-600 mb-8"
        >
          Your premium AI learning journey begins here, tailored specifically for iPad
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-dark">Before we begin</h2>
          <p className="text-slate-600 mb-6">Please tell us your name so we can personalize your experience</p>
          
          <div className="max-w-md mx-auto">
            <label htmlFor="userName" className="block text-left text-sm font-medium text-slate-700 mb-1">
              Your Name
            </label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              className="mb-4"
              autoComplete="off"
            />
            
            <Button 
              onClick={handleContinue}
              disabled={!isNameValid}
              className="w-full bg-blue-dark hover:bg-blue-darker text-white"
              size="lg"
            >
              Continue to Menu
            </Button>
          </div>
        </motion.div>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm text-slate-500"
        >
          Tap 'Continue' to explore our premium AI learning menu
        </motion.p>
      </motion.div>
    </TabletLayout>
  );
};

export default WelcomePage; 