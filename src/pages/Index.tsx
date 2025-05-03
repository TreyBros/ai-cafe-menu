import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EnhancedMenuDisplay from '@/components/menu/EnhancedMenuDisplay';
import { menuItems, coffeeItems } from '@/data/menu-items';
import Layout from '@/components/layout/Layout';
import EnhancedReceiptSummary from '@/components/receipt/EnhancedReceiptSummary';
import { Input } from '@/components/ui/input';
import { 
  Coffee, 
  ChevronDown, 
  ArrowDown, 
  ShoppingCart, 
  CircleUser, 
  BookOpen, 
  Brain,
  Sparkles,
  Medal,
  CheckCircle,
  Eye,
  Star
} from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';
import { Badge } from '@/components/ui/badge';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
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

const glowVariants = {
  animate: {
    boxShadow: ['0 0 10px 2px rgba(0, 57, 166, 0.2)', '0 0 20px 6px rgba(0, 57, 166, 0.4)', '0 0 10px 2px rgba(0, 57, 166, 0.2)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Index = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState('');
  
  const { session, setUserName: storeSetUserName, addCoffeeToSelection } = useSessionStore();
  const hasCompletedItems = session.completedItems.length > 0;
  const hasOrder = session.currentOrder.length > 0 || session.completedOrders.length > 0;
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Load coffee items into state if not already there
  useEffect(() => {
    if (session.selectedCoffees.length === 0) {
      // Add some coffee items to the store
      coffeeItems.forEach(coffee => {
        addCoffeeToSelection({
          id: coffee.id,
          name: coffee.name,
          price: coffee.price,
          image: coffee.image
        });
      });
    }
  }, [session.selectedCoffees.length, addCoffeeToSelection]);
  
  const handleSetUserName = () => {
    if (userName.trim()) {
      storeSetUserName(userName);
    }
  };
  
  return (
    <Layout>
      {/* Hero section */}
      <motion.section 
        className="mb-12 py-16 px-6 bg-premium-gradient rounded-xl text-center relative overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
          <div className="grid grid-cols-5 h-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div 
                key={i} 
                className="border border-white/20"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 rounded-full"
          animate={{
            boxShadow: ['0 0 20px 5px rgba(255, 255, 255, 0.1)', '0 0 40px 10px rgba(255, 255, 255, 0.2)', '0 0 20px 5px rgba(255, 255, 255, 0.1)'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full"
          animate={{
            boxShadow: ['0 0 20px 5px rgba(255, 255, 255, 0.1)', '0 0 40px 10px rgba(255, 255, 255, 0.2)', '0 0 20px 5px rgba(255, 255, 255, 0.1)'],
          }}
          transition={{ duration: 4, delay: 1, repeat: Infinity }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div className="relative inline-block mb-8" variants={itemVariants}>
            <div className="absolute -z-10 w-24 h-24 bg-white/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative">
              <motion.div 
                animate={{
                  boxShadow: ['0 0 10px 2px rgba(255, 255, 255, 0.3)', '0 0 20px 6px rgba(255, 255, 255, 0.5)', '0 0 10px 2px rgba(255, 255, 255, 0.3)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full p-2"
              >
                <Coffee size={64} className="text-white" />
              </motion.div>
              <div className="steam left-2" />
              <div className="steam left-5" style={{ animationDelay: '0.5s' }} />
              <div className="steam left-3" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-2">
            <Badge className="bg-white/20 text-white text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full">
              Premium Experience
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-cafe font-bold text-white mb-4"
            variants={itemVariants}
          >
            VSP AI Café Menu
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gold-gradient mx-auto mb-6"
            variants={itemVariants}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explore our curated selection of AI learning experiences – each paired with the perfect coffee
          </motion.p>
          
          {!session.userName ? (
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-8"
              variants={itemVariants}
            >
              <Input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 placeholder:text-white/60 text-white"
              />
              <Button 
                className="bg-white hover:bg-white/90 font-medium text-vsp-blue w-full sm:w-auto border-2 border-transparent hover:border-white/20 transition-all duration-300"
                onClick={handleSetUserName}
                disabled={!userName.trim()}
              >
                <CircleUser size={16} className="mr-2" />
                Set Name
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <Badge className="bg-white text-vsp-blue px-4 py-2 text-lg font-medium shadow-premium">
                <CircleUser size={18} className="mr-2" />
                Welcome, {session.userName}!
              </Badge>
            </motion.div>
          )}
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 font-medium text-vsp-blue hover-lift"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BookOpen size={18} className="mr-2" />
              Browse Menu
              <ArrowDown size={16} className="ml-2" />
            </Button>
            
            {hasCompletedItems && (
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover-lift"
                onClick={() => setShowReceipt(!showReceipt)}
              >
                {showReceipt ? 'Hide Receipt' : 'View Learning Receipt'}
                {!showReceipt && (
                  <Badge className="ml-2 bg-white text-vsp-blue">
                    {session.completedItems.length}
                  </Badge>
                )}
              </Button>
            )}
            
            {hasOrder && !hasCompletedItems && (
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover-lift"
                onClick={() => setShowReceipt(!showReceipt)}
              >
                <ShoppingCart size={18} className="mr-2" />
                View Current Orders
              </Button>
            )}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: scrolled ? 0 : 1,
              y: scrolled ? 20 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown size={30} className="text-white/60 animate-bounce" />
          </motion.div>
        </div>
      </motion.section>
      
      {/* Receipt section (conditionally shown) */}
      {showReceipt && (
        <section className="mb-16">
          <EnhancedReceiptSummary />
        </section>
      )}
      
      {/* Menu section */}
      <section id="menu" className="pt-4">
        <EnhancedMenuDisplay />
      </section>
      
      {/* Features section */}
      <section className="mt-24 mb-16">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-vsp-blue/10 text-vsp-blue uppercase tracking-widest font-medium py-1 px-3">
            Premium Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-cafe font-bold vsp-gradient-text mb-3">
            Learning Features
          </h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI Café experience is designed to provide the perfect blend of education and enjoyment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            className="premium-card p-6 rounded-xl hover-lift group"
            whileHover={{ y: -5 }}
          >
            <div className="premium-card-header mb-6">
              <div className="bg-vsp-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-vsp-blue/20 transition-colors duration-300">
                <Brain className="text-vsp-blue" size={28} />
              </div>
              <h3 className="text-xl font-cafe font-semibold mb-2 text-vsp-blue">
                Interactive Learning
              </h3>
              <p className="text-muted-foreground">
                Engage with hands-on simulations, quizzes, and challenges that reinforce key concepts through active participation.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="premium-card p-6 rounded-xl hover-lift group"
            whileHover={{ y: -5 }}
          >
            <div className="premium-card-header mb-6">
              <div className="bg-vsp-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-vsp-blue/20 transition-colors duration-300">
                <Coffee className="text-vsp-blue" size={28} />
              </div>
              <h3 className="text-xl font-cafe font-semibold mb-2 text-vsp-blue">
                Perfect Pairings
              </h3>
              <p className="text-muted-foreground">
                Each learning module is carefully paired with a complementary coffee to enhance your cognitive experience.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="premium-card p-6 rounded-xl hover-lift group"
            whileHover={{ y: -5 }}
          >
            <div className="premium-card-header mb-6">
              <div className="bg-vsp-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-vsp-blue/20 transition-colors duration-300">
                <BookOpen className="text-vsp-blue" size={28} />
              </div>
              <h3 className="text-xl font-cafe font-semibold mb-2 text-vsp-blue">
                Curated Content
              </h3>
              <p className="text-muted-foreground">
                Expert-crafted learning modules ensure you receive accurate, up-to-date, and applicable AI knowledge.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="premium-card p-6 rounded-xl hover-lift group"
            whileHover={{ y: -5 }}
          >
            <div className="premium-card-header mb-6">
              <div className="bg-vsp-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-vsp-blue/20 transition-colors duration-300">
                <ShoppingCart className="text-vsp-blue" size={28} />
              </div>
              <h3 className="text-xl font-cafe font-semibold mb-2 text-vsp-blue">
                Learning Receipts
              </h3>
              <p className="text-muted-foreground">
                Track your progress with detailed learning receipts that document your journey and skills acquired.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-2 lg:col-span-1 premium-section group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative z-10">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Medal className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-cafe font-semibold mb-2">
                Premium Experience
              </h3>
              <p className="text-blue-50 mb-6 max-w-sm">
                Our AI Café provides a premium learning environment with carefully crafted content and an intuitive interface designed for enjoyable, efficient knowledge acquisition.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 hover:border-transparent">
                <Sparkles size={16} className="mr-2" />
                Explore Premium Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="mb-24 bg-white dark:bg-vsp-blue/5 rounded-xl p-8 shadow-premium">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-vsp-blue/10 text-vsp-blue uppercase tracking-widest font-medium py-1 px-3">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-cafe font-bold vsp-gradient-text mb-3">
            What Our Learners Say
          </h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mb-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Chen",
              role: "Data Scientist",
              quote: "The VSP AI Café approach made complex AI concepts accessible and enjoyable. The coffee pairings actually enhanced my focus!",
              avatar: "AC"
            },
            {
              name: "Sarah Johnson",
              role: "Software Engineer",
              quote: "I've tried many online courses, but the premium experience here is unmatched. The interactive elements truly cemented my understanding.",
              avatar: "SJ"
            },
            {
              name: "Michael Rivera",
              role: "Product Manager",
              quote: "As someone without a technical background, I was amazed at how approachable these AI modules were. The premium design made learning a pleasure.",
              avatar: "MR"
            }
          ].map((testimonial, index) => (
            <motion.div 
              key={index}
              className="premium-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-vsp-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-vsp-darkgray">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="gold-accent">
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-vsp-gold" fill="#D4AF37" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="premium-section">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div 
              className="bg-white/20 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
              animate={{
                boxShadow: ['0 0 10px 2px rgba(255, 255, 255, 0.3)', '0 0 20px 6px rgba(255, 255, 255, 0.5)', '0 0 10px 2px rgba(255, 255, 255, 0.3)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle size={36} className="text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-cafe font-bold text-white mb-4">
              Ready to Enhance Your AI Knowledge?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Start your premium learning journey today with our expertly crafted modules and coffee pairings
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white hover:bg-white/90 text-vsp-blue font-medium hover-lift"
              >
                <Brain size={18} className="mr-2" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 hover-lift"
              >
                <Eye size={18} className="mr-2" />
                Browse Course Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
