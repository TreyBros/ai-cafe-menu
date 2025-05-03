import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Send, Play, CheckCircle } from 'lucide-react';

interface SimulationTemplate {
  type: string;
  prompt: string;
}

interface SimulationInteractiveProps {
  title: string;
  description: string;
  data: {
    templates?: SimulationTemplate[];
    meetingScenario?: string;
    aiFeatures?: string[];
  };
  onComplete: () => void;
}

const SimulationInteractive: React.FC<SimulationInteractiveProps> = ({
  title,
  description,
  data,
  onComplete
}) => {
  const [activeTemplate, setActiveTemplate] = useState<SimulationTemplate | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeScenario, setActiveScenario] = useState('');
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [currentAiFeatureIndex, setCurrentAiFeatureIndex] = useState(-1);
  const [transcription, setTranscription] = useState<string[]>([]);

  // Determine if this is a writing assistant or meeting assistant simulation
  const isWritingAssistant = data.templates && data.templates.length > 0;
  const isMeetingAssistant = data.meetingScenario && data.aiFeatures;

  const handleTemplateSelect = (template: SimulationTemplate) => {
    setActiveTemplate(template);
    setUserPrompt(template.prompt);
    setAiResponse('');
  };

  const handleGenerateResponse = () => {
    if (!userPrompt) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a mock response based on the prompt type
      let response = '';
      
      if (activeTemplate?.type === 'Email response to client') {
        response = `Dear Client,

Thank you for your feature request and for your continued interest in our product.

While this specific feature isn't currently on our development roadmap, we value your input tremendously. I've shared your suggestion with our product team for consideration in future planning cycles.

In the meantime, I'd like to suggest a possible workaround using our existing functionality. You can [describe alternative solution] which may help address your immediate needs.

Please let me know if you'd like to discuss this further or if you have any other questions.

Best regards,
[Your name]`;
      } else if (activeTemplate?.type === 'Meeting agenda') {
        response = `# Weekly Team Check-in Meeting
**Date:** [Current Date]
**Time:** 30 minutes
**Location:** [Meeting Room/Virtual Link]

## Agenda
1. **Quick wins and updates (10 min)**
   - Each team member shares one accomplishment from the past week
   - Announcements and important updates

2. **Progress on priority projects (10 min)**
   - Status updates on key deliverables
   - Blockers and assistance needed

3. **Looking ahead (5 min)**
   - Upcoming deadlines and milestones
   - New assignments and responsibilities

4. **Open discussion (5 min)**
   - Questions and clarifications
   - Ideas for process improvements

**Action items from previous meeting:**
- [List previous action items and their status]`;
      } else if (activeTemplate?.type === 'Project summary') {
        response = `# Project Summary: [Project Name]

## Project Overview
The project was completed successfully over a 3-month period, delivering all primary objectives within the established timeline and budget constraints.

## Key Achievements
- Delivered core functionality 2 weeks ahead of schedule
- Implemented 3 additional features requested during development
- Achieved 98% test coverage across all critical components
- Reduced API response time by 40% compared to previous version

## Team Highlights
- Cross-functional collaboration between design, development, and QA
- Successful implementation of new agile practices
- Knowledge sharing sessions that improved overall team capabilities

## Lessons Learned
- Early stakeholder engagement proved crucial for alignment
- Regular technical debt reviews prevented accumulation of issues
- Automated testing strategy significantly reduced bugs in production

## Next Steps
- Monitor user adoption metrics over next 30 days
- Collect feedback for potential enhancements
- Prepare documentation for handover to maintenance team`;
      } else {
        response = "I've generated a response based on your prompt. Here's a draft you can use as a starting point...";
      }
      
      setAiResponse(response);
      setIsLoading(false);
    }, 1500);
  };

  const handleCompleteSimulation = () => {
    setIsCompleted(true);
    onComplete();
  };

  const startMeetingSimulation = () => {
    setMeetingStarted(true);
    setActiveScenario(data.meetingScenario || '');
    setTranscription([
      "Alex: I think we should prioritize the dashboard redesign for the next sprint.",
      "Jamie: I agree, but we need to ensure the user feedback feature is completed first.",
      "Taylor: What about the bug fixes? Some customers are reporting issues with the login page.",
      "Morgan: Let's rank each feature by business impact and technical complexity."
    ]);
    
    // Start demonstrating AI features one by one
    simulateNextAiFeature();
  };

  const simulateNextAiFeature = () => {
    if (!data.aiFeatures) return;
    
    const nextIndex = currentAiFeatureIndex + 1;
    
    if (nextIndex < data.aiFeatures.length) {
      setCurrentAiFeatureIndex(nextIndex);
      
      // Add some delay to simulate AI processing
      setTimeout(() => {
        // Add AI-generated content based on the current feature
        switch (data.aiFeatures[nextIndex]) {
          case "Live transcription":
            // Already showing transcription
            break;
          case "Key point identification":
            setTranscription([
              ...transcription,
              "🤖 AI Assistant: Key points identified:",
              "• Dashboard redesign is a candidate for next sprint",
              "• User feedback feature should be completed first",
              "• Bug fixes needed for login page issues",
              "• Features should be ranked by impact and complexity"
            ]);
            break;
          case "Action item extraction":
            setTranscription([
              ...transcription,
              "🤖 AI Assistant: Action items extracted:",
              "1. Taylor to create a list of critical login page bugs",
              "2. Morgan to create scoring matrix for feature prioritization",
              "3. Jamie to verify completion status of user feedback feature",
              "4. Team to meet again on Friday to finalize sprint priorities"
            ]);
            break;
          case "Follow-up reminder generation":
            setTranscription([
              ...transcription,
              "🤖 AI Assistant: Follow-up reminders created:",
              "• Reminder sent to Taylor: 'Submit bug list by Wednesday'",
              "• Reminder sent to Morgan: 'Share prioritization matrix by Thursday'",
              "• Calendar invite sent to all participants for Friday decision meeting"
            ]);
            // This is the last step, so we can consider it complete
            setTimeout(() => {
              setIsCompleted(true);
            }, 2000);
            break;
        }
      }, 2000);
    }
  };

  // Render for Writing Assistant Simulation
  if (isWritingAssistant) {
    return (
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {isCompleted ? (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent-teal/20 rounded-full">
                <CheckCircle size={40} className="text-accent-teal" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Simulation Completed!</h3>
            <p className="mb-4">
              You've experienced how an AI writing assistant can help you create content faster.
            </p>
            <div className="p-4 bg-muted rounded-lg text-left">
              <p>
                In a real work environment, this could save you 30-60 minutes per document,
                allowing you to focus on higher-value tasks that require your unique expertise.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Template selection */}
            {!activeTemplate && data.templates && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Select a template to try:</h4>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {data.templates.map((template, index) => (
                    <Card 
                      key={index} 
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <h5 className="font-medium mb-2">{template.type}</h5>
                      <p className="text-sm text-muted-foreground">{template.prompt}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Active prompt and generation */}
            {activeTemplate && (
              <>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Your prompt:</h4>
                  <Textarea 
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Enter your prompt here..."
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={handleGenerateResponse}
                      disabled={isLoading || !userPrompt}
                      className="bg-accent-teal hover:bg-accent-teal/90"
                    >
                      {isLoading ? 'Generating...' : 'Generate Response'}
                    </Button>
                  </div>
                </div>

                {/* Response display */}
                {aiResponse && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">AI Generated Response:</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap font-sans text-sm">{aiResponse}</pre>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        onClick={handleCompleteSimulation}
                        className="bg-accent-teal hover:bg-accent-teal/90"
                      >
                        Complete Simulation
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }

  // Render for Meeting Assistant Simulation
  if (isMeetingAssistant) {
    return (
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {isCompleted ? (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent-teal/20 rounded-full">
                <CheckCircle size={40} className="text-accent-teal" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Meeting Assistant Simulation Complete!</h3>
            <p className="mb-4">
              You've experienced how an AI meeting assistant can transform meeting productivity.
            </p>
            <div className="p-4 bg-muted rounded-lg text-left mb-4">
              <p>
                With these tools, your team can focus on meaningful discussion while the AI:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>Creates searchable transcripts of every conversation</li>
                <li>Identifies and highlights key discussion points</li>
                <li>Extracts and assigns action items to team members</li>
                <li>Sends follow-up reminders to keep everyone accountable</li>
              </ul>
            </div>
          </div>
        ) : !meetingStarted ? (
          <div className="text-center py-6">
            <Button
              className="bg-accent-teal hover:bg-accent-teal/90"
              onClick={startMeetingSimulation}
              size="lg"
            >
              <Play size={16} className="mr-2" />
              Start Meeting Simulation
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-muted-foreground">
                {activeScenario}
              </Badge>
              
              {currentAiFeatureIndex >= 0 && data.aiFeatures && (
                <Badge className="bg-accent-teal text-white">
                  {data.aiFeatures[currentAiFeatureIndex]}
                </Badge>
              )}
            </div>
            
            <Card className="mb-6">
              <div className="p-4 border-b flex items-center">
                <MessageSquare size={18} className="mr-2 text-muted-foreground" />
                <h4 className="font-medium">Meeting Transcript</h4>
              </div>
              <div className="p-4 max-h-[300px] overflow-y-auto space-y-3">
                {transcription.map((line, index) => (
                  <div key={index} className={`${line.startsWith('🤖') ? 'bg-accent-teal/10 p-2 rounded' : ''}`}>
                    {line}
                  </div>
                ))}
              </div>
            </Card>
            
            {currentAiFeatureIndex < (data.aiFeatures?.length || 0) - 1 && (
              <div className="flex justify-end">
                <Button
                  onClick={simulateNextAiFeature}
                  className="bg-accent-teal hover:bg-accent-teal/90"
                >
                  <Bot size={16} className="mr-2" />
                  {`Try Next AI Feature: ${data.aiFeatures?.[currentAiFeatureIndex + 1]}`}
                </Button>
              </div>
            )}
            
            {currentAiFeatureIndex === (data.aiFeatures?.length || 0) - 1 && !isCompleted && (
              <div className="flex justify-end">
                <Button
                  onClick={handleCompleteSimulation}
                  className="bg-accent-teal hover:bg-accent-teal/90"
                >
                  Complete Simulation
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="text-center py-6">
        <p>Simulation not available</p>
        <Button onClick={onComplete} className="mt-4">Complete</Button>
      </div>
    </div>
  );
};

export default SimulationInteractive; 