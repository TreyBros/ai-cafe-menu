
import React from 'react';
import { Coffee, Sun, Moon, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toast } = useToast();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [showAssistant, setShowAssistant] = React.useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    toast({
      title: `${newTheme === 'light' ? 'Light' : 'Dark'} mode activated`,
      description: `Switched to ${newTheme} mode. Enjoy your learning experience!`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-dark to-blue-medium p-4 shadow-md">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 relative flex items-center justify-center">
              <img 
                src="/lovable-uploads/72f33f44-0e3f-46bf-98e9-f3db898a9549.png" 
                alt="VSP AI Café Logo" 
                className="h-12 w-auto object-contain glow-effect"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-cafe font-bold text-white flex items-center">
              VSP AI Café
              <span className="ml-1 text-xs bg-blue-light/20 text-blue-light px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-white hover:bg-white/10" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Search">
              <Search size={20} />
            </Button>
            <Button 
              variant={showAssistant ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setShowAssistant(!showAssistant)}
              className={showAssistant ? "" : "text-white hover:bg-white/10"}
              aria-label="AI Assistant"
            >
              <MessageCircle size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-6xl mx-auto py-6 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-dark to-blue-medium text-white p-6 text-center">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/72f33f44-0e3f-46bf-98e9-f3db898a9549.png" 
              alt="VSP AI Café Logo" 
              className="h-12 w-auto object-contain glow-effect"
            />
          </div>
          <p className="mb-2 text-blue-pale">VSP AI Café &copy; {new Date().getFullYear()}</p>
          <p className="text-blue-pale/80 text-sm">Transforming AI learning into a delightful experience</p>
        </div>
      </footer>

      {/* Assistant Overlay (simplified for now) */}
      {showAssistant && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-blue-dark p-4 rounded-lg shadow-neon border border-blue-light/30 w-80 animate-fade-in backdrop-blur-sm bg-white/90 dark:bg-blue-dark/90">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-highlights-blue" />
              <h3 className="font-cafe text-lg">AI Barista</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowAssistant(false)}>✕</Button>
          </div>
          <div className="bg-blue-pale/20 dark:bg-blue-light/10 p-3 rounded-lg mb-3 text-sm border border-blue-light/20">
            Hello! I'm your AI Barista assistant. How can I help you with your AI learning journey today?
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ask something..." 
              className="flex-1 p-2 text-sm border rounded-md border-blue-light/20 focus:border-blue-light focus:ring focus:ring-blue-light/30 outline-none bg-white/80 dark:bg-blue-darker/30"
              disabled
            />
            <Button size="sm" disabled className="bg-blue-medium hover:bg-blue-dark">Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
