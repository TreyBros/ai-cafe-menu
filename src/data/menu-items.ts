export interface MenuItem {
  id: string;
  title: string;
  description: string;
  category: 'appetizer' | 'entree' | 'dessert';
  duration: string;
  image: string;
  content: {
    intro: string;
    videoUrl?: string;
    keyPoints: string[];
    interactiveElement?: {
      type: 'quiz' | 'simulation' | 'exercise' | 'case-study';
      title: string;
      description: string;
      data?: any;
    };
    workplaceScenario?: string;
    practicalTips?: string[];
    summary: string;
  };
}

export const menuItems: MenuItem[] = [
  {
    id: "ai-productivity-basics",
    title: "AI Productivity Espresso",
    description: "Quick introduction to AI-powered productivity tools in the workplace",
    category: "appetizer",
    duration: "5 min",
    image: "/coffee-1.jpg",
    content: {
      intro: "Ready to supercharge your workday? This quick session introduces you to AI tools that can save you hours each week on repetitive tasks, helping you focus on what really matters.",
      keyPoints: [
        "AI assistants can reduce time spent on routine emails, scheduling, and document processing",
        "Smart automation tools work in the background to streamline your workflow",
        "Start small with one AI productivity tool and expand as you get comfortable"
      ],
      interactiveElement: {
        type: 'quiz',
        title: 'Productivity Assessment',
        description: 'Take this quick quiz to identify which tasks in your workday could benefit most from AI assistance',
        data: {
          questions: [
            {
              question: "How much time do you spend managing your email each day?",
              options: ["Less than 30 minutes", "30-60 minutes", "1-2 hours", "More than 2 hours"]
            },
            {
              question: "Which task takes up most of your time at work?",
              options: ["Meetings", "Email communication", "Document creation/editing", "Data analysis", "Administrative tasks"]
            },
            {
              question: "What's your biggest productivity challenge?",
              options: ["Too many interruptions", "Information overload", "Repetitive tasks", "Complex scheduling", "Time management"]
            }
          ]
        }
      },
      workplaceScenario: "Imagine spending 2 hours per day on email. With AI email assistants, you could reduce that to 45 minutes by auto-categorizing messages, suggesting quick responses, and highlighting action items.",
      practicalTips: [
        "Start with email assistant tools like Mailbutler or Superhuman",
        "Use meeting transcription services to eliminate note-taking",
        "Try AI scheduling assistants to eliminate back-and-forth emails"
      ],
      summary: "You now understand how AI tools can eliminate repetitive tasks in your workday, potentially saving hours each week that can be redirected to higher-value work."
    }
  },
  {
    id: "ai-writing-assistant",
    title: "AI Writing Assistant Macchiato",
    description: "Accelerate document creation and improve communication with AI writing tools",
    category: "entree",
    duration: "8 min",
    image: "/coffee-2.jpg",
    content: {
      intro: "Transform your writing process with AI tools that can help draft emails, reports, presentations, and other documents in a fraction of the time it would normally take.",
      keyPoints: [
        "AI writing assistants can help overcome writer's block and generate first drafts",
        "Smart editing tools can improve clarity, tone, and impact of your communications",
        "Document summarization features can help you quickly extract key information"
      ],
      interactiveElement: {
        type: 'simulation',
        title: 'AI Writing Assistant Demo',
        description: 'Try the writing assistant to draft an email or document with an interactive prompt-based interface',
        data: {
          templates: [
            {
              type: "Email response to client",
              prompt: "Draft a polite response to a client who has requested a feature that's not currently on your roadmap"
            },
            {
              type: "Meeting agenda",
              prompt: "Create an agenda for a 30-minute weekly team check-in meeting"
            },
            {
              type: "Project summary",
              prompt: "Write a brief summary of a recently completed project highlighting key achievements"
            }
          ]
        }
      },
      workplaceScenario: "Your team needs to create a comprehensive project proposal by tomorrow. Using AI writing assistance, you can have a solid first draft in 20 minutes instead of starting from a blank page for hours.",
      practicalTips: [
        "Always review and personalize AI-generated content before sending",
        "Use AI tools to rewrite text in different tones for different audiences",
        "Try browser extensions that offer writing assistance across all web platforms"
      ],
      summary: "You've learned how AI writing tools can dramatically speed up your document creation process while maintaining your authentic voice and professional standards."
    }
  },
  {
    id: "data-analysis-ai",
    title: "Data Analysis Cappuccino",
    description: "Make sense of complex data quickly with AI-powered analysis tools",
    category: "entree",
    duration: "10 min",
    image: "/coffee-3.jpg",
    content: {
      intro: "Drowning in spreadsheets and reports? AI data analysis tools can help you quickly extract insights, create visualizations, and identify patterns that might take hours to find manually.",
      keyPoints: [
        "Natural language queries let you ask questions about your data without complex formulas",
        "Automated reporting can generate insights and visualizations from raw data",
        "Predictive analytics can help forecast trends and outcomes for better planning"
      ],
      interactiveElement: {
        type: 'exercise',
        title: 'Data Analysis Challenge',
        description: 'Practice using natural language to analyze a sample dataset and extract insights',
        data: {
          sampleQueries: [
            "Show me sales trends over the last quarter",
            "Which product has the highest profit margin?",
            "Forecast revenue for next month based on current trends"
          ]
        }
      },
      workplaceScenario: "Your team needs to prepare a quarterly business review. Instead of spending days compiling data manually, AI analysis tools can generate the key metrics, visualizations, and even suggest explanations for trends.",
      practicalTips: [
        "Start with AI features built into Excel or Google Sheets",
        "Try natural language query tools like Power BI Q&A or ThoughtSpot",
        "Use AI visualization tools to create dashboard automatically from your data"
      ],
      summary: "You now understand how AI-powered data analysis can transform hours of manual spreadsheet work into minutes of interactive querying, helping you make data-driven decisions faster."
    }
  },
  {
    id: "meeting-productivity",
    title: "Meeting Efficiency Mocha",
    description: "Transform meeting productivity with AI transcription, summarization and action items",
    category: "entree",
    duration: "12 min",
    image: "/coffee-4.jpg",
    content: {
      intro: "Meetings can consume a massive portion of your workday. Learn how AI tools can help you run more efficient meetings, capture key points automatically, and ensure better follow-through.",
      keyPoints: [
        "AI transcription services create searchable records of all meeting discussions",
        "Automatic meeting summarization extracts key points, decisions, and action items",
        "Smart scheduling tools find optimal meeting times and reduce scheduling conflicts"
      ],
      interactiveElement: {
        type: 'simulation',
        title: 'Meeting Assistant Simulation',
        description: 'Experience how an AI meeting assistant works by participating in a simulated meeting',
        data: {
          meetingScenario: "Product development team discussing feature prioritization",
          aiFeatures: ["Live transcription", "Key point identification", "Action item extraction", "Follow-up reminder generation"]
        }
      },
      workplaceScenario: "Your team has weekly one-hour meetings with lots of useful information but inconsistent follow-through. With AI meeting tools, everyone receives automatic summaries and personal action item lists, improving accountability.",
      practicalTips: [
        "Use AI transcription in all important meetings to create a searchable knowledge base",
        "Set up automatic action item extraction and assignment",
        "Try AI tools that can draft follow-up emails based on meeting discussions"
      ],
      summary: "You've learned how AI meeting tools can transform meeting culture from time-consuming to highly productive by automating note-taking, creating accountability for action items, and making information easily retrievable."
    }
  },
  {
    id: "ai-knowledge-management",
    title: "Knowledge Management Affogato",
    description: "Organize and access company knowledge instantly with AI-powered tools",
    category: "dessert",
    duration: "7 min",
    image: "/coffee-5.jpg",
    content: {
      intro: "Finding the right information at the right time is crucial for workplace productivity. Discover how AI knowledge management tools can help you instantly access the exact information you need.",
      keyPoints: [
        "AI-powered search can understand the context and intent behind your questions",
        "Smart document organization automatically categorizes and tags information",
        "Knowledge extraction tools can create searchable databases from unstructured content"
      ],
      interactiveElement: {
        type: 'case-study',
        title: 'Knowledge Management Transformation',
        description: 'See how a company reduced information retrieval time by 75% with AI knowledge management',
        data: {
          companyType: "Marketing agency with 50 employees",
          challenge: "Employees spending 5+ hours weekly searching for information across different systems",
          solution: "Implemented AI-powered knowledge base with natural language search",
          results: "Information retrieval time reduced by 75%, onboarding time cut in half"
        }
      },
      workplaceScenario: "You need to find specific information from a client meeting that happened months ago. Instead of digging through folders, an AI knowledge assistant can instantly find the relevant portion of the transcribed conversation.",
      practicalTips: [
        "Use AI-powered search tools like Notion AI or Microsoft Copilot",
        "Create a centralized knowledge base with natural language querying",
        "Set up automatic tagging and categorization of documents"
      ],
      summary: "You now understand how AI knowledge management tools can eliminate hours of searching for information, making your organization's collective knowledge instantly accessible to everyone."
    }
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation Tiramisu",
    description: "Eliminate repetitive tasks with AI-powered automation workflows",
    category: "dessert",
    duration: "8 min",
    image: "/coffee-6.jpg",
    content: {
      intro: "Repetitive tasks drain your energy and creativity. Learn how AI-powered workflow automation can eliminate these tasks entirely, allowing you to focus on work that actually requires human intelligence.",
      keyPoints: [
        "No-code automation platforms let you create powerful workflows without programming",
        "AI can learn from your repetitive actions and suggest automation opportunities",
        "Connecting different applications through automation creates seamless workflows"
      ],
      interactiveElement: {
        type: 'exercise',
        title: 'Workflow Automation Builder',
        description: 'Design a simple workflow automation to solve a common workplace challenge',
        data: {
          scenarios: [
            "Client onboarding process with document collection and welcome emails",
            "Expense reporting workflow with receipt processing and approval routing",
            "Content publishing workflow with review, approval and scheduling steps"
          ]
        }
      },
      workplaceScenario: "Your team manually processes customer onboarding forms, taking 30+ minutes per customer. With AI workflow automation, form data is automatically extracted, verified, entered into your CRM, and triggers personalized welcome sequences.",
      practicalTips: [
        "Start by mapping your most repetitive processes to identify automation opportunities",
        "Try tools like Zapier, Microsoft Power Automate, or Make",
        "Begin with simple workflows and gradually build more complex automations"
      ],
      summary: "You've discovered how AI workflow automation can eliminate repetitive tasks entirely from your workday, potentially saving hours each week while reducing errors and improving consistency."
    }
  },
];
