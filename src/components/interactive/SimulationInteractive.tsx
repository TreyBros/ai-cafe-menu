import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Brain, 
  Clock, 
  Settings,
  Bot,
  Award
} from 'lucide-react';

interface SimulationInteractiveProps {
  title: string;
  description: string;
  data: {
    templates?: { type: string; prompt: string }[];
    meetingScenario?: string;
    aiFeatures?: string[];
  };
  onComplete: () => void;
}

// Simulated AI responses based on prompt types
const aiResponses = {
  emailResponse: `Dear Client,

Thank you for sharing your thoughts on the feature request. We truly value your input and the opportunity to discuss our product roadmap.

While this specific feature isn't currently on our immediate development schedule, I've documented your requirements and shared them with our product team for consideration in our future planning cycles. 

In the meantime, I'd like to suggest some alternative approaches using existing features that might address your needs:
1. You could use our automation workflow to accomplish a similar outcome
2. The API integration option offers flexibility for custom implementations

Would you be interested in exploring either of these options? I'd be happy to schedule a call to walk through these alternatives in detail.

Best regards,
[Your Name]`,

  meetingAgenda: `# Weekly Team Check-in
**Duration:** 30 minutes
**Location:** Conference Room A / Zoom Link

## Agenda Items:
1. Quick wins and blockers roundtable (10 mins)
   - Each team member shares one achievement and any blockers
   
2. Sprint progress review (10 mins)
   - Review of current sprint metrics
   - Discussion of any at-risk deliverables
   
3. Upcoming priorities (5 mins)
   - Preview of next sprint objectives
   
4. Action items and follow-ups (5 mins)
   - Assign owners and deadlines for follow-up items

## Pre-meeting Prep:
- Please update your tasks in the project management tool
- Come prepared with your top priority for the week ahead

## Materials:
- Sprint dashboard link: [URL]`,

  projectSummary: `# Project Completion Summary: Website Redesign

## Project Overview
Successfully completed the company website redesign project, delivering all requirements on time and within budget. The new website launched on June 15th with improved user experience, mobile responsiveness, and conversion optimization.

## Key Achievements
- Increased page load speed by 45% through optimized assets and modern architecture
- Implemented new content management system for easier updates by marketing team
- Created cohesive design system for future brand consistency
- Added multilingual support for 3 additional languages

## Metrics Impact
- 27% increase in mobile conversion rate in first two weeks
- 18% reduction in bounce rate
- 35% increase in average session duration

## Team Recognition
Special thanks to the design team, frontend developers, content writers, and QA testers who collaborated effectively to deliver this project successfully.

## Next Steps
- Phase 2 planning for advanced analytics implementation
- Training session for marketing team on new CMS features
- Collection of user feedback for iterative improvements`
};

const SimulationInteractive: React.FC<SimulationInteractiveProps> = ({ title, description, data, onComplete }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [currentTab, setCurrentTab] = useState('simulation');
  const [progress, setProgress] = useState(0);
  const [simulationStage, setSimulationStage] = useState(0);
  
  const { templates, meetingScenario, aiFeatures } = data;
  
  // Setup initial message for meeting scenario if provided
  useEffect(() => {
    if (meetingScenario) {
      setMessages([
        { 
          role: 'assistant', 
          content: `Welcome to the meeting simulation: "${meetingScenario}". I'll demonstrate how AI can assist with various aspects of this meeting. Ask me to help with meeting tasks, or select from the AI features below.`
        }
      ]);
    }
  }, [meetingScenario]);
  
  // Simulate typing animation for AI responses
  const simulateResponse = (content: string) => {
    setIsGenerating(true);
    
    // Create a typing effect by gradually revealing the message
    let currentText = '';
    const fullText = content;
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText.charAt(charIndex);
        // Update the last message with the current text
        setMessages(prev => [
          ...prev.slice(0, prev.length - 1),
          { role: 'assistant', content: currentText }
        ]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsGenerating(false);
        
        // Update progress based on interactions
        setProgress(prev => Math.min(prev + 25, 100));
        
        // Advance simulation stage
        setSimulationStage(prev => prev + 1);
        
        // Mark as completed after sufficient interaction
        if (progress >= 75 || simulationStage >= 3) {
          setSimulationCompleted(true);
        }
      }
    }, 20); // Adjust typing speed as needed
  };
  
  const handleSendMessage = () => {
    if (!userPrompt.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    
    // Start "typing" response - empty placeholder
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    // Generate response based on template or prompt
    let response = '';
    
    if (selectedTemplate === 'Email response to client') {
      response = aiResponses.emailResponse;
    } else if (selectedTemplate === 'Meeting agenda') {
      response = aiResponses.meetingAgenda;
    } else if (selectedTemplate === 'Project summary') {
      response = aiResponses.projectSummary;
    } else if (meetingScenario) {
      // Meeting-specific responses
      if (userPrompt.toLowerCase().includes('transcript') || userPrompt.toLowerCase().includes('notes')) {
        response = "I'm recording and transcribing our entire meeting. Here's what we've discussed so far:\n\n- Project timeline reviewed and approved\n- Budget allocation for Q3 discussed\n- Action items assigned to team members\n\nI'll generate a complete transcript with timestamps at the end of the meeting.";
      } else if (userPrompt.toLowerCase().includes('action') || userPrompt.toLowerCase().includes('task')) {
        response = "I've identified the following action items from our discussion:\n\n1. @Michael: Update the project timeline by Friday\n2. @Sarah: Prepare budget proposal for client review\n3. @Team: Review the mock-ups and provide feedback by Thursday\n\nWould you like me to set reminders for these items?";
      } else if (userPrompt.toLowerCase().includes('summary') || userPrompt.toLowerCase().includes('recap')) {
        response = "Here's a summary of our meeting so far:\n\nWe've discussed the project scope, timeline, and budget allocations. The team has agreed on the design direction and identified potential risks. Next steps include finalizing the resource allocation and preparing client deliverables.\n\nKey decisions made:\n- Moving forward with option B for the UI design\n- Increasing QA resources by 25%\n- Scheduling weekly client updates";
      } else {
        response = "I'm analyzing the conversation and can help with various tasks. Would you like me to:\n\n- Summarize the key points discussed so far\n- Extract action items and assign them to team members\n- Schedule follow-up meetings based on our discussion\n- Create a shareable transcript with highlights\n\nJust let me know how I can assist with this meeting.";
      }
    } else {
      // Generic writing assistant response
      response = `Here's a draft based on your request:\n\n${userPrompt}\n\nThis is a starting point that you can further customize. Would you like me to revise this in any way, such as making it more formal or adding specific details?`;
    }
    
    // Clear the input
    setUserPrompt('');
    
    // Simulate typing the response
    simulateResponse(response);
  };
  
  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    
    // Find the corresponding prompt
    const templateObj = templates?.find(t => t.type === template);
    if (templateObj) {
      setUserPrompt(templateObj.prompt);
    }
  };
  
  const handleFeatureSelect = (feature: string) => {
    // Simulate using an AI meeting feature
    let userMsg = `Can you help with ${feature}?`;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    
    // Add empty assistant message that will be filled
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    // Generate response based on selected feature
    let response = '';
    switch (feature) {
      case 'Live transcription':
        response = "I'm now transcribing the meeting in real-time. All participants' speech will be captured and identified by speaker. You'll be able to search the transcript during or after the meeting.";
        break;
      case 'Key point identification':
        response = "I'm monitoring the conversation and identifying key points:\n\n• Team agrees on new project timeline\n• Budget constraints require prioritizing features\n• Marketing team needs assets by July 15th\n\nI'll continue to update this list as the meeting progresses.";
        break;
      case 'Action item extraction':
        response = "I've identified these action items from the discussion:\n\n1. @Jason: Create updated wireframes by Friday\n2. @Emma: Coordinate with the client about timeline changes\n3. @Dev Team: Estimate effort for the new requirements\n\nWould you like me to add these to your task management system?";
        break;
      case 'Follow-up reminder generation':
        response = "Based on this meeting, I'll generate follow-up reminders for:\n\n• Send meeting summary to all participants (tomorrow morning)\n• Check in on wireframe progress (Friday)\n• Schedule technical review meeting (next Tuesday)\n\nThese will be added to your calendar with notifications.";
        break;
      default:
        response = "I'm ready to assist with this feature. How would you like to proceed?";
    }
    
    // Clear prompt
    setUserPrompt('');
    
    // Simulate typing response
    simulateResponse(response);
  };
  
  const handleFinishSimulation = () => {
    onComplete();
  };
  
  if (simulationCompleted && currentTab === 'results') {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-block p-4 bg-accent-teal/20 rounded-full mb-3">
            <Award className="h-8 w-8 text-accent-teal" />
          </div>
          <h3 className="text-xl font-bold mb-2">Simulation Completed!</h3>
          <p className="text-muted-foreground mb-4">
            You've successfully explored how AI can transform {meetingScenario ? 'meetings' : 'writing tasks'} 
            in your workflow.
          </p>
          
          <div className="mb-4">
            <div className="font-medium text-sm mb-1">Productivity Improvement</div>
            <Progress value={85} className="h-2 mb-1" />
            <p className="text-xs text-muted-foreground">Estimated time saved: 85%</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 text-left">
          <h4 className="font-medium">Key Takeaways:</h4>
          
          {meetingScenario ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Automated Documentation</p>
                  <p className="text-sm text-muted-foreground">No need to take notes - AI captures everything accurately</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Action Item Tracking</p>
                  <p className="text-sm text-muted-foreground">Automatic extraction and assignment of action items</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Better Follow-through</p>
                  <p className="text-sm text-muted-foreground">Automated reminders and summaries improve accountability</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Faster Content Creation</p>
                  <p className="text-sm text-muted-foreground">Generate first drafts in seconds instead of staring at a blank page</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Consistent Quality</p>
                  <p className="text-sm text-muted-foreground">AI helps maintain consistent tone and quality across all communications</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Format Flexibility</p>
                  <p className="text-sm text-muted-foreground">Easily create content in various formats for different purposes</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleFinishSimulation}
          className="bg-accent-teal hover:bg-accent-teal/90"
        >
          Continue Learning
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <Tabs 
        defaultValue="simulation" 
        className="w-full" 
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simulation">
            <MessageSquare className="w-4 h-4 mr-2" />
            Simulation
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!simulationCompleted}>
            <Brain className="w-4 h-4 mr-2" />
            Results
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulation" className="animate-fade-in">
          <div className="flex flex-col h-full">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock size={14} className="text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">
                  Progress: {progress}%
                </span>
              </div>
              <Progress value={progress} className="w-[70%] h-1.5" />
            </div>
            
            {/* AI Features selection for meeting */}
            {aiFeatures && (
              <div className="mb-4 flex flex-wrap gap-2">
                {aiFeatures.map((feature, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="cursor-pointer hover:bg-accent-teal/10 transition-colors"
                    onClick={() => handleFeatureSelect(feature)}
                  >
                    <Sparkles className="w-3 h-3 mr-1" /> {feature}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Template selection */}
            {templates && (
              <div className="mb-4 space-y-2">
                <div className="text-sm font-medium">Select template:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {templates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`justify-start ${selectedTemplate === template.type ? 'border-accent-teal text-accent-teal' : ''}`}
                      onClick={() => handleTemplateSelect(template.type)}
                    >
                      <Settings className="w-3 h-3 mr-1" /> {template.type}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat simulation area */}
            <Card className="mb-4 border-muted overflow-hidden">
              <CardContent className="p-4">
                <div className="bg-muted/30 rounded-t-md p-3 flex items-center gap-3">
                  <Bot size={20} className="text-accent-teal" />
                  <div>
                    <div className="text-sm font-medium">AI Assistant</div>
                    <div className="text-xs text-muted-foreground">Helping with {meetingScenario ? 'meeting productivity' : 'writing tasks'}</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-b-md p-4 h-64 overflow-y-auto flex flex-col gap-4 border">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-accent-teal/20 text-accent-teal rounded-tr-none' 
                            : 'bg-muted rounded-tl-none'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                        {message.role === 'assistant' && message.content === '' && (
                          <div className="flex gap-1 items-center">
                            <div className="h-2 w-2 bg-accent-teal/60 rounded-full animate-pulse"></div>
                            <div className="h-2 w-2 bg-accent-teal/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-2 w-2 bg-accent-teal/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Input area */}
            <div className="flex gap-2">
              <Textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder={meetingScenario 
                  ? "Ask the AI for meeting assistance..." 
                  : "Enter your writing request..."}
                className="flex-1 min-h-[60px] max-h-32"
                disabled={isGenerating}
              />
              <Button
                className="self-end"
                size="icon"
                onClick={handleSendMessage}
                disabled={!userPrompt.trim() || isGenerating}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {progress >= 75 && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setCurrentTab('results')}
                >
                  View Results <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="animate-fade-in">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-4 bg-accent-teal/20 rounded-full mb-3">
                <Award className="h-8 w-8 text-accent-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simulation Completed!</h3>
              <p className="text-muted-foreground mb-4">
                You've successfully explored how AI can transform {meetingScenario ? 'meetings' : 'writing tasks'} 
                in your workflow.
              </p>
              
              <div className="mb-4">
                <div className="font-medium text-sm mb-1">Productivity Improvement</div>
                <Progress value={85} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">Estimated time saved: 85%</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 text-left">
              <h4 className="font-medium">Key Takeaways:</h4>
              
              {meetingScenario ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Automated Documentation</p>
                      <p className="text-sm text-muted-foreground">No need to take notes - AI captures everything accurately</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Action Item Tracking</p>
                      <p className="text-sm text-muted-foreground">Automatic extraction and assignment of action items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Better Follow-through</p>
                      <p className="text-sm text-muted-foreground">Automated reminders and summaries improve accountability</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Faster Content Creation</p>
                      <p className="text-sm text-muted-foreground">Generate first drafts in seconds instead of staring at a blank page</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Consistent Quality</p>
                      <p className="text-sm text-muted-foreground">AI helps maintain consistent tone and quality across all communications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Format Flexibility</p>
                      <p className="text-sm text-muted-foreground">Easily create content in various formats for different purposes</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleFinishSimulation}
              className="bg-accent-teal hover:bg-accent-teal/90"
            >
              Continue Learning
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationInteractive; 