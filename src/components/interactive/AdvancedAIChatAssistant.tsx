import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; 
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Bot,
  X,
  User,
  Send,
  Brain,
  Sparkles,
  Lightbulb,
  Zap,
  RefreshCw,
  Clock,
  Minimize2,
  PanelTop,
  Maximize2,
  LayoutGrid
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggested?: boolean;
}

interface AdvancedAIChatAssistantProps {
  onOpenAssessment: () => void;
  onViewDashboard: () => void;
  onViewAchievements: () => void;
  onDismiss: () => void;
}

const AdvancedAIChatAssistant: React.FC<AdvancedAIChatAssistantProps> = ({
  onOpenAssessment,
  onViewDashboard,
  onViewAchievements,
  onDismiss
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi there! I'm your AI Productivity Assistant. I'm here to help you learn how to boost your efficiency with AI tools.",
      timestamp: new Date(),
      isTyping: false
    }
  ]);
  
  const suggestedPrompts = [
    {
      text: "How do I get started with AI tools?",
      icon: <Lightbulb size={14} className="mr-1" />
    },
    {
      text: "What can AI do for my productivity?",
      icon: <Zap size={14} className="mr-1" />
    },
    {
      text: "Take the productivity assessment",
      icon: <Brain size={14} className="mr-1" />,
      action: onOpenAssessment
    },
    {
      text: "Show my learning dashboard",
      icon: <LayoutGrid size={14} className="mr-1" />,
      action: onViewDashboard
    }
  ];
  
  useEffect(() => {
    // Auto-scroll to bottom when new messages appear
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    // Show typing animation for initial welcome message
    setTimeout(() => {
      const newMessage: Message = {
        id: '2',
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isTyping: true
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(true);
      
      // Now animate the typing of this message
      const fullText = "I can guide you through our learning modules, help you understand AI concepts, or suggest practical tools for your workflow. What would you like to know today?";
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === '2' 
                ? {...msg, content: fullText.substring(0, charIndex + 1)} 
                : msg
            )
          );
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === '2' ? {...msg, isTyping: false} : msg
            )
          );
          
          // Add a message with suggested prompts
          setMessages(prev => [
            ...prev, 
            {
              id: '3',
              role: 'assistant',
              content: 'Here are some things you can ask me:',
              timestamp: new Date(),
              suggested: true
            }
          ]);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }, 1000);
  }, []);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isTyping) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue.trim());
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Animate typing
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < botResponse.length) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === responseMessage.id 
                ? {...msg, content: botResponse.substring(0, charIndex + 1)} 
                : msg
            )
          );
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === responseMessage.id ? {...msg, isTyping: false} : msg
            )
          );
        }
      }, 20);
    }, 1000);
  };
  
  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('assessment') || lowerMsg.includes('test')) {
      setTimeout(() => onOpenAssessment(), 2000);
      return "I'd be happy to start the productivity assessment for you. This will help us understand your current workflow and identify areas where AI can help you save time. I'll open that for you now...";
    }
    
    if (lowerMsg.includes('dashboard') || lowerMsg.includes('progress')) {
      setTimeout(() => onViewDashboard(), 2000);
      return "Let me open your learning dashboard so you can see your progress. It has information about the modules you've completed and your productivity improvements. Opening that now...";
    }
    
    if (lowerMsg.includes('achievement') || lowerMsg.includes('badge') || lowerMsg.includes('reward')) {
      setTimeout(() => onViewAchievements(), 2000);
      return "Let's check out your achievements! You can see what you've unlocked and what badges are still available to earn. Opening that now...";
    }
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg.includes('hey')) {
      return "Hello! It's great to chat with you. I'm your AI Productivity Assistant. What can I help you with today?";
    }
    
    if (lowerMsg.includes('ai tool') || lowerMsg.includes('get started') || lowerMsg.includes('begin')) {
      return "To get started with AI productivity tools, I recommend first exploring our 'AI Productivity Espresso' module. It's a quick introduction to the key concepts. Then, based on your specific needs, you might want to check out our writing assistant, data analysis, or meeting efficiency modules.";
    }
    
    if (lowerMsg.includes('writing') || lowerMsg.includes('document') || lowerMsg.includes('content')) {
      return "AI writing assistants like ChatGPT can help with drafting emails, creating summaries, editing documents, and generating creative content. Our 'AI Writing Assistant Macchiato' module covers practical examples and best practices for using these tools effectively.";
    }
    
    if (lowerMsg.includes('data') || lowerMsg.includes('analysis') || lowerMsg.includes('spreadsheet')) {
      return "AI can transform your data analysis workflow! Tools can help you query data in natural language, create visualizations automatically, identify patterns, and make predictions. Check out our 'Data Analysis Cappuccino' module to learn practical techniques.";
    }
    
    if (lowerMsg.includes('meeting') || lowerMsg.includes('call') || lowerMsg.includes('zoom')) {
      return "AI meeting tools can transcribe conversations, create summaries, extract action items, and even participate as assistants. Our 'Meeting Efficiency Mocha' module demonstrates how to implement these in your workflow to save hours every week.";
    }
    
    if (lowerMsg.includes('save time') || lowerMsg.includes('productivity') || lowerMsg.includes('efficient')) {
      return "Based on our research, users typically save 5-10 hours per week by implementing AI tools in their workflow. The biggest time-savers are usually: automating repetitive tasks, using AI for first drafts of written content, and leveraging AI for data analysis and summarization.";
    }
    
    return "That's an interesting question! We have several learning modules that might help with that. I'd recommend exploring our menu of AI productivity topics to find specific guidance for your needs. Would you like me to point you to a specific area?";
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedPrompt = (text: string, action?: () => void) => {
    setInputValue(text);
    
    if (action) {
      // If there's a direct action, perform it
      action();
    } else {
      // Otherwise treat it as a regular message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      
      // Simulate AI thinking
      setTimeout(() => {
        const botResponse = getBotResponse(text);
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isTyping: true
        };
        
        setMessages(prev => [...prev, responseMessage]);
        
        // Animate typing
        let charIndex = 0;
        const typingInterval = setInterval(() => {
          if (charIndex < botResponse.length) {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === responseMessage.id 
                  ? {...msg, content: botResponse.substring(0, charIndex + 1)} 
                  : msg
              )
            );
            charIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setMessages(prev => 
              prev.map(msg => 
                msg.id === responseMessage.id ? {...msg, isTyping: false} : msg
              )
            );
          }
        }, 20);
      }, 1000);
    }
  };
  
  const handleMinimize = () => {
    setIsMinimized(true);
  };
  
  const handleMaximize = () => {
    setIsMinimized(false);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isMinimized ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button 
            className="w-12 h-12 rounded-full bg-coffee-dark hover:bg-coffee-medium shadow-lg"
            onClick={handleMaximize}
          >
            <Bot size={24} />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className="w-[380px] h-[500px] shadow-xl border border-coffee-light/20 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-coffee-dark text-white">
              <div className="flex items-center">
                <Bot size={18} className="mr-2" />
                <h3 className="font-semibold">AI Productivity Assistant</h3>
              </div>
              <div className="flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/10" onClick={handleMinimize}>
                        <Minimize2 size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Minimize</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/10" onClick={handleClose}>
                        <X size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Close</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  {message.role === 'user' ? (
                    <div className="flex items-start justify-end">
                      <div className="bg-coffee-medium text-white rounded-lg rounded-tr-none p-3 max-w-[80%]">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="bg-coffee-medium rounded-full ml-2 p-1.5">
                        <User size={16} className="text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <div className="bg-accent-teal rounded-full mr-2 p-1.5">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%] shadow-sm">
                        <p className="text-sm">{message.content}</p>
                        {message.isTyping && (
                          <div className="flex space-x-1 mt-1">
                            <motion.div
                              animate={{ scale: [0.5, 1, 0.5] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="bg-coffee-medium/40 rounded-full h-1.5 w-1.5"
                            />
                            <motion.div
                              animate={{ scale: [0.5, 1, 0.5] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                              className="bg-coffee-medium/40 rounded-full h-1.5 w-1.5"
                            />
                            <motion.div
                              animate={{ scale: [0.5, 1, 0.5] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                              className="bg-coffee-medium/40 rounded-full h-1.5 w-1.5"
                            />
                          </div>
                        )}
                        
                        {message.suggested && (
                          <div className="mt-3 flex flex-col space-y-2">
                            {suggestedPrompts.map((prompt, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="justify-start h-auto py-2 px-3 text-xs text-left"
                                onClick={() => handleSuggestedPrompt(prompt.text, prompt.action)}
                              >
                                {prompt.icon}
                                <span>{prompt.text}</span>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end">
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 resize-none rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
                  rows={1}
                  maxRows={4}
                  disabled={isTyping}
                />
                <Button
                  className={`rounded-l-none h-[38px] px-3 ${
                    isTyping || inputValue.trim() === '' 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-accent-teal hover:bg-accent-teal/90'
                  }`}
                  onClick={handleSendMessage}
                  disabled={isTyping || inputValue.trim() === ''}
                >
                  <Send size={18} />
                </Button>
              </div>
              
              {!inputValue && (
                <div className="flex justify-center mt-2">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Sparkles size={12} className="mr-1 text-accent-teal" />
                    <span>Powered by AI</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedAIChatAssistant; 