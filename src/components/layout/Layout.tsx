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
      <header className="bg-blue-dark text-white p-4 shadow-md">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Coffee size={28} className="text-blue-pale" />
              <div className="steam left-1" />
              <div className="steam left-3" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-xl md:text-2xl font-cafe font-bold">VSP AI Café</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search size={20} />
            </Button>
            <Button 
              variant={showAssistant ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setShowAssistant(!showAssistant)}
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
      <footer className="bg-blue-dark text-blue-pale p-4 text-center text-sm">
        <div className="container max-w-6xl mx-auto">
          <p className="mb-2">VSP AI Café &copy; {new Date().getFullYear()}</p>
          <p>Transforming AI learning into a delightful learning experience</p>
        </div>
      </footer>

      {/* Assistant Overlay (simplified for now) */}
      {showAssistant && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-blue-dark p-4 rounded-lg shadow-xl border border-blue-light w-80 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-highlights-blue" />
              <h3 className="font-cafe text-lg">Barista Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowAssistant(false)}>✕</Button>
          </div>
          <div className="bg-muted p-3 rounded-lg mb-3 text-sm">
            Hello! I'm your AI Barista assistant. How can I help you with your AI learning journey today?
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ask something..." 
              className="flex-1 p-2 text-sm border rounded-md"
              disabled
            />
            <Button size="sm" disabled>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
