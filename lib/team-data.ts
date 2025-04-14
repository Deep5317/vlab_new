
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  category: "patrons" | "VlabDeveloper" | "Faculty" | "WebsiteTeam" | "Management";
  position: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

// Group members by their categories                  
export const teamCategories = [
  { id: "patrons", name: "Patrons of Vlabs", description: " " },
  { id: "management", name: "Management Team", description: "Keeping everything organized and on track" },
  { id: "faculty", name: "Faculty Mentors", description: "Our experienced faculty who guide the project" },
  { id: "VlabDeveloper", name: "Vlab Developer Team", description: "Talented students helping build our experiments" },
  { id: "WebsiteTeam", name: "Website Team", description: "Software engineers and developers behind the platform" },
  
];

export const teamMembers: TeamMember[] = [

  // patrons
  {
    id: 1,
    name: "Dr. Bhavesh Patel",
    role: "",
    position: "Principal",
    image: "/images/team/DrBhaveshPatel.png?height=300&width=300",
    category: "patrons",
    bio: "Principal, Shah & Anchor Kutcchi Engineering College.",
    linkedin: "https://www.linkedin.com/in/profbhaveshpatel/",
    email: ""
  },
  {
    id: 2,
    name: "Prof. Abdul Wajid Khan",
    role: "",
    position: "F.E. Incharge",
    image: "/images/team/AbdulWajidKhan.png?images/team/DrBhaveshPatel.png?height=300&width=300",
    category: "patrons",
    bio: "First Year Engineering Incharge, Shah & Anchor Kutcchi Engineering College.",
    linkedin: "https://www.linkedin.com/in/abdul-wajid-khan-0036127a/",
    email: "registrar@sakec.ac.in"
  },
  {
    id: 3,
    name: "Prof. Aruna Sharma",
    role: "",
    position: "F.E. Deputy Incharge",
    image: "/images/team/ArunaSharma.png?height=300&width=300",
    category: "patrons",
    bio: "First Year Engineering Deputy Incharge, Shah & Anchor Kutcchi Engineering College.",
    linkedin: "",
    email: "aruna.sharma@sakec.ac.in"
  },
  {
    id: 4,
    name: "Dr.Nilakshi Jain",
    role: "",
    position: "Research Cell Chair Person",
    image: "/images/team/NilakshiJain.png?height=300&width=300",
    category: "patrons",
    bio: "Research Cell Chair Person, Shah & Anchor Kutcchi Engineering College.",
    linkedin: "https://www.linkedin.com/in/dr-nilakshi-jain-7593a264/",
    email: "nilakshi.jain@sakec.ac.in"
  },
  


  // Faculty Mentors
  {
    id: 5,
    name: "Dr.Namrata Kkommineni",
    role: "VLabs Project Incharge",
    position: "VLabs Co-ordinator",
    image: "/images/team/NamrataKkomminen.png?height=300&width=300",
    category: "Faculty",
    bio: "17 years of teaching experience coupled with 6 years of research experience. Ph. D in Theoretical High Energy Particle Physics, University Department of Physics Mumbai University. I am very passionate about teaching and enjoy teaching intricate problems in a simple manner.",
    linkedin: "https://www.linkedin.com/in/dr-namrata-manglani-468a9135",
    email: "namrata.manglani@sakec.ac.in"
  },
  {
    id: 6,
    name: "Dr. Smita Srivastava",
    role: "Assistant Professor",
    position: "",
    image: "/images/team/SmitaSrivastava.png?height=300&width=300",
    category: "Faculty",
    bio: "I am Dr. Smita Srivastava working assistant professor in Engineering Physics.",
    linkedin: "https://www.linkedin.com/in/smita-srivastava-5b7a101aa",
    email: "smita.srivastava@sakec.ac.in"
  },
  
  // Vlab Developer Team
  {
    id: 7,
    name: "Dilipkumar Teli ",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DilipkumarTeli.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "Debugging by day, coding by night, crafting the future byte by byte.",
    linkedin: "https://www.linkedin.com/in/dilipkumarteli",
    github: "https://github.com/dilip1106",
    email: "dilipkumar.16995@sakec.ac.in"
  },
  {
    id: 8,
    name: "Deep Adak",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DeepAdak.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I am a B.Tech student with a strong interest in web development, software engineering, and emerging technologies. I enjoy building interactive and user-friendly applications that solve real-world problems and enhance the learning experience.",
    linkedin: "https://www.linkedin.com/in/deep-adak",
    github: "https://github.com/Deep5317",
    email: "deep.adak90@gmail.com"
  },
  {
    id: 9,
    name: "Reshab Singh",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/ReshabSingh.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "Hi, I am reshab signh , a curious person and my passion for physics roots deeply which is why I decided to work on the Vlabs projects. The projects were a new experience for and truly made me realise that how technology can make learning physics so simple and effective.",
    linkedin: "https://www.linkedin.com/in/reshab-singh-50898621b/",
    github: "https://github.com/ReshabSingh",
    email: "reshab.17313@sakec.ac.in"
  },
  {
    id: 10,
    name: "Sahas Prajapati",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/SahasPrajapati.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I am a Computer Science Engineering student passionate about web development and emerging technologies. With prior experience in frontend and backend development, I aim to contribute to the Applied Physics V-Lab by building interactive and user-friendly virtual lab experiences.",
    linkedin: "https://www.linkedin.com/in/sahasprajapati/",
    github: "https://github.com/SahasOP",
    email: "sahas.17383@sakec.ac.in"
  },
  {
    id: 11,
    name: "Aryaan Gala",
    role: "Co-Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/AryaanGala.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I am a passionate developer currently building Virtual Physics Labs for my college using HTML, CSS, and JavaScript, with custom illustrations created in Inkscape using SVG. My interest lies in creating interactive and visually engaging learning tools that simplify complex physics concepts for students through hands-on simulations.",
    linkedin: "https://www.linkedin.com/in/aryaan-gala-a07645261/",
    github: "https://github.com/AryaanGala1406",
    email: "aryaan.17135@sakec.ac.in"
  },
  {
    id: 12,
    name: "Mansi Shendge",
    role: "CoLead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/MansiShendge.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I'm currently a student at Shah and anchor kutchhi engineering college, driven by a deep enthusiasm for exploring software technology. This project really helped me in applying my skills in order to create such simulations.",
    linkedin: "https://www.linkedin.com/in/mansi-shendge-1ba204257/",
    github: "https://github.com/MansiShendge",
    email: "mansi.17088@sakec.ac.in"
  },
  
  // Website Team
  {
    id: 13,
    name: "Vighnesh Kontham",
    role: "Frontend Developer",
    position: "Information Technology | second year",
    image: "/images/team/VighneshKontham.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I am a B.Tech student, software engineering, and emerging technologies. I enjoy building interactive and user-friendly applications that solve real-world problems and enhance the learning experience.",
    linkedin: "https://www.linkedin.com/in/vighnesh-kontham-a0378a289/",
    github: "https://github.com/Captain-Vikram",
    email: "vighneshkontham@gmail.com"
  },
  {
    id: 14,
    name: "Abhishek kanaujiya ",
    role: "Frontend Developer",
    position: "Information Technology | econd year",
    image: "/images/team/AbhishekKanaujiya.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I'm Abhishek Kanaujiya, a passionate tech enthusiast with a strong interest in machine learning, deep learning, and full-stack development. I enjoy building impactful projects and continuously expanding my skill set. Always eager to learn, grow, and explore new technologies.",
    linkedin: "http://www.linkedin.com/in/abhishek-kanaujiya-b69701276",
    github: "https://github.com/Abhishek-2057",
    email: "kavikumar0454@gmail.com"
  },

  {
    id: 15,
    name: "Hetvi Sunil Bhanushali ",
    role: "SVG Creator",
    position: "Computer Engineering | First year",
    image: "/images/team/HetviSunilBhanushali.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I'm a web development enthusiast with a keen interest in creating custom SVG graphics and building engaging, user-friendly web experiences.",
    linkedin: "https://www.linkedin.com/in/hetvi-bhanushali-0b5663344/",
    github: "",
    email: "hetvi.bhanushali24@sakec.ac.in"

  },
  {
    id: 16,
    name: "Rujuta Salvi",
    role: "SVG Creator",
    position: "Computer Engineering | First year",
    image: "/images/team/RujutaSalvi.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I had interest in creativity.So attended the SVG lecture.It created interest in this project",
    linkedin: "https://www.linkedin.com/in/rujuta-salvi-152014330/",
    github: "",
    email: "rujuta.salvi241@sakec.ac.in"
  },
  
  
  // Management Team
  {
    id: 17,
    name: "Ms.Jalpa Mehta",
    role: "",
    position: "Assistant Professor",
    image: "/images/team/jalpamehta.png?height=300&width=300",
    category: "Management",
    bio: " 1. Working as nodal center coordinator for setting up Nodal Center of virtual Labs(An MHRD Govt. of India Initiative) at the Institute. 2. working as coordinator for Institute Website Development.",
    linkedin: "https://www.linkedin.com/in/jalpa-mehta-56296b80/",
    email: "jalpa.mehta@sakec.ac.in"
  }
];

// <ValueCard
//   icon={<FlaskConical className="h-10 w-10 text-sakec-blue" />}
//   title="Innovation"
//   description="We continuously improve our virtual experiments to provide the most realistic and educational experience possible."
// />