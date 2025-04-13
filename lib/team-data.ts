export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  category: "Technical" | "Faculty" | "Student" | "Management";
  position: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

// Group members by their categories
export const teamCategories = [
  { id: "faculty", name: "Faculty Mentors", description: "Our experienced faculty who guide the project" },
  { id: "technical", name: "Technical Team", description: "Software engineers and developers behind the platform" },
  { id: "student", name: "Student Contributors", description: "Talented students helping build our experiments" },
  { id: "management", name: "Management Team", description: "Keeping everything organized and on track" }
];

export const teamMembers: TeamMember[] = [
  // Faculty Mentors
  {
    id: 1,
    name: "Dr. Rajendra Sawant",
    role: "Project Director",
    position: "HOD, Computer Science",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Faculty",
    bio: "Dr. Sawant has over 20 years of experience in computer science education and has led numerous educational technology projects.",
    linkedin: "https://linkedin.com/in/username",
    email: "rajendra.sawant@example.com"
  },
  {
    id: 2,
    name: "Prof. Anita Desai",
    role: "Physics Content Advisor",
    position: "Associate Professor, Physics",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Faculty",
    bio: "Prof. Desai specializes in experimental physics and has contributed to numerous educational resources in the field.",
    linkedin: "https://linkedin.com/in/username",
    email: "anita.desai@example.com"
  },
  
  // Technical Team
  {
    id: 3,
    name: "Raj Patel",
    role: "Lead Developer",
    position: "Full Stack Engineer",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Technical",
    bio: "Raj oversees the technical architecture of the VLab platform and handles backend development.",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    email: "raj.patel@example.com"
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Frontend Developer",
    position: "UI/UX Specialist",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Technical",
    bio: "Priya creates the interactive interfaces that make our virtual labs intuitive and engaging.",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    email: "priya.singh@example.com"
  },
  {
    id: 5,
    name: "Arjun Kumar",
    role: "Simulation Engineer",
    position: "Physics Simulation Expert",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Technical",
    bio: "Arjun specializes in creating realistic physics simulations that accurately represent laboratory experiments.",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    email: "arjun.kumar@example.com"
  },
  
  // Student Contributors
  {
    id: 6,
    name: "Neha Sharma",
    role: "Student Developer",
    position: "Computer Science, Final Year",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Student",
    bio: "Neha has contributed to multiple experiment simulations and helped optimize the platform's performance.",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username"
  },
  {
    id: 7,
    name: "Vikram Malhotra",
    role: "Student Developer",
    position: "Computer Science, Third Year",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Student",
    bio: "Vikram focuses on creating interactive UI components and implementing physics formulas in code.",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username"
  },
  
  // Management Team
  {
    id: 8,
    name: "Sanjay Gupta",
    role: "Project Manager",
    position: "Operations Director",
    image: "/images/team/Add_IMG_PATH?height=300&width=300",
    category: "Management",
    bio: "Sanjay coordinates between teams and ensures project milestones are met on schedule.",
    linkedin: "https://linkedin.com/in/username",
    email: "sanjay.gupta@example.com"
  }
];

// <ValueCard
//   icon={<FlaskConical className="h-10 w-10 text-sakec-blue" />}
//   title="Innovation"
//   description="We continuously improve our virtual experiments to provide the most realistic and educational experience possible."
// />