
import React, { useState } from 'react';
import { ArrowLeft, Check, Coffee, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuItem } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface LessonContentProps {
  lesson: MenuItem;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const { addCompletedItem } = useSessionStore();
  
  const handleComplete = () => {
    setIsCompleted(true);
    addCompletedItem({
      id: lesson.id,
      title: lesson.title,
      category: lesson.category,
      price: lesson.price,  // Add the required price property
      image: lesson.image   // Add the image property for consistency
    });
    
    toast({
      title: "Lesson completed!",
      description: "This has been added to your learning journey.",
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  return (
    <div className="animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-blue-dark dark:text-blue-light"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Menu
      </Button>
      
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-cafe font-bold text-blue-dark dark:text-blue-light mb-2">
          {lesson.title}
        </h1>
        <div className="flex items-center text-muted-foreground">
          <Coffee size={18} className="mr-2" />
          <span>{lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)} • {lesson.duration}</span>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-lg mb-8">{lesson.content.intro}</p>
          
          {/* Key learning points */}
          <div className="mb-8">
            <h3 className="text-xl font-cafe font-semibold mb-4">Key Points</h3>
            <ul className="space-y-3">
              {lesson.content.keyPoints.map((point, index) => (
                <li key={index} className="flex">
                  <CheckCircle size={20} className="text-highlights-blue mr-3 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Interactive element placeholder */}
          {lesson.content.interactiveElement && (
            <div className="mb-8">
              <h3 className="text-xl font-cafe font-semibold mb-4">Interactive Experience</h3>
              <div className="bg-muted p-6 rounded-lg text-center">
                <p className="text-muted-foreground mb-3">
                  {typeof lesson.content.interactiveElement === 'string' 
                    ? lesson.content.interactiveElement 
                    : lesson.content.interactiveElement.description}
                </p>
                <Button variant="outline" disabled>Coming Soon</Button>
              </div>
            </div>
          )}
          
          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-xl font-cafe font-semibold mb-4">Summary</h3>
            <p>{lesson.content.summary}</p>
          </div>
        </CardContent>
      </Card>
      
      {!isCompleted ? (
        <Button 
          className="w-full md:w-auto bg-highlights-blue hover:bg-highlights-navy"
          size="lg"
          onClick={handleComplete}
        >
          <Check size={18} className="mr-2" />
          Mark as Complete
        </Button>
      ) : (
        <div className="bg-highlights-blue/20 text-highlights-blue p-4 rounded-lg flex items-center">
          <CheckCircle size={20} className="mr-2" />
          Lesson completed! Returning to menu...
        </div>
      )}
    </div>
  );
};

export default LessonContent;
