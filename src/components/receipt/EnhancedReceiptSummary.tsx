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
  Star
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
      <Card className="border-2 border-vsp-blue/20 dark:border-vsp-blue/40 overflow-hidden shadow-premium">
        <CardHeader className="bg-premium-gradient text-white premium-card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Coffee size={28} />
              </div>
              <CardTitle className="font-cafe text-2xl">VSP AI Café Receipt</CardTitle>
            </div>
            <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
              {receipt.date} at {receipt.time}
            </div>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="w-full grid grid-cols-3 mb-4">
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
            <CardContent className="p-4 pt-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-cafe font-semibold text-vsp-darkgray dark:text-blue-light flex items-center">
                    <BadgeCheck className="mr-2 text-vsp-blue" size={20} />
                    Learning Journey Summary
                  </h3>
                  <Badge variant="outline" className="bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900/50 dark:text-blue-100">
                    Session #{receipt.sessionId.substring(0, 8)}
                  </Badge>
                </div>
                
                <div className="bg-vsp-blue/5 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Customer</div>
                  <div className="text-lg font-medium text-vsp-darkgray dark:text-blue-light">
                    {receipt.customerName}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <motion.div 
                    className="premium-card p-4 rounded-lg text-center hover-lift"
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-vsp-blue/10 dark:bg-blue-800 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Clock className="text-vsp-blue" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-vsp-darkgray dark:text-blue-light">{receipt.stats.timeSpentMinutes} min</p>
                    <p className="text-sm text-muted-foreground">Learning Time</p>
                  </motion.div>
                  <motion.div 
                    className="premium-card p-4 rounded-lg text-center hover-lift"
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-vsp-blue/10 dark:bg-blue-800 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                      <BookOpen className="text-vsp-blue" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-vsp-darkgray dark:text-blue-light">{receipt.stats.totalItems}</p>
                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                  </motion.div>
                  <motion.div 
                    className="premium-card p-4 rounded-lg text-center hover-lift"
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-vsp-blue/10 dark:bg-blue-800 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Brain className="text-vsp-blue" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-vsp-darkgray dark:text-blue-light">{receipt.skills.length}</p>
                    <p className="text-sm text-muted-foreground">Skills Acquired</p>
                  </motion.div>
                </div>
                
                {receipt.stats.categoriesList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-muted-foreground">Categories Explored</h4>
                    <div className="flex flex-wrap gap-2">
                      {receipt.stats.categoriesList.map((category: string, index: number) => (
                        <Badge key={index} className="bg-vsp-blue/10 text-vsp-blue dark:bg-blue-800 dark:text-blue-100">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-cafe font-semibold flex items-center text-vsp-darkgray dark:text-blue-light">
                    <CreditCard className="mr-2 text-vsp-blue" size={20} />
                    Order Summary
                  </h3>
                </div>
                
                <div className="mb-4 space-y-1 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${receipt.pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Tax (8%):</span>
                    <span className="font-medium">${receipt.pricing.tax}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-1 text-base font-bold text-vsp-darkgray dark:text-blue-light">
                    <span>Total:</span>
                    <span>${receipt.pricing.total}</span>
                  </div>
                  <div className="text-xs text-right text-muted-foreground mt-1">
                    *Price represents the value of knowledge gained
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="details" className="m-0">
            <CardContent className="p-4 pt-2">
              <div className="mb-6">
                <h3 className="text-lg font-cafe font-semibold flex items-center mb-4 text-vsp-darkgray dark:text-blue-light gold-accent">
                  <BookOpen className="mr-2 text-vsp-blue" size={20} />
                  Course Items
                </h3>
                
                {receipt.items.length > 0 ? (
                  <div className="space-y-3">
                    {receipt.items.map((item, index) => {
                      const menuItem = getMenuItemById(item.id);
                      
                      return (
                        <motion.div 
                          key={index}
                          custom={index}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="premium-card hover-lift overflow-hidden"
                          whileHover={{ y: -3 }}
                        >
                          <div className="flex items-center p-3">
                            <div className="bg-vsp-blue/10 dark:bg-blue-800/50 p-2 rounded-full mr-3">
                              <BadgeCheck className="text-vsp-blue" size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-vsp-darkgray dark:text-blue-light">{item.title}</h4>
                                <div className="font-medium text-vsp-blue">{item.price}</div>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Badge variant="outline" className="mr-2 px-1 py-0 text-[10px]">
                                  {item.category}
                                </Badge>
                                {menuItem?.duration && (
                                  <span className="flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    {menuItem.duration}
                                  </span>
                                )}
                                {menuItem?.difficulty && (
                                  <Badge 
                                    className="ml-2 px-1 py-0 text-[10px] bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900 dark:text-blue-100"
                                  >
                                    {menuItem.difficulty}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No items in your learning journey yet
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-cafe font-semibold flex items-center mb-4 text-vsp-darkgray dark:text-blue-light gold-accent">
                  <Coffee className="mr-2 text-vsp-blue" size={20} />
                  Coffee Selections
                </h3>
                
                {receipt.coffees.length > 0 ? (
                  <div className="space-y-3">
                    {receipt.coffees.map((coffee, index) => (
                      <motion.div 
                        key={index}
                        custom={index}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="premium-card hover-lift overflow-hidden"
                        whileHover={{ y: -3 }}
                      >
                        <div className="flex items-center p-3">
                          <div className="bg-vsp-blue/10 dark:bg-blue-800/50 p-2 rounded-full mr-3">
                            <Coffee className="text-vsp-blue" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-vsp-darkgray dark:text-blue-light">{coffee.name}</h4>
                              <div className="font-medium text-vsp-blue">{coffee.price}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No coffee selections yet
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-cafe font-semibold flex items-center mb-4 text-vsp-darkgray dark:text-blue-light gold-accent">
                  <CheckCheck className="mr-2 text-vsp-blue" size={20} />
                  Completed Orders
                </h3>
                
                {receipt.completedOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-vsp-blue/5 hover:bg-vsp-blue/10">
                          <TableHead className="text-vsp-darkgray">Item</TableHead>
                          <TableHead className="text-vsp-darkgray">Coffee Pairing</TableHead>
                          <TableHead className="text-vsp-darkgray">Completed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receipt.completedOrders.map((order, index) => {
                          const menuItem = getItemDetails(order.menuItemId);
                          const coffeeItem = getCoffeeDetails(order.coffeeItemId);
                          
                          return (
                            <TableRow key={index} className="hover:bg-vsp-blue/5">
                              <TableCell className="font-medium text-vsp-darkgray">{menuItem?.title || order.menuItemId}</TableCell>
                              <TableCell>{coffeeItem?.name || 'None'}</TableCell>
                              <TableCell>{formatDate(order.timestamp)}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No completed orders yet
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="skills" className="m-0">
            <CardContent className="p-4 pt-2">
              <div className="mb-6">
                <h3 className="text-lg font-cafe font-semibold flex items-center mb-4 text-vsp-darkgray dark:text-blue-light gold-accent">
                  <Brain className="mr-2 text-vsp-blue" size={20} />
                  Skills & Knowledge Acquired
                </h3>
                
                {receipt.skills.length > 0 ? (
                  <div className="space-y-3">
                    {receipt.skills.map((skill, index) => (
                      <motion.div 
                        key={index}
                        custom={index}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center premium-card p-3 rounded-lg hover-lift"
                        whileHover={{ y: -3 }}
                      >
                        <div className="bg-vsp-blue/10 p-2 rounded-full mr-3">
                          <Award className="text-vsp-blue" size={16} />
                        </div>
                        <span className="text-vsp-darkgray dark:text-blue-light">{skill}</span>
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < 5 ? "text-vsp-gold" : "text-gray-200"} fill={i < 5 ? "#D4AF37" : "none"} />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed border-vsp-blue/20 dark:border-blue-800 rounded-lg">
                    <Sparkles className="mx-auto mb-2 text-vsp-blue" size={32} />
                    <h4 className="text-lg font-medium mb-1 text-vsp-darkgray dark:text-blue-light">No skills recorded yet</h4>
                    <p className="text-muted-foreground">
                      Complete AI learning modules to build your skill set
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-cafe font-semibold flex items-center mb-4 text-vsp-darkgray dark:text-blue-light gold-accent">
                  <BookOpen className="mr-2 text-vsp-blue" size={20} />
                  Learning Notes
                </h3>
                
                <div className="space-y-3 mb-4">
                  {receipt.notes.length > 0 ? (
                    receipt.notes.map((note, index) => (
                      <motion.div 
                        key={index}
                        custom={index}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="premium-card p-3 rounded-lg hover-lift"
                        whileHover={{ y: -3 }}
                      >
                        <p className="text-muted-foreground">{note}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No notes added yet
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Add a note about your learning..." 
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="min-h-[80px] flex-1 border-vsp-blue/20 focus:border-vsp-blue focus:ring-vsp-blue/30"
                  />
                  <Button 
                    className="self-end bg-premium-gradient hover:bg-vsp-blue"
                    onClick={handleAddNote}
                    disabled={!noteInput.trim()}
                  >
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 border-t border-vsp-blue/10 dark:border-blue-800 p-4">
          <div className="w-full sm:flex-1">
            <Input 
              placeholder="Enter your email" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              type="email"
              className="mb-2 sm:mb-0 border-vsp-blue/20 focus:border-vsp-blue focus:ring-vsp-blue/30"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              onClick={handleSendEmail} 
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-premium-gradient hover:bg-vsp-blue"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={16} className="mr-2" />
                  Email Receipt
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none border-vsp-blue/50 text-vsp-darkgray hover:bg-vsp-blue/5"
            >
              <DownloadCloud size={16} className="mr-2" />
              Download PDF
            </Button>
            <Button 
              variant="ghost" 
              className="hidden sm:flex text-vsp-darkgray hover:text-vsp-blue hover:bg-vsp-blue/5"
              onClick={handleNewSession}
            >
              <span>New Session</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="sm:hidden mt-3 text-center">
        <Button 
          variant="ghost"
          className="mx-auto text-vsp-darkgray hover:text-vsp-blue hover:bg-vsp-blue/5"
          onClick={handleNewSession}
        >
          Start New Session
        </Button>
      </div>
    </motion.div>
  );
};

export default EnhancedReceiptSummary; 