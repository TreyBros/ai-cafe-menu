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
  Star,
  GraduationCap,
  Globe,
  Lightbulb,
  BadgeCheck,
  MessageSquareQuote
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

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * 0.1 + 0.3,
      duration: 0.5,
      ease: "easeOut"
    } 
  })
};

const testimonials = [
  {
    quote: "VSP AI Café transformed how I learn about artificial intelligence. The structured approach and high-quality content exceeded my expectations.",
    author: "Michael Chen",
    title: "Software Engineer"
  },
  {
    quote: "The premium experience offered here is unmatched. Each learning module is thoughtfully crafted and the attention to detail is remarkable.",
    author: "Sophia Williams",
    title: "Data Scientist"
  },
  {
    quote: "I've tried many AI learning platforms, but this one stands out for its elegant interface and comprehensive curriculum.",
    author: "David Rodriguez",
    title: "Product Manager"
  }
];

const Index = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const { session, setUserName: storeSetUserName, addCoffeeToSelection } = useSessionStore();
  
  // Safely handle potentially undefined session properties
  const completedItems = session?.completedItems || [];
  const currentOrder = session?.currentOrder || [];
  const completedOrders = session?.completedOrders || [];
  const selectedCoffees = session?.selectedCoffees || [];
  
  const hasCompletedItems = completedItems.length > 0;
  const hasOrder = currentOrder.length > 0 || completedOrders.length > 0;
  
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
    if (selectedCoffees.length === 0) {
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
  }, [selectedCoffees.length, addCoffeeToSelection]);
  
  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSetUserName = () => {
    if (userName.trim()) {
      storeSetUserName(userName);
    }
  };
  
  return (
    <Layout>
      {/* Hero section */}
      <motion.section 
        className="mb-12 py-20 px-6 bg-hero-gradient rounded-xl text-center relative overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-pattern"></div>
        
        {/* Decorative elements */}
        <div className="hero-glow w-96 h-96 top-1/4 right-1/4"></div>
        <div className="hero-glow w-64 h-64 bottom-0 left-1/4"></div>
        
        {/* Floating circles */}
        <motion.div 
          className="absolute top-20 right-1/4 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div className="relative inline-block mb-8" variants={itemVariants}>
            <div className="absolute -z-10 w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20"></div>
            <div className="relative">
              <motion.div 
                animate={{
                  boxShadow: ['0 0 15px 2px rgba(255, 255, 255, 0.3)', '0 0 25px 8px rgba(255, 255, 255, 0.5)', '0 0 15px 2px rgba(255, 255, 255, 0.3)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="rounded-full p-3"
              >
                <Coffee size={64} className="text-white" />
              </motion.div>
              <div className="steam left-2" />
              <div className="steam left-5" style={{ animationDelay: '0.5s' }} />
              <div className="steam left-3" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-2">
            <Badge className="badge-premium">
              VSP Premium Experience
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-cafe font-bold text-white mb-4 tracking-tight"
            variants={itemVariants}
          >
            VSP AI Café Menu
          </motion.h1>
          
          <motion.div 
            className="w-32 h-1 bg-gold-gradient mx-auto mb-6"
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
              className="mb-8 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 inline-block"
              variants={itemVariants}
            >
              <p className="text-white/90 flex items-center">
                <CircleUser size={16} className="mr-2 text-vsp-highlight" />
                Welcome, <span className="font-medium ml-1">{session.userName}</span>
              </p>
            </motion.div>
          )}
          
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            {!hasOrder && (
              <Button 
                className="premium-button group"
                size="lg"
                onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore Menu</span>
                <ChevronDown size={16} className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
            )}
            
            {hasOrder && !showReceipt && (
              <Button 
                className="premium-button-gold group"
                size="lg"
                onClick={() => setShowReceipt(true)}
              >
                <ShoppingCart size={16} className="mr-2" />
                <span>View Receipt</span>
              </Button>
            )}
            
            {hasCompletedItems && (
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
                onClick={() => window.open('/lesson-page', '_blank')}
              >
                <BookOpen size={16} className="mr-2" />
                <span>View Lessons</span>
              </Button>
            )}
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-1/2"
          >
            <motion.div 
              className="p-3 bg-white rounded-full cursor-pointer hover-lift shadow-lg"
              onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowDown size={24} className="text-vsp-blue" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section id="features-section" className="mb-16 px-6">
        <div className="text-center mb-12">
          <Badge className="badge-premium-gold mb-2">Exclusive Learning Experience</Badge>
          <h2 className="text-3xl md:text-4xl font-cafe font-bold mb-3 text-vsp-darkgray dark:text-white">
            <span className="gold-gradient-text">Premium</span> AI Learning Journey
          </h2>
          <div className="premium-divider-gold">
            <Star className="text-vsp-premium" size={16} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover a carefully curated curriculum designed for both beginners and experts in artificial intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <GraduationCap size={28} />,
              title: "Structured Learning",
              description: "Progressive modules designed to build your AI knowledge from fundamentals to advanced concepts"
            },
            {
              icon: <Coffee size={28} />,
              title: "Perfect Pairings",
              description: "Each learning module paired with a specialty coffee to enhance your learning experience"
            },
            {
              icon: <Brain size={28} />,
              title: "Expert Guidance",
              description: "Content developed by industry leaders and academic experts in artificial intelligence"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={featureCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="vsp-premium-card p-6 hover-lift"
            >
              <div className="mb-4 p-3 rounded-full bg-vsp-blue/10 inline-block text-vsp-blue">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-vsp-darkgray dark:text-white">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial Section */}
        <div className="mb-16">
          <div className="premium-section rounded-xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-3 h-full">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/10"></div>
                ))}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageSquareQuote size={32} className="text-white" />
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto text-center">
                <div className="h-32 relative">
                  {testimonials.map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeTestimonial === i ? 1 : 0,
                        y: activeTestimonial === i ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{ display: activeTestimonial === i ? 'flex' : 'none' }}
                    >
                      <p className="text-xl italic mb-4">{testimonial.quote}</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-white/70 text-sm">{testimonial.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className={`w-2 h-2 rounded-full ${activeTestimonial === i ? 'bg-white' : 'bg-white/30'} transition-all duration-300`}
                      onClick={() => setActiveTestimonial(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <section id="menu-section" className="mb-12 px-6">
        {showReceipt ? (
          <EnhancedReceiptSummary />
        ) : (
          <EnhancedMenuDisplay 
            title="VSP AI Learning Menu"
            description="Select from our premium collection of AI learning modules and craft your personalized journey"
          />
        )}
      </section>
      
      {/* CTA Section */}
      <section className="mb-16 px-6">
        <div className="premium-section-gold rounded-xl overflow-hidden text-center">
          <div className="relative z-10">
            <Badge className="bg-vsp-premium/10 text-vsp-premium font-medium px-3 py-1 rounded-full mb-4 border border-vsp-premium/20">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-cafe font-bold mb-4 text-vsp-darkgray">
              Begin Your Premium AI Learning Journey
            </h2>
            <p className="text-xl mb-8 text-vsp-darkgray/80 max-w-2xl mx-auto">
              Experience the perfect blend of AI education and premium coffee—tailored to your learning style.
            </p>
            <Button 
              className="bg-vsp-blue hover:bg-vsp-blue/90 text-white font-medium px-8 py-6 rounded-md text-lg hover-lift"
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BadgeCheck size={20} className="mr-2" />
              <span>Start Your Journey</span>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
