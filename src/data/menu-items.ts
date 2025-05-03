export interface MenuItem {
  id: string;
  title: string;
  description: string;
  category: 'appetizer' | 'entree' | 'dessert';
  duration: string;
  price: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string;
  bgColor: string;
  highlights: string[];
  content: {
    intro: string;
    videoUrl?: string;
    keyPoints: string[];
    interactiveElement?: {
      type: 'quiz' | 'playground' | 'simulation' | 'challenge';
      description: string;
      data?: any;
    };
    summary: string;
    relatedItems?: string[];
  };
  badges?: string[];
  featured?: boolean;
}

export interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  preparation: string;
  origin: string;
  flavorNotes: string[];
  pairsWith: string[];
}

export const coffeeItems: CoffeeItem[] = [
  {
    id: "espresso",
    name: "AI Foundation Espresso",
    description: "A pure, concentrated shot of AI knowledge - intense and enlightening",
    price: "$3.99",
    image: "/coffee/espresso.jpg",
    preparation: "Precision extracted knowledge under pressure",
    origin: "Computer Science fundamentals",
    flavorNotes: ["Logical", "Mathematical", "Theoretical"],
    pairsWith: ["intro-to-ai", "machine-learning"]
  },
  {
    id: "cappuccino",
    name: "Neural Network Cappuccino",
    description: "Perfect balance of theoretical foam and practical espresso",
    price: "$4.99",
    image: "/coffee/cappuccino.jpg",
    preparation: "Layered extraction with a smooth finish",
    origin: "Deep Learning research",
    flavorNotes: ["Architectural", "Balanced", "Intuitive"],
    pairsWith: ["neural-networks", "computer-vision"]
  },
  {
    id: "latte", 
    name: "Language Model Latte",
    description: "Smooth, rich and articulate blend with nuanced complexity",
    price: "$5.49",
    image: "/coffee/latte.jpg",
    preparation: "Carefully crafted with artisanal precision",
    origin: "NLP innovation labs",
    flavorNotes: ["Eloquent", "Contextual", "Adaptive"],
    pairsWith: ["generative-ai", "nlp-foundations"]
  },
  {
    id: "cold-brew",
    name: "Reinforcement Learning Cold Brew",
    description: "Patience-extracted knowledge that rewards with deep insights",
    price: "$5.99",
    image: "/coffee/cold-brew.jpg", 
    preparation: "Slow-steeped over 24 hours",
    origin: "Game theory and optimization",
    flavorNotes: ["Strategic", "Reward-based", "Environmental"],
    pairsWith: ["reinforcement-learning", "business-applications"]
  },
  {
    id: "mocha",
    name: "Creative AI Mocha",
    description: "The perfect marriage of technical precision and creative expression",
    price: "$6.49",
    image: "/coffee/mocha.jpg",
    preparation: "Artfully combined with creative elements",
    origin: "Computational creativity research",
    flavorNotes: ["Expressive", "Visual", "Imaginative"],
    pairsWith: ["generative-ai", "visual-ai-tools"]
  }
];

export const menuItems: MenuItem[] = [
  {
    id: "intro-to-ai",
    title: "AI Espresso Shot",
    description: "A quick, energizing introduction to AI fundamentals",
    category: "appetizer",
    duration: "5 min",
    price: "$7.99",
    difficulty: "beginner",
    image: "/menu/ai-espresso.jpg",
    bgColor: "from-blue-100 to-blue-50",
    highlights: ["Interactive concept map", "Beginner-friendly", "Foundation principles"],
    badges: ["Popular", "Quick Start"],
    featured: true,
    content: {
      intro: "Welcome to your AI Espresso Shot! Just like a good espresso gives you a quick energy boost, this module will quickly get you up to speed on what AI actually is (and isn't).",
      videoUrl: "https://youtu.be/ai-foundations-intro",
      keyPoints: [
        "AI is a branch of computer science focused on creating systems that can perform tasks normally requiring human intelligence",
        "Modern AI mostly uses machine learning algorithms that learn patterns from data",
        "AI exists on a spectrum from narrow (specific tasks) to general (human-like capabilities)"
      ],
      interactiveElement: {
        type: "playground",
        description: "Explore an interactive timeline of AI development, from early rule-based systems to modern neural networks. Click on each milestone to learn more about breakthrough moments in AI history."
      },
      summary: "You now understand the basic definition of AI and how it differs from traditional programming. This foundation will help you contextualize the more advanced concepts coming up!",
      relatedItems: ["machine-learning", "ai-ethics"]
    }
  },
  {
    id: "machine-learning",
    title: "Machine Learning Macchiato",
    description: "A perfectly balanced blend of ML concepts and applications",
    category: "appetizer",
    duration: "8 min",
    price: "$9.99",
    difficulty: "beginner",
    image: "/menu/ml-macchiato.jpg",
    bgColor: "from-blue-200 to-blue-100",
    highlights: ["Decision tree visualization", "Real-world examples", "Core ML types"],
    content: {
      intro: "The Machine Learning Macchiato offers the perfect balance of theory and application. Just as a macchiato balances espresso and milk, we'll balance technical concepts with real-world applications.",
      videoUrl: "https://youtu.be/machine-learning-intro",
      keyPoints: [
        "Machine learning allows computers to learn from data without being explicitly programmed",
        "The three main types are supervised learning, unsupervised learning, and reinforcement learning",
        "Common applications include recommendation systems, fraud detection, and image recognition"
      ],
      interactiveElement: {
        type: "simulation",
        description: "Try training a simple decision tree on real data and watch as it learns to classify new examples. Adjust parameters to see how the model's accuracy changes."
      },
      summary: "You've now mastered the core concepts of machine learning and can identify different ML approaches in real-world applications!",
      relatedItems: ["neural-networks", "data-preparation"]
    }
  },
  {
    id: "neural-networks",
    title: "Neural Network Cappuccino",
    description: "Rich, layered exploration of neural networks with a frothy top of practical examples",
    category: "entree",
    duration: "10 min",
    price: "$12.99",
    difficulty: "intermediate",
    image: "/menu/neural-cappuccino.jpg",
    bgColor: "from-blue-300 to-blue-200",
    highlights: ["Interactive neuron demo", "Layer visualization", "Training simulation"],
    content: {
      intro: "Dive into our Neural Network Cappuccino - rich in content with multiple layers (just like neural networks themselves) and topped with frothy practical examples to bring the concepts to life.",
      videoUrl: "https://youtu.be/neural-networks-explained",
      keyPoints: [
        "Neural networks are computing systems vaguely inspired by the human brain",
        "They consist of layers of interconnected nodes (neurons) that process information",
        "Deep learning uses neural networks with many layers to solve complex problems"
      ],
      interactiveElement: {
        type: "playground",
        description: "Build your own neural network by adding layers and neurons, then train it on a simple dataset and visualize how it learns patterns over time."
      },
      summary: "Congratulations! You now understand how neural networks function as the foundation of many modern AI breakthroughs.",
      relatedItems: ["computer-vision", "generative-ai"]
    }
  },
  {
    id: "computer-vision",
    title: "Computer Vision Cold Brew",
    description: "A refreshing deep dive into how machines see and understand images",
    category: "entree",
    duration: "11 min",
    price: "$13.99",
    difficulty: "intermediate",
    image: "/menu/cv-cold-brew.jpg",
    bgColor: "from-blue-400 to-blue-300",
    highlights: ["Image recognition demo", "CNN architecture", "Application showcase"],
    content: {
      intro: "Our Computer Vision Cold Brew has been carefully steeped in research to deliver a smooth, refreshing understanding of how computers interpret visual information.",
      videoUrl: "https://youtu.be/computer-vision-explained",
      keyPoints: [
        "Computer vision enables machines to derive meaningful information from digital images and videos",
        "Convolutional Neural Networks (CNNs) are specialized architectures designed for visual data processing",
        "Applications range from facial recognition to autonomous vehicles to medical diagnostics"
      ],
      interactiveElement: {
        type: "playground",
        description: "Upload your own image and watch as our demo model identifies objects, analyzes the scene, and explains how each layer of the network contributes to the final classification."
      },
      summary: "You now understand the core concepts of computer vision and how neural networks can be trained to see and interpret the world through pixels.",
      relatedItems: ["neural-networks", "generative-ai"]
    }
  },
  {
    id: "nlp-foundations",
    title: "NLP French Press",
    description: "Pressed to perfection, extracting the rich essence of language processing",
    category: "entree",
    duration: "12 min",
    price: "$13.99",
    difficulty: "intermediate",
    image: "/menu/nlp-french-press.jpg",
    bgColor: "from-blue-400 to-blue-300",
    highlights: ["Text analysis tools", "Sentiment visualization", "Language models"],
    content: {
      intro: "Our NLP French Press carefully extracts the essential flavors of Natural Language Processing, pressed to perfection to bring out the rich complexity of language understanding.",
      keyPoints: [
        "Natural Language Processing (NLP) helps computers understand, interpret, and generate human language",
        "Core techniques include tokenization, parsing, entity recognition, and sentiment analysis",
        "Transformer models revolutionized NLP with their attention mechanisms and contextual understanding"
      ],
      interactiveElement: {
        type: "playground",
        description: "Enter any text and see it analyzed in real-time: sentiment, key entities, syntactic structure, and more. Then try our text generation feature to see language models in action."
      },
      summary: "You now have a solid foundation in how machines process and understand human language, setting the stage for exploring more advanced generative AI.",
      relatedItems: ["generative-ai", "machine-learning"]
    }
  },
  {
    id: "generative-ai",
    title: "Generative AI Mocha",
    description: "A rich, indulgent exploration of generative AI capabilities",
    category: "entree",
    duration: "12 min",
    price: "$14.99",
    difficulty: "intermediate",
    image: "/menu/generative-mocha.jpg",
    bgColor: "from-blue-500 to-blue-400",
    highlights: ["Text generation demo", "Image synthesis", "Creative applications"],
    badges: ["Featured", "Trending"],
    featured: true,
    content: {
      intro: "Our Generative AI Mocha is rich and complex, with layers of flavor just like the multiple layers of generative models. This module explores how AI can create new content and ideas.",
      videoUrl: "https://youtu.be/generative-ai-explained",
      keyPoints: [
        "Generative AI creates new content - text, images, music, video - based on patterns learned from data",
        "Large language models like GPT and image generators like DALL-E are leading examples",
        "These systems can both augment human creativity and raise ethical considerations"
      ],
      interactiveElement: {
        type: "playground",
        description: "Try our mini generative AI playground where you can prompt a text model to write different content styles and an image generator to create visuals based on your descriptions."
      },
      summary: "You now understand the capabilities and limitations of generative AI systems, preparing you to use them effectively in your work.",
      relatedItems: ["ai-ethics", "visual-ai-tools"]
    }
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning Affogato",
    description: "Hot algorithmic principles poured over cool interactive simulations",
    category: "dessert",
    duration: "10 min",
    price: "$11.99",
    difficulty: "advanced",
    image: "/menu/rl-affogato.jpg",
    bgColor: "from-blue-500 to-blue-400",
    highlights: ["Game simulations", "Agent training", "Reward systems"],
    content: {
      intro: "Our Reinforcement Learning Affogato serves up the hot principles of reward-based learning poured over cool interactive simulations - a perfect blend of theory and practice.",
      keyPoints: [
        "Reinforcement learning trains agents through reward signals in an environment",
        "Agents learn optimal strategies by balancing exploration and exploitation",
        "Applications include game AI, robotics, recommendation systems, and autonomous vehicles"
      ],
      interactiveElement: {
        type: "simulation",
        description: "Control a reinforcement learning agent in various environments. Adjust reward functions and learning parameters to see how the agent adapts its behavior over time."
      },
      summary: "You now understand how AI systems can learn through trial and error, opening up possibilities for solving complex sequential decision problems.",
      relatedItems: ["machine-learning", "business-applications"]
    }
  },
  {
    id: "visual-ai-tools",
    title: "Visual AI Tools Parfait",
    description: "Layered visual tools and techniques beautifully presented with practical applications",
    category: "dessert",
    duration: "9 min",
    price: "$10.99",
    difficulty: "intermediate",
    image: "/menu/visual-tools-parfait.jpg",
    bgColor: "from-blue-400 to-blue-300",
    highlights: ["Design tools showcase", "Image editing demo", "Creative workflows"],
    content: {
      intro: "Our Visual AI Tools Parfait layers powerful AI-powered design and editing tools in a beautifully presented exploration of how AI is transforming visual creativity.",
      keyPoints: [
        "AI visual tools can generate, edit, enhance, and transform images with unprecedented ease",
        "Technologies like diffusion models, GANs, and neural style transfer power creative applications",
        "These tools are democratizing design and creating new workflows for professionals"
      ],
      interactiveElement: {
        type: "playground",
        description: "Try a simplified demo of AI image editing tools: inpainting, outpainting, style transfer, and simple prompt-based generation to see these technologies in action."
      },
      summary: "You're now equipped to understand and leverage AI-powered visual tools in your own creative or professional work.",
      relatedItems: ["generative-ai", "computer-vision"]
    }
  },
  {
    id: "ai-ethics",
    title: "AI Ethics Affogato",
    description: "A warm serving of ethical considerations with a cool perspective",
    category: "dessert",
    duration: "7 min",
    price: "$9.99",
    difficulty: "beginner",
    image: "/menu/ethics-affogato.jpg",
    bgColor: "from-blue-300 to-blue-200",
    highlights: ["Bias exploration", "Case studies", "Framework overview"],
    badges: ["Essential"],
    content: {
      intro: "The AI Ethics Affogato serves up warm ethical considerations with a cooling perspective on responsible implementation - a perfect way to conclude your AI learning journey.",
      videoUrl: "https://youtu.be/ai-ethics-primer",
      keyPoints: [
        "AI ethics involves principles like fairness, transparency, privacy, and accountability",
        "Bias in AI systems can perpetuate or amplify societal inequalities",
        "Responsible AI development requires diverse teams and ongoing evaluation"
      ],
      interactiveElement: {
        type: "challenge",
        description: "Face real-world ethical scenarios and make decisions about AI implementation. See the consequences of your choices and learn about frameworks for ethical decision-making."
      },
      summary: "You're now equipped to think critically about the ethical implications of AI implementation and advocate for responsible approaches.",
      relatedItems: ["business-applications", "generative-ai"]
    }
  },
  {
    id: "business-applications",
    title: "Business Applications Tiramisu",
    description: "Layers of business insights 'picked up' from AI implementation strategies",
    category: "dessert",
    duration: "8 min",
    price: "$10.99",
    difficulty: "intermediate",
    image: "/menu/business-tiramisu.jpg",
    bgColor: "from-blue-300 to-blue-200",
    highlights: ["ROI calculator", "Implementation roadmap", "Case studies"],
    badges: ["Business"],
    content: {
      intro: "Our Business Applications Tiramisu gives you layered insights into how AI transforms businesses across industries - helping you 'pick up' valuable implementation strategies.",
      videoUrl: "https://youtu.be/ai-business-strategy",
      keyPoints: [
        "AI adoption typically follows a maturity curve from basic automation to transformative innovation",
        "Success factors include clear business goals, quality data, skilled teams, and iterative development",
        "Common pitfalls include unrealistic expectations, poor change management, and neglecting ethical considerations"
      ],
      interactiveElement: {
        type: "simulation",
        description: "Use our AI ROI calculator and implementation simulator to plan an AI initiative for a sample business. Make strategic decisions and see the projected outcomes."
      },
      summary: "You now have a framework for evaluating AI opportunities in your organization and avoiding common implementation pitfalls.",
      relatedItems: ["ai-ethics", "data-preparation"]
    }
  },
  {
    id: "data-preparation",
    title: "Data Preparation Smoothie",
    description: "A refreshing blend of data cleaning, transformation, and augmentation techniques",
    category: "appetizer",
    duration: "6 min",
    price: "$8.99",
    difficulty: "beginner",
    image: "/menu/data-smoothie.jpg",
    bgColor: "from-blue-200 to-blue-100",
    highlights: ["Data cleaning demo", "Quality metrics", "Preparation pipeline"],
    content: {
      intro: "Our Data Preparation Smoothie blends essential techniques for getting your data ready for AI applications - a refreshing start to your machine learning journey.",
      keyPoints: [
        "Data preparation often consumes 80% of an AI project timeline but determines model success",
        "Key steps include cleaning, normalization, feature engineering, and validation",
        "Quality data is characterized by accuracy, completeness, consistency, and relevance"
      ],
      interactiveElement: {
        type: "playground",
        description: "Upload a sample dataset and walk through an interactive data preparation pipeline. Clean, transform, and visualize your data to understand common preparation techniques."
      },
      summary: "You now understand the critical importance of data preparation in AI projects and have practical techniques to ensure your data is ready for analysis.",
      relatedItems: ["machine-learning", "business-applications"]
    }
  }
];

// Helper function to get a menu item by ID
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

// Helper function to get a coffee item by ID
export const getCoffeeItemById = (id: string): CoffeeItem | undefined => {
  return coffeeItems.find(item => item.id === id);
};

// Helper function to get menu items by category
export const getMenuItemsByCategory = (category: 'appetizer' | 'entree' | 'dessert'): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

// Helper function to get related items for a menu item
export const getRelatedItems = (menuItemId: string): MenuItem[] => {
  const menuItem = getMenuItemById(menuItemId);
  if (!menuItem || !menuItem.content.relatedItems || menuItem.content.relatedItems.length === 0) {
    return [];
  }
  
  return menuItem.content.relatedItems
    .map(id => getMenuItemById(id))
    .filter((item): item is MenuItem => item !== undefined);
};

// Helper function to get coffee items that pair with a menu item
export const getPairingCoffees = (menuItemId: string): CoffeeItem[] => {
  return coffeeItems.filter(coffee => 
    coffee.pairsWith.includes(menuItemId)
  );
};
