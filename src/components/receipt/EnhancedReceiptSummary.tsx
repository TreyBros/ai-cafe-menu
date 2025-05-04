import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSessionStore } from '@/stores/sessionStore';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  CircleCheck, 
  Coffee, 
  DownloadCloud, 
  Mail, 
  Clock, 
  Brain, 
  BadgeCheck, 
  CheckCheck, 
  Send,
  CreditCard,
  BookOpen,
  Sparkles,
  Award,
  Star,
  FileCheck,
  GraduationCap,
  Printer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { getMenuItemById, getCoffeeItemById } from '@/data/menu-items';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { 
      delay: i * 0.1,
      duration: 0.5
    } 
  })
};

const badgeMotion = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const EnhancedReceiptSummary: React.FC = () => {
  const { session, getReceipt, setEmail, addNote, resetSession } = useSessionStore();
  const [emailInput, setEmailInput] = useState(session.emailAddress || '');
  const [noteInput, setNoteInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
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
  
  const handleAddNote = () => {
    if (noteInput.trim()) {
      addNote(noteInput);
      setNoteInput('');
      toast({
        title: "Note added",
        description: "Your note has been added to the learning journey.",
        duration: 2000,
      });
    }
  };
  
  const handleNewSession = () => {
    resetSession();
    toast({
      title: "New session started",
      description: "Your learning journey has been reset. Enjoy your new AI Café experience!",
      duration: 3000,
    });
  };
  
  const getItemDetails = (menuItemId: string) => {
    return getMenuItemById(menuItemId);
  };
  
  const getCoffeeDetails = (coffeeItemId?: string) => {
    if (!coffeeItemId) return null;
    return getCoffeeItemById(coffeeItemId);
  };
  
  // Helper to format currency
  const formatCurrency = (amount: string) => {
    return `$${amount}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-2 border-vsp-blue/20 dark:border-vsp-blue/40 overflow-hidden shadow-premium-blue">
        <CardHeader className="bg-premium-blue-gradient text-white premium-card-header-blue">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                <FileCheck size={28} />
              </div>
              <CardTitle className="font-cafe text-2xl">VSP AI Café Receipt</CardTitle>
            </div>
            <div className="text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              {receipt.date} at {receipt.time}
            </div>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="summary" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
                <BadgeCheck className="w-4 h-4 mr-2" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="details" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Order Details
              </TabsTrigger>
              <TabsTrigger value="skills" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
                <Brain className="w-4 h-4 mr-2" />
                Skills Acquired
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="summary" className="m-0">
            <CardContent className="p-6 pt-0">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-cafe font-semibold text-vsp-darkgray dark:text-blue-light flex items-center">
                    <BadgeCheck className="mr-2 text-vsp-blue" size={20} />
                    Learning Journey Summary
                  </h3>
                  <motion.div variants={badgeMotion} animate="animate">
                    <Badge variant="outline" className="bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900/50 dark:text-blue-100 border-vsp-blue/20">
                      Session #{receipt.sessionId.substring(0, 8)}
                    </Badge>
                  </motion.div>
                </div>
                
                <div className="vsp-premium-card p-6 mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Customer</div>
                  <div className="text-xl font-medium text-vsp-darkgray dark:text-white mb-4">
                    {session.userName || "Guest"}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Items</div>
                      <div className="flex items-center text-vsp-darkgray dark:text-white">
                        <BookOpen size={16} className="mr-2 text-vsp-blue" />
                        <span className="font-medium">{receipt.totalItems}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                      <div className="flex items-center text-vsp-darkgray dark:text-white">
                        <CreditCard size={16} className="mr-2 text-vsp-blue" />
                        <span className="font-medium">{formatCurrency(receipt.totalAmount)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Date</div>
                      <div className="flex items-center text-vsp-darkgray dark:text-white">
                        <Clock size={16} className="mr-2 text-vsp-blue" />
                        <span className="font-medium">{receipt.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="vsp-premium-card-gold p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-cafe font-semibold text-vsp-darkgray flex items-center">
                      <Star className="mr-2 text-vsp-premium" size={20} />
                      Skills Acquired
                    </h3>
                    <Badge className="bg-vsp-premium/10 text-vsp-premium border-vsp-premium/20">
                      <GraduationCap size={14} className="mr-1" />
                      <span>Premium Knowledge</span>
                    </Badge>
                  </div>
                  
                  {session.completedItems.length > 0 ? (
                    <div className="space-y-3">
                      {session.completedItems.map((itemId, index) => {
                        const menuItem = getItemDetails(itemId);
                        if (!menuItem) return null;
                        
                        return (
                          <motion.div 
                            key={itemId}
                            custom={index}
                            variants={listItemVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-start gap-3 p-3 bg-card rounded-lg border border-vsp-premium/10 hover-lift"
                          >
                            <div className="bg-vsp-premium/10 p-1.5 rounded-full">
                              <CircleCheck size={18} className="text-vsp-premium" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-vsp-darkgray dark:text-white">
                                {menuItem.title}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {menuItem.description}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {menuItem.highlights && menuItem.highlights.slice(0, 3).map((highlight, idx) => (
                                  <Badge key={idx} variant="secondary" className="bg-vsp-premium/5 text-vsp-premium text-xs border-vsp-premium/10">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-6 rounded-lg bg-card">
                      <div className="text-muted-foreground mb-2">No completed items yet</div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab('details')}>
                        View Your Current Orders
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-cafe font-semibold text-vsp-darkgray dark:text-blue-light flex items-center">
                  <Send className="mr-2 text-vsp-blue" size={20} />
                  Share your Journey
                </h3>
                
                <div className="vsp-premium-card p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-vsp-darkgray dark:text-white mb-2">
                        Send Receipt to Email
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleSendEmail}
                          className="bg-vsp-blue hover:bg-vsp-blue/90 text-white"
                          disabled={isSubmitting || !emailInput.includes('@')}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">⏳</span> Sending...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Mail size={16} className="mr-2" /> Send
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-vsp-darkgray dark:text-white mb-2">
                        Other Options
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Printer size={16} className="mr-2" />
                          Print
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <DownloadCloud size={16} className="mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="vsp-premium-card p-6">
                  <div className="text-sm font-medium text-vsp-darkgray dark:text-white mb-2">
                    Add Learning Notes
                  </div>
                  <Textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add notes about what you've learned..."
                    className="mb-2 resize-none min-h-[100px]"
                  />
                  <Button 
                    onClick={handleAddNote}
                    className="bg-vsp-blue hover:bg-vsp-blue/90 text-white w-full"
                    disabled={!noteInput.trim()}
                  >
                    <BookOpen size={16} className="mr-2" />
                    Save Notes
                  </Button>
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="details" className="m-0">
            <CardContent className="p-6 pt-0">
              <div className="vsp-premium-card p-6 mb-6">
                <h3 className="font-cafe font-semibold text-lg mb-4 text-vsp-darkgray dark:text-white flex items-center">
                  <BookOpen className="mr-2 text-vsp-blue" size={20} />
                  Current Order
                </h3>
                
                {session.currentOrder.length > 0 ? (
                  <div className="space-y-4">
                    {session.currentOrder.map((order, index) => {
                      const menuItem = getItemDetails(order.menuItemId);
                      const coffeeItem = order.coffeeId ? getCoffeeDetails(order.coffeeId) : null;
                      
                      if (!menuItem) return null;
                      
                      return (
                        <motion.div 
                          key={index}
                          custom={index}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-lg border border-vsp-blue/10 hover-lift"
                        >
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium text-vsp-darkgray dark:text-white">
                                  {menuItem.title}
                                </div>
                                <div className="text-sm text-muted-foreground mb-2">
                                  {menuItem.description}
                                </div>
                              </div>
                              <div className="font-medium text-vsp-blue">
                                {formatCurrency(menuItem.price)}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                              {menuItem.highlights && menuItem.highlights.slice(0, 3).map((highlight, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-vsp-blue/5 text-vsp-blue text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock size={14} className="mr-1" />
                              <span>{menuItem.duration}</span>
                            </div>
                          </div>
                          
                          {coffeeItem && (
                            <div className="flex items-center gap-2 p-3 bg-vsp-blue/5 rounded-lg">
                              <div className="bg-vsp-blue/10 p-1.5 rounded-full">
                                <Coffee size={16} className="text-vsp-blue" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-vsp-darkgray dark:text-white">
                                  {coffeeItem.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {formatCurrency(coffeeItem.price)}
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                    
                    <div className="flex justify-between items-center px-4 py-3 bg-vsp-blue/5 rounded-lg mt-4">
                      <div className="font-medium text-vsp-darkgray dark:text-white">
                        Total
                      </div>
                      <div className="font-bold text-vsp-blue dark:text-blue-light">
                        {formatCurrency(receipt.totalAmount)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 rounded-lg bg-vsp-blue/5">
                    <div className="text-muted-foreground mb-2">
                      No items in current order
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.history.back()}
                    >
                      Browse Menu
                    </Button>
                  </div>
                )}
              </div>
              
              {session.completedOrders.length > 0 && (
                <div className="vsp-premium-card p-6">
                  <h3 className="font-cafe font-semibold text-lg mb-4 text-vsp-darkgray dark:text-white flex items-center">
                    <CheckCheck className="mr-2 text-vsp-blue" size={20} />
                    Completed Orders
                  </h3>
                  
                  <div className="space-y-4">
                    {session.completedOrders.map((completedOrder, orderIndex) => (
                      <div 
                        key={orderIndex}
                        className="border border-vsp-blue/10 rounded-lg overflow-hidden"
                      >
                        <div className="bg-vsp-blue/5 px-4 py-2 flex justify-between items-center">
                          <div className="font-medium text-vsp-darkgray dark:text-white">
                            Order #{orderIndex + 1}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(completedOrder.date)}
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          {completedOrder.items.map((order, itemIndex) => {
                            const menuItem = getItemDetails(order.menuItemId);
                            if (!menuItem) return null;
                            
                            return (
                              <div 
                                key={itemIndex}
                                className="flex justify-between items-center p-3 bg-card rounded-lg"
                              >
                                <div className="font-medium text-vsp-darkgray dark:text-white">
                                  {menuItem.title}
                                </div>
                                <div className="font-medium text-vsp-blue">
                                  {formatCurrency(menuItem.price)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="skills" className="m-0">
            <CardContent className="p-6 pt-0">
              <div className="vsp-premium-card p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-cafe font-semibold text-lg text-vsp-darkgray dark:text-white flex items-center">
                    <Brain className="mr-2 text-vsp-blue" size={20} />
                    Skills & Knowledge
                  </h3>
                  <Badge className="bg-vsp-blue/10 text-vsp-blue border-vsp-blue/20">
                    <Award size={14} className="mr-1" />
                    <span>Progress Tracking</span>
                  </Badge>
                </div>
                
                {session.completedItems.length > 0 ? (
                  <div className="space-y-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Skill</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead className="text-right">Proficiency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {session.completedItems.flatMap((itemId, index) => {
                          const menuItem = getItemDetails(itemId);
                          if (!menuItem || !menuItem.highlights) return [];
                          
                          return menuItem.highlights.map((skill, skillIndex) => (
                            <TableRow key={`${itemId}-${skillIndex}`}>
                              <TableCell className="font-medium">{skill}</TableCell>
                              <TableCell>{menuItem.title}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                                  <CircleCheck size={14} className="mr-1" />
                                  Acquired
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ));
                        })}
                      </TableBody>
                    </Table>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium text-vsp-darkgray dark:text-white mb-2">Learning Notes</h4>
                      {session.notes && session.notes.length > 0 ? (
                        <div className="space-y-3">
                          {session.notes.map((note, index) => (
                            <div key={index} className="p-3 bg-card rounded-lg border border-vsp-blue/10">
                              <div className="text-sm text-muted-foreground italic">"{note}"</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No learning notes added yet. Add notes in the Summary tab.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-card rounded-lg">
                    <Sparkles size={32} className="mx-auto mb-2 text-vsp-blue/50" />
                    <div className="text-muted-foreground mb-2">
                      Complete items from your order to track acquired skills
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setActiveTab('details')}
                    >
                      View Your Current Orders
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="px-6 py-4 bg-vsp-blue/5 border-t border-vsp-blue/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="bg-white p-1.5 rounded-full shadow-sm">
              <Coffee size={20} className="text-vsp-blue" />
            </div>
            <div className="ml-2">
              <div className="text-xs text-muted-foreground">
                VSP AI Café Receipt ID
              </div>
              <div className="text-sm font-medium text-vsp-darkgray dark:text-white">
                {receipt.sessionId.substring(0, 16)}...
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleNewSession}
            variant="outline"
            className="border-vsp-blue text-vsp-blue hover:bg-vsp-blue/5"
          >
            <span>Start New Session</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedReceiptSummary;
