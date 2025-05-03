import React from 'react';
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSessionStore } from '@/stores/sessionStore';
import { motion } from 'framer-motion';

interface TabletLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextButtonText?: string;
  onNext?: () => void;
}

// Define the flow steps
const FLOW_STEPS = [
  {path: '/welcome', name: 'Welcome'},
  {path: '/categories', name: 'Menu Categories'},
  {path: '/items', name: 'Menu Items'},
  {path: '/item-detail', name: 'Item Details'},
  {path: '/coffee-pairing', name: 'Coffee Pairing'},
  {path: '/checkout', name: 'Checkout'}
];

const TabletLayout: React.FC<TabletLayoutProps> = ({ 
  children, 
  currentStep = 0, 
  totalSteps = FLOW_STEPS.length,
  showBackButton = true,
  showNextButton = true,
  nextButtonText = "Next",
  onNext
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useSessionStore();
  
  // Determine current step based on path if not specified
  const calculateCurrentStep = () => {
    if (currentStep > 0) return currentStep;
    const currentPath = location.pathname;
    const stepIndex = FLOW_STEPS.findIndex(step => 
      currentPath.startsWith(step.path)
    );
    return stepIndex !== -1 ? stepIndex + 1 : 1;
  };
  
  const actualCurrentStep = calculateCurrentStep();
  
  // Navigation handlers
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      const nextStepIndex = FLOW_STEPS.findIndex(step => 
        location.pathname.startsWith(step.path)
      ) + 1;
      
      if (nextStepIndex < FLOW_STEPS.length) {
        navigate(FLOW_STEPS[nextStepIndex].path);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-blue-dark text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Coffee size={28} className="text-blue-pale" />
              <div className="steam left-1" />
              <div className="steam left-3" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-xl md:text-2xl font-cafe font-bold">VSP AI Café</h1>
          </div>
          {session.userName && (
            <div className="text-blue-pale">
              Welcome, {session.userName}
            </div>
          )}
        </div>
      </header>

      {/* Progress indicator */}
      <div className="bg-white border-b border-slate-200 py-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-sm text-blue-dark font-medium">
              Step {actualCurrentStep} of {totalSteps}
            </div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-900 to-blue-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${(actualCurrentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="text-sm text-blue-dark font-medium">
              {FLOW_STEPS[actualCurrentStep - 1]?.name || ''}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 container mx-auto py-6 px-4 overflow-y-auto">
        {children}
      </main>

      {/* Navigation footer */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {showBackButton ? (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : <div />}
          
          {showNextButton && (
            <Button 
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-dark hover:bg-blue-darker"
            >
              {nextButtonText}
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default TabletLayout; 