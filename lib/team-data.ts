
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  category: "Patrons" | "VlabDeveloper" | "Faculty" | "WebsiteTeam" | "Management";
  position: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

// Group members by their categories                  
export const teamCategories = [
  { id: "Patrons", name: "Patrons of Vlabs", description: "Leaders providing vision and support for the Virtual Labs initiative" },
  { id: "Management", name: "Management Team", description: "Co-ordinating resources and ensuring smooth operation of the project" },
  { id: "Faculty", name: "Faculty Mentors", description: "Experienced educators providing academic guidance and subject expertise" },
  { id: "VlabDeveloper", name: "Vlab Developer Team", description: "Engineers creating interactive simulations and experiments" },
  { id: "WebsiteTeam", name: "Website Team", description: "Designers and developers building the digital platform" },
];

export const teamMembers: TeamMember[] = [

  // patrons
  {
    id: 1,
    name: "Dr. Bhavesh Patel",
    role: "",
    position: "Principal",
    image: "/images/team/DrBhaveshPatel.png?height=300&width=300",
    category: "Patrons",
    bio: "Principal, Shah & Anchor Kutcchi Engineering College.",
    linkedin: "https://www.linkedin.com/in/profbhaveshpatel/",
    email: ""
  },

  {
    id: 2,
    name: "Prof. Aruna Sharma",
    role: "",
    position: "F.E. Incharge",
    image: "/images/team/ArunaSharma.png?height=300&width=300",
    category: "Patrons",
    bio: "First Year Engineering Deputy Incharge, Shah & Anchor Kutcchi Engineering College.",
    linkedin: "",
    email: "aruna.sharma@sakec.ac.in"
  },

  // Faculty Mentors
  {
    id: 3,
    name: "Dr.Namrata Kkommineni",
    role: "VLabs Project Incharge",
    position: "VLabs Co-ordinator",
    image: "/images/team/NamrataKkomminen.png?height=300&width=300",
    category: "Faculty",
    bio: "17 Years of teaching experience coupled with 6 Years of research experience. Ph. D in Theoretical High Energy Particle Physics, University Department of Physics Mumbai University. I am very passionate about teaching and enjoy teaching intricate problems in a simple manner.",
    linkedin: "https://www.linkedin.com/in/dr-namrata-manglani-468a9135",
    email: "namrata.manglani@sakec.ac.in"
  },
  
  {
    id: 4,
    name: "ADD Jhanvi Maam Here",
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
    id: 5,
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
    id: 6,
    name: "Deep Adak",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DeepAdak.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I am a B.Tech student with a strong interest in web development, software engineering, and emerging technologies. I enjoy building interactive and user-friendly applications that solve real-world problems and enhance the learning experience.",
    linkedin: "https://www.linkedin.com/in/deep-adak",
    github: "https://github.com/Deep5317",
    email: "deep.16922@sakec.ac.in"
  },
  {
    id: 7,
    name: "Sahas Prajapati",
    role: "Co-Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/SahasPrajapati.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I am a Computer Science Engineering student passionate about web development and emerging technologies. With prior experience in frontend and backend development, I aim to contribute to the Applied Physics V-Lab by building interactive and user-friendly virtual lab experiences.",
    linkedin: "https://www.linkedin.com/in/sahasprajapati/",
    github: "https://github.com/SahasOP",
    email: "sahas.17383@sakec.ac.in"
  },
  {
    id: 8,
    name: "Reshab Singh",
    role: "Co-Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/ReshabSingh.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "Hi, I am reshab signh , a curious person and my passion for physics roots deeply which is why I decided to work on the Vlabs projects. The projects were a new experience for and truly made me realise that how technology can make learning physics so simple and effective.",
    linkedin: "https://www.linkedin.com/in/reshab-singh-50898621b/",
    github: "https://github.com/ReshabSingh",
    email: "reshab.17313@sakec.ac.in"
  },
  
  {
    id: 9,
    name: "Mansi Shendge",
    role: "Member | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/MansiShendge.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I'm currently a student at Shah and anchor kutchhi engineering college, driven by a deep enthusiasm for exploring software technology. This project really helped me in applying my skills in order to create such simulations.",
    linkedin: "https://www.linkedin.com/in/mansi-shendge-1ba204257/",
    github: "https://github.com/MansiShendge",
    email: "mansi.17088@sakec.ac.in"
  },
  {
    id: 10,
    name: "Aryaan Gala",
    role: "Member | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/AryaanGala.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I am a passionate developer currently building Virtual Physics Labs for my college using HTML, CSS, and JavaScript, with custom illustrations created in Inkscape using SVG. My interest lies in creating interactive and visually engaging learning tools that simplify complex physics concepts for students through hands-on simulations.",
    linkedin: "https://www.linkedin.com/in/aryaan-gala-a07645261/",
    github: "https://github.com/AryaanGala1406",
    email: "aryaan.17135@sakec.ac.in"
  },
  
  {
    id: 11,
    name: "Hetvi Sunil Bhanushali ",
    role: "Member | Vlabs Developer",
    position: "Computer Engineering | First Year",
    image: "/images/team/HetviSunilBhanushali.jpg?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I'm a web development enthusiast with a keen interest in creating custom SVG graphics and building engaging, user-friendly web experiences.",
    linkedin: "https://www.linkedin.com/in/hetvi-bhanushali-0b5663344/",
    github: "",
    email: "hetvi.bhanushali24@sakec.ac.in"

  },
  {
    id: 12,
    name: "Rujuta Salvi",
    role: "Member | Vlabs Developer",
    position: "Computer Engineering | First Year",
    image: "/images/team/RujutaSalvi.png?height=300&width=300",
    category: "VlabDeveloper",
    bio: "I had interest in creativity.So attended the SVG lecture.It created interest in this project",
    linkedin: "https://www.linkedin.com/in/rujuta-salvi-152014330/",
    github: "",
    email: "rujuta.salvi241@sakec.ac.in"
  },
  
  // Website Team
  {
    id: 13,
    name: "Dilipkumar Teli ",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DilipkumarTeli.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "Debugging by day, coding by night, crafting the future byte by byte.",
    linkedin: "https://www.linkedin.com/in/dilipkumarteli",
    github: "https://github.com/dilip1106",
    email: "dilipkumar.16995@sakec.ac.in"
  },
  {
    id: 14,
    name: "Deep Adak",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DeepAdak.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I am a B.Tech student with a strong interest in web development, software engineering, and emerging technologies. I enjoy building interactive and user-friendly applications that solve real-world problems and enhance the learning experience.",
    linkedin: "https://www.linkedin.com/in/deep-adak",
    github: "https://github.com/Deep5317",
    email: "deep.16922@sakec.ac.in"
  },
  {
    id: 15,
    name: "Vighnesh Kontham",
    role: "Frontend Developer",
    position: "Information Technology | Second year",
    image: "/images/team/VighneshKontham.jpg?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I'm a tech enthusiast pursuing my B.Tech in software engineering with a passion for emerging technologies. When not deep in code, I'm crafting interactive applications that solve real-world problems while making learning more engaging and accessible. My mission is to build user-friendly digital experiences that not only work seamlessly but actually bring joy to the people who use them.",
    linkedin: "https://www.linkedin.com/in/vighnesh-kontham-a0378a289/",
    github: "https://github.com/Captain-Vikram",
    email: "vighneshkontham@gmail.com"
  },
  {
    id: 16,
    name: "Abhishek kanaujiya ",
    role: "Frontend Developer",
    position: "Information Technology | Second Year",
    image: "/images/team/AbhishekKanaujiya.png?height=300&width=300",
    category: "WebsiteTeam",
    bio: "I'm Abhishek Kanaujiya, a tech enthusiast who brings ideas to life through machine learning and full-stack development. My passion drives me to create impactful projects while continuously expanding my technical toolkit. Always curious and forward-thinking, I thrive on exploring new technologies that solve real-world challenges.",
    linkedin: "http://www.linkedin.com/in/abhishek-kanaujiya-b69701276",
    github: "https://github.com/Abhishek-2057",
    email: "kavikumar0454@gmail.com"
  },

  
  
  
  // Management Team
  {
    id: 17,
    name: "Ms.Jalpa Mehta",
    role: "",
    position: "Assistant Professor",
    image: "/images/team/jalpamehta.png?height=300&width=300",
    category: "Management",
    bio: " Working as nodal center coordinator for setting up Nodal Center of virtual Labs(An MHRD Govt. of India Initiative) at the Institute and also working as coordinator for Institute Website Development.",
    linkedin: "https://www.linkedin.com/in/jalpa-mehta-56296b80/",
    email: "jalpa.mehta@sakec.ac.in"
  },
  {
    id: 18,
    name: "Dr.Namrata Kkommineni",
    role: "VLabs Project Incharge",
    position: "VLabs Co-ordinator",
    image: "/images/team/NamrataKkomminen.png?height=300&width=300",
    category: "Management",
    bio: "17 Years of teaching experience coupled with 6 Years of research experience. Ph. D in Theoretical High Energy Particle Physics, University Department of Physics Mumbai University. I am very passionate about teaching and enjoy teaching intricate problems in a simple manner.",
    linkedin: "https://www.linkedin.com/in/dr-namrata-manglani-468a9135",
    email: "namrata.manglani@sakec.ac.in"
  },
  {
    id: 19,
    name: "Dilipkumar Teli ",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DilipkumarTeli.png?height=300&width=300",
    category: "Management",
    bio: "Debugging by day, coding by night, crafting the future byte by byte.",
    linkedin: "https://www.linkedin.com/in/dilipkumarteli",
    github: "https://github.com/dilip1106",
    email: "dilipkumar.16995@sakec.ac.in"
  },
  {
    id: 20,
    name: "Deep Adak",
    role: "Lead | Vlabs Developer",
    position: "Computer Engineering | Third Year",
    image: "/images/team/DeepAdak.png?height=300&width=300",
    category: "Management",
    bio: "I am a B.Tech student with a strong interest in web development, software engineering, and emerging technologies. I enjoy building interactive and user-friendly applications that solve real-world problems and enhance the learning experience.",
    linkedin: "https://www.linkedin.com/in/deep-adak",
    github: "https://github.com/Deep5317",
    email: "deep.16922@sakec.ac.in"
  }
];

// <ValueCard
//   icon={<FlaskConical className="h-10 w-10 text-sakec-blue" />}
//   title="Innovation"
//   description="We continuously improve our virtual experiments to provide the most realistic and educational experience possible."
// />