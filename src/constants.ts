import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Code2, GraduationCap, Briefcase, Award, BookOpen, Send } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const PERSONAL_INFO = {
  name: "Sayan Sinha",
  role: "B.Tech CSE Student",
  email: "sayan.sinha.26.01.2006@gmail.com",
  phone: "+91 89027 70591",
  location: "Kolkata, India",
  about: "B.Tech Computer Science student with a strong interest in Machine Learning and Artificial Intelligence. Skilled in building data-driven applications and interactive web platforms. Passionate about solving real-world problems through technology and continuously learning modern tools and frameworks.",
  socials: [
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { name: "Email", url: "mailto:sayan.sinha.26.01.2006@gmail.com", icon: Mail },
  ]
};

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Heritage Institute of Technology",
    duration: "Aug 2024 – Present",
    details: "994 Madurdaha, Chowbaga Road, Anandapur, Kolkata - 700107",
    gpa: "8.81/10"
  },
  {
    degree: "Higher Secondary Education",
    institution: "Sarada Vidyapith(H.S.)",
    duration: "May 2022 – Mar 2024",
    details: "Sri Ramkrishna Pally, Sonarpur, Kolkata - 700150",
    gpa: "86.7%"
  },
  {
    degree: "Secondary Education",
    institution: "Sarada Vidyapith(H.S.)",
    duration: "Jan 2017 – Apr 2022",
    details: "Sri Ramkrishna Pally, Sonarpur, Kolkata - 700150",
    gpa: "92.3%"
  }
];

export const PROJECTS = [
  {
    title: "LabZero",
    duration: "Mar 2026 – Present",
    description: "Educational Web App for Virtual Lab Learning. Developed an interactive web application to simulate science experiments virtually.",
    tags: ["TypeScript", "HTML", "CSS", "Three.js"],
    highlights: [
      "Integrated 3D visualizations using Three.js to enhance conceptual understanding",
      "Designed for students with limited access to physical lab infrastructure"
    ],
    problem: "Many students lack access to physical laboratory equipment, especially in remote or underfunded areas, making it difficult to grasp complex scientific concepts through theory alone.",
    solution: "I built a web-based virtual lab using Three.js to provide interactive 3D simulations of experiments. This allows students to manipulate variables and observe results in a safe, accessible digital environment.",
    challenges: "Optimizing 3D performance for low-end devices and ensuring the physics simulations were accurate enough for educational purposes."
  },
  {
    title: "MindBloom",
    duration: "Aug 2025 – Feb 2026",
    description: "MindBloom: Holistic Health Tracking & Support Platform. Built a platform integrating mental and physical health tracking.",
    tags: ["JavaScript", "HTML", "CSS", "Python", "Dockerfile"],
    highlights: [
      "Implemented features for emotional tracking and self-reflection",
      "Designed a user-centric system promoting overall well-being"
    ],
    problem: "Existing health apps often separate mental and physical well-being, failing to provide a holistic view of a user's health journey.",
    solution: "MindBloom integrates mood tracking, physical activity logs, and guided reflection into a single dashboard, using data visualization to show correlations between physical activity and mental state.",
    challenges: "Designing a UI that felt calming and supportive while handling complex data inputs from multiple sources."
  },
  {
    title: "Habit-Quest",
    duration: "Jan 2026 – Present",
    description: "Habit-Quest: Gamified Habit Tracker Web Application. Developing a habit tracking application with gamification elements.",
    tags: ["TypeScript", "HTML", "JavaScript"],
    highlights: [
      "Implemented rewards, progress tracking, and achievement systems",
      "Focused on improving user engagement and long-term habit consistency"
    ],
    problem: "Maintaining new habits is difficult due to lack of immediate gratification and motivation over long periods.",
    solution: "I applied gamification principles—XP, levels, and unlockable achievements—to the habit tracking process, turning daily routines into a rewarding 'quest'.",
    challenges: "Balancing the reward system to be motivating without being distracting, and ensuring the mobile-responsive design felt like a native app."
  },
  {
    title: "Sea-Level-Predictor",
    duration: "Nov 2025 – Nov 2025",
    description: "Sea Level Rise Prediction using Linear Regression. Built a predictive model using linear regression on climate data.",
    tags: ["Python"],
    highlights: [
      "Analyzed long-term trends and forecasted sea level rise till 2050",
      "Visualized insights using scatter plots and regression techniques"
    ],
    problem: "Climate change data is often dense and difficult for non-experts to interpret, making the urgency of sea-level rise less apparent.",
    solution: "Developed a Python-based tool that uses historical NOAA data to predict future levels through 2050, presenting the results through clear, interactive visualizations.",
    challenges: "Cleaning and normalizing historical datasets that had missing values and inconsistent formatting across different decades."
  },
  {
    title: "Jarvis --Voice-Assistant",
    duration: "Oct 2025 – Present",
    description: "Jarvis: Personal Voice Assistant. Built a voice assistant using Python (SpeechRecognition, NLP libraries).",
    tags: ["Python"],
    highlights: [
      "Implemented voice command processing and task automation",
      "Enabled features like web search, reminders, and system control"
    ],
    problem: "Standard computer interfaces can be inefficient for quick tasks like setting reminders or searching for information while multitasking.",
    solution: "Built a custom voice assistant that leverages SpeechRecognition and NLP to execute system commands and fetch web data through natural language.",
    challenges: "Handling background noise during speech recognition and mapping varied natural language intents to specific system functions."
  }
];

export const SKILLS = {
  "Programming Languages": ["C", "C++", "Java", "JavaScript", "TypeScript", "Python"],
  "Web Development": ["HTML", "CSS", "Three.js"],
  "Tools & Technologies": ["Git", "Docker"],
  "Data Science": ["NumPy", "Pandas", "Data Analysis", "Data Visualization"]
};

export const CERTIFICATIONS = [
  { title: "Solutions Architecture Job Simulation", issuer: "Amazon Web Service", date: "Oct 2025" },
  { title: "Coding Speed", issuer: "CodinGame", date: "Jul 2025" },
  { title: "C Certification", issuer: "CodinGame", date: "Jul 2025" },
  { title: "HackHeritage 3.0", issuer: "Heritage Institute of Technology", date: "Sep 2025" },
  { title: "Intro to Machine Learning", issuer: "Kaggle", date: "Dec 2025" }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Getting Started with Three.js in React",
    excerpt: "Learn how to integrate interactive 3D elements into your React applications using @react-three/fiber.",
    date: "April 10, 2026",
    content: "Three.js is a powerful library for 3D graphics on the web. When combined with React, it becomes even more declarative and easier to manage..."
  },
  {
    id: 2,
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how Machine Learning models are being integrated directly into the browser for better user experiences.",
    date: "March 25, 2026",
    content: "AI is no longer just a backend concern. With libraries like TensorFlow.js and the rise of edge computing..."
  }
];
