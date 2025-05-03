import React, { useState } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Coffee, Send, Download, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReceiptSummary: React.FC = () => {
  const { session, getReceipt, setEmail, resetSession } = useSessionStore();
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const receipt = getReceipt();
  
  const handleSendEmail = () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      setEmail(emailInput);
      setIsSubmitting(false);
      toast({
        title: "Receipt sent!",
        description: `We've sent your AI Café learning receipt to ${emailInput}`,
        duration: 3000,
      });
    }, 1500);
  };
  
  const handleNewSession = () => {
    resetSession();
    toast({
      title: "New session started",
      description: "Your learning journey has been reset. Enjoy your new AI Café experience!",
      duration: 3000,
    });
  };
  
  return (
    <Card className="border border-blue-light/20">
      <CardHeader className="bg-blue-dark text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee size={24} />
            <CardTitle className="font-cafe text-xl">VSP AI Café Receipt</CardTitle>
          </div>
          <div className="text-sm text-blue-pale">{receipt.date}</div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-cafe font-semibold mb-3">Your Learning Journey</h3>
          
          {session.completedItems.length > 0 ? (
            <ul className="space-y-3">
              {session.completedItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle size={18} className="text-highlights-blue mr-2" />
                  <span>{item.title}</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {item.category}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">You haven't completed any lessons yet. Explore our menu and start learning!</p>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-cafe font-semibold mb-3">Learning Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <Clock size={18} className="mx-auto mb-1" />
              <p className="text-2xl font-bold">{receipt.stats.timeSpentMinutes} min</p>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <Coffee size={18} className="mx-auto mb-1" />
              <p className="text-2xl font-bold">{receipt.stats.totalItems}</p>
              <p className="text-sm text-muted-foreground">Items Completed</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <CheckCircle size={18} className="mx-auto mb-1" />
              <p className="text-2xl font-bold">{receipt.stats.categoriesCompleted}/3</p>
              <p className="text-sm text-muted-foreground">Categories Explored</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-cafe font-semibold mb-3">Get Your Receipt</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Enter your email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                type="email"
              />
            </div>
            <Button 
              onClick={handleSendEmail} 
              disabled={isSubmitting}
              className="bg-blue-medium hover:bg-blue-dark"
            >
              <Send size={16} className="mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Receipt'}
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-border pt-4">
        <div className="text-sm text-muted-foreground">
          Session ID: {receipt.sessionId.substring(0, 8)}...
        </div>
        <Button variant="ghost" onClick={handleNewSession}>Start New Session</Button>
      </CardFooter>
    </Card>
  );
};

export default ReceiptSummary;
