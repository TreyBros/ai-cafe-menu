
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
    interactiveElement?: string;
    summary: string;
  };
}

export const menuItems: MenuItem[] = [
  {
    id: "intro-to-ai",
    title: "AI Espresso Shot",
    description: "A quick, energizing introduction to AI fundamentals",
    category: "appetizer",
    duration: "5 min",
    image: "/coffee-1.jpg",
    content: {
      intro: "Welcome to your AI Espresso Shot! Just like a good espresso gives you a quick energy boost, this module will quickly get you up to speed on what AI actually is (and isn't).",
      keyPoints: [
        "AI is a branch of computer science focused on creating systems that can perform tasks normally requiring human intelligence",
        "Modern AI mostly uses machine learning algorithms that learn patterns from data",
        "AI exists on a spectrum from narrow (specific tasks) to general (human-like capabilities)"
      ],
      summary: "You now understand the basic definition of AI and how it differs from traditional programming. This foundation will help you contextualize the more advanced concepts coming up!"
    }
  },
  {
    id: "machine-learning",
    title: "Machine Learning Macchiato",
    description: "A perfectly balanced blend of ML concepts and applications",
    category: "entree",
    duration: "8 min",
    image: "/coffee-2.jpg",
    content: {
      intro: "The Machine Learning Macchiato offers the perfect balance of theory and application. Just as a macchiato balances espresso and milk, we'll balance technical concepts with real-world applications.",
      keyPoints: [
        "Machine learning allows computers to learn from data without being explicitly programmed",
        "The three main types are supervised learning, unsupervised learning, and reinforcement learning",
        "Common applications include recommendation systems, fraud detection, and image recognition"
      ],
      interactiveElement: "Interactive Decision Tree Demo",
      summary: "You've now mastered the core concepts of machine learning and can identify different ML approaches in real-world applications!"
    }
  },
  {
    id: "neural-networks",
    title: "Neural Network Cappuccino",
    description: "Rich, layered exploration of neural networks with a frothy top of practical examples",
    category: "entree",
    duration: "10 min",
    image: "/coffee-3.jpg",
    content: {
      intro: "Dive into our Neural Network Cappuccino - rich in content with multiple layers (just like neural networks themselves) and topped with frothy practical examples to bring the concepts to life.",
      keyPoints: [
        "Neural networks are computing systems vaguely inspired by the human brain",
        "They consist of layers of interconnected nodes (neurons) that process information",
        "Deep learning uses neural networks with many layers to solve complex problems"
      ],
      interactiveElement: "Interactive Neural Network Playground",
      summary: "Congratulations! You now understand how neural networks function as the foundation of many modern AI breakthroughs."
    }
  },
  {
    id: "generative-ai",
    title: "Generative AI Mocha",
    description: "A rich, indulgent exploration of generative AI capabilities",
    category: "entree",
    duration: "12 min",
    image: "/coffee-4.jpg",
    content: {
      intro: "Our Generative AI Mocha is rich and complex, with layers of flavor just like the multiple layers of generative models. This module explores how AI can create new content and ideas.",
      keyPoints: [
        "Generative AI creates new content - text, images, music, video - based on patterns learned from data",
        "Large language models like GPT and image generators like DALL-E are leading examples",
        "These systems can both augment human creativity and raise ethical considerations"
      ],
      interactiveElement: "Text Prompt Playground",
      summary: "You now understand the capabilities and limitations of generative AI systems, preparing you to use them effectively in your work."
    }
  },
  {
    id: "ai-ethics",
    title: "AI Ethics Affogato",
    description: "A warm serving of ethical considerations with a cool perspective",
    category: "dessert",
    duration: "7 min",
    image: "/coffee-5.jpg",
    content: {
      intro: "The AI Ethics Affogato serves up warm ethical considerations with a cooling perspective on responsible implementation - a perfect way to conclude your AI learning journey.",
      keyPoints: [
        "AI ethics involves principles like fairness, transparency, privacy, and accountability",
        "Bias in AI systems can perpetuate or amplify societal inequalities",
        "Responsible AI development requires diverse teams and ongoing evaluation"
      ],
      summary: "You're now equipped to think critically about the ethical implications of AI implementation and advocate for responsible approaches."
    }
  },
  {
    id: "business-applications",
    title: "Business Applications Tiramisu",
    description: "Layers of business insights 'picked up' from AI implementation strategies",
    category: "dessert",
    duration: "8 min",
    image: "/coffee-6.jpg",
    content: {
      intro: "Our Business Applications Tiramisu gives you layered insights into how AI transforms businesses across industries - helping you 'pick up' valuable implementation strategies.",
      keyPoints: [
        "AI adoption typically follows a maturity curve from basic automation to transformative innovation",
        "Success factors include clear business goals, quality data, skilled teams, and iterative development",
        "Common pitfalls include unrealistic expectations, poor change management, and neglecting ethical considerations"
      ],
      summary: "You now have a framework for evaluating AI opportunities in your organization and avoiding common implementation pitfalls."
    }
  },
];
