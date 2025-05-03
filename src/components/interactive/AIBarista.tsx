import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Coffee, 
  MessageSquare, 
  ChevronRight, 
  LightbulbIcon, 
  XCircle, 
  Clock, 
  Sparkles,
  Brain
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { menuItems } from '@/data/menu-items';

interface AIBaristaProps {
  onOpenAssessment: () => void;
  onDismiss: () => void;
}

const initialMessages = [
  "Welcome to the AI Café! I'm your AI productivity barista. ☕",
  "I can help you discover how AI tools can boost your workplace productivity.",
  "What kind of workplace tasks do you spend the most time on?"
];

const taskOptions = [
  { id: 'email', label: 'Email & Communication', icon: <MessageSquare size={14} /> },
  { id: 'meetings', label: 'Meetings & Coordination', icon: <Clock size={14} /> },
  { id: 'documents', label: 'Creating & Editing Documents', icon: <Coffee size={14} /> },
  { id: 'data', label: 'Data Analysis & Reporting', icon: <Brain size={14} /> },
  { id: 'assessment', label: 'Take Full Assessment', icon: <Sparkles size={14} /> }
];

const productivityTips = {
  'email': {
    tip: "AI assistants can help manage your inbox by prioritizing messages, drafting responses, and extracting action items. This typically saves 30-60 minutes daily.",
    recommendation: "ai-writing-assistant"
  },
  'meetings': {
    tip: "AI meeting tools can transcribe conversations, summarize key points, and extract action items automatically. Many teams report 40% improvements in meeting productivity.",
    recommendation: "meeting-productivity"
  },
  'documents': {
    tip: "AI writing assistants can help you create first drafts, edit content, and ensure consistency across documents. Users report 60% faster document creation.",
    recommendation: "ai-writing-assistant"
  },
  'data': {
    tip: "AI data analysis tools let you ask questions about your data in plain language, create visualizations, and identify patterns instantly.",
    recommendation: "data-analysis-ai"
  }
};

const AIBarista: React.FC<AIBaristaProps> = ({ onOpenAssessment, onDismiss }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  // Simulate typing animation for messages
  useEffect(() => {
    if (currentMsgIndex < initialMessages.length) {
      setIsTyping(true);
      let i = 0;
      const message = initialMessages[currentMsgIndex];
      setCurrentMessage('');
      
      const typingInterval = setInterval(() => {
        if (i < message.length) {
          setCurrentMessage(prev => prev + message.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setMessages(prev => [...prev, message]);
          
          // After the last initial message, show task options
          if (currentMsgIndex === initialMessages.length - 1) {
            setTimeout(() => {
              setShowOptions(true);
            }, 500);
          }
          
          // Prepare for next message
          setTimeout(() => {
            setCurrentMsgIndex(prev => prev + 1);
          }, 1000);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [currentMsgIndex]);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
    setShowOptions(false);
    
    if (taskId === 'assessment') {
      // Handle opening the full assessment
      setMessages(prev => [
        ...prev, 
        "Great choice! Let's do a comprehensive assessment to identify all your productivity opportunities."
      ]);
      
      setTimeout(() => {
        onOpenAssessment();
      }, 1500);
    } else {
      // Show productivity tip for the selected task
      const response = `For ${taskOptions.find(t => t.id === taskId)?.label}, ${productivityTips[taskId].tip}`;
      
      setMessages(prev => [...prev, response]);
      
      setTimeout(() => {
        setShowRecommendation(true);
      }, 1000);
    }
  };

  const handleRecommendationClick = () => {
    if (!selectedTask || selectedTask === 'assessment') return;
    
    const recommendedItemId = productivityTips[selectedTask].recommendation;
    const recommendedItem = menuItems.find(item => item.id === recommendedItemId);
    
    if (recommendedItem) {
      toast({
        title: "Perfect match!",
        description: `I've highlighted the "${recommendedItem.title}" module for you.`,
        duration: 3000,
      });
      
      // Scroll to the recommended menu item
      setTimeout(() => {
        const element = document.getElementById(recommendedItemId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Add highlight effect
          element.classList.add('ring-4', 'ring-accent-teal', 'ring-opacity-50');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-accent-teal', 'ring-opacity-50');
          }, 3000);
        }
        
        // Close the assistant
        setTimeout(() => {
          onDismiss();
        }, 500);
      }, 1000);
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${expanded ? 'w-96' : 'w-72'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-coffee-dark p-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-accent-teal/90">
              <AvatarImage src="/barista-avatar.png" alt="AI Barista" />
              <AvatarFallback>
                <Coffee size={16} />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">AI Productivity Barista</div>
              <div className="text-xs text-coffee-cream/80 flex items-center">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-coffee-medium/80"
              onClick={() => setExpanded(!expanded)}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-coffee-medium/80"
              onClick={onDismiss}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Chat container */}
        <div className="p-4 max-h-96 overflow-y-auto bg-coffee-cream/10">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className="flex items-start gap-2 animate-fade-in">
                <Avatar className="h-8 w-8 mt-1 bg-accent-teal/90">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-coffee-light/10 p-3 rounded-lg rounded-tl-none max-w-[85%]">
                  <p className="text-sm">{msg}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-2 animate-fade-in">
                <Avatar className="h-8 w-8 mt-1 bg-accent-teal/90">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-coffee-light/10 p-3 rounded-lg rounded-tl-none max-w-[85%]">
                  <p className="text-sm">{currentMessage}<span className="animate-pulse">▋</span></p>
                </div>
              </div>
            )}
            
            {/* Task selection options */}
            {showOptions && (
              <div className="pl-10 animate-fade-in">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-coffee-light/20">
                  <p className="text-xs text-muted-foreground mb-2">Select what you'd like help with:</p>
                  <div className="space-y-2">
                    {taskOptions.map(task => (
                      <Button 
                        key={task.id}
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start text-left font-normal"
                        onClick={() => handleTaskSelect(task.id)}
                      >
                        <div className="bg-accent-teal/10 p-1 rounded-full mr-2">
                          {task.icon}
                        </div>
                        {task.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Recommendation */}
            {showRecommendation && selectedTask && (
              <div className="pl-10 animate-fade-in pt-2">
                <div 
                  className="bg-accent-teal/10 p-3 rounded-lg border border-accent-teal/20 cursor-pointer hover:bg-accent-teal/20 transition-colors"
                  onClick={handleRecommendationClick}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <LightbulbIcon size={16} className="text-amber-500" />
                    <span className="text-sm font-medium">Recommended for you:</span>
                  </div>
                  <div className="pl-6">
                    <p className="text-sm mb-2">
                      {productivityTips[selectedTask].recommendation === 'ai-writing-assistant' && 'AI Writing Assistant Module'}
                      {productivityTips[selectedTask].recommendation === 'meeting-productivity' && 'Meeting Efficiency Module'}
                      {productivityTips[selectedTask].recommendation === 'data-analysis-ai' && 'Data Analysis Module'}
                    </p>
                    <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                      <div className="bg-accent-teal h-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">92% match for your needs</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 bg-muted/50 flex items-center justify-between border-t">
          <Badge variant="outline" className="text-xs">AI-powered</Badge>
          <span className="text-xs text-muted-foreground">Productivity assistant</span>
        </div>
      </div>
    </div>
  );
};

export default AIBarista; 