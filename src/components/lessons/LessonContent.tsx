import React, { useState } from 'react';
import { ArrowLeft, Check, Coffee, CheckCircle, Lightbulb, Briefcase, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuItem } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import QuizInteractive from '@/components/interactive/QuizInteractive';
import SimulationInteractive from '@/components/interactive/SimulationInteractive';
import ExerciseInteractive from '@/components/interactive/ExerciseInteractive';
import CaseStudyInteractive from '@/components/interactive/CaseStudyInteractive';

interface LessonContentProps {
  lesson: MenuItem;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const { addCompletedItem } = useSessionStore();
  const [interactionCompleted, setInteractionCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
    addCompletedItem({
      id: lesson.id,
      title: lesson.title,
      category: lesson.category
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

  const renderInteractiveElement = () => {
    if (!lesson.content.interactiveElement) return null;
    
    const { type, title, description, data } = lesson.content.interactiveElement;
    
    switch (type) {
      case 'quiz':
        return (
          <QuizInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => setInteractionCompleted(true)} 
          />
        );
      case 'simulation':
        return (
          <SimulationInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => setInteractionCompleted(true)} 
          />
        );
      case 'exercise':
        return (
          <ExerciseInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => setInteractionCompleted(true)} 
          />
        );
      case 'case-study':
        return (
          <CaseStudyInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => setInteractionCompleted(true)} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-coffee-dark dark:text-coffee-light"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Menu
      </Button>
      
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-2">
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
            <h3 className="text-xl font-cafe font-semibold mb-4 flex items-center">
              <CheckCircle size={20} className="text-accent-teal mr-3" />
              Key Points
            </h3>
            <ul className="space-y-3">
              {lesson.content.keyPoints.map((point, index) => (
                <li key={index} className="flex">
                  <Check size={20} className="text-accent-teal mr-3 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Workplace scenario */}
          {lesson.content.workplaceScenario && (
            <div className="mb-8 bg-muted/50 p-6 rounded-lg border border-muted-foreground/20">
              <h3 className="text-xl font-cafe font-semibold mb-4 flex items-center">
                <Briefcase size={20} className="text-coffee-medium mr-3" />
                Real-World Application
              </h3>
              <p>{lesson.content.workplaceScenario}</p>
            </div>
          )}
          
          {/* Interactive element */}
          {lesson.content.interactiveElement && (
            <div className="mb-8 transition-all">
              <h3 className="text-xl font-cafe font-semibold mb-4">Interactive Experience</h3>
              <div className="bg-accent-teal/10 border border-accent-teal/20 p-6 rounded-lg">
                {renderInteractiveElement()}
              </div>
            </div>
          )}
          
          {/* Practical tips */}
          {lesson.content.practicalTips && (
            <div className="mb-8">
              <h3 className="text-xl font-cafe font-semibold mb-4 flex items-center">
                <Lightbulb size={20} className="text-amber-500 mr-3" />
                Practical Tips
              </h3>
              <ul className="space-y-3">
                {lesson.content.practicalTips.map((tip, index) => (
                  <li key={index} className="flex">
                    <ListChecks size={20} className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
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
          className="w-full md:w-auto bg-accent-teal hover:bg-accent-teal/90"
          size="lg"
          onClick={handleComplete}
          disabled={lesson.content.interactiveElement && !interactionCompleted}
        >
          <Check size={18} className="mr-2" />
          {lesson.content.interactiveElement && !interactionCompleted 
            ? "Complete the interactive section first" 
            : "Mark as Complete"}
        </Button>
      ) : (
        <div className="bg-accent-teal/20 text-accent-teal p-4 rounded-lg flex items-center">
          <CheckCircle size={20} className="mr-2" />
          Lesson completed! Returning to menu...
        </div>
      )}
    </div>
  );
};

export default LessonContent;
