"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTheoryContent, TheoryContent } from "@/lib/theory-data";
import { experiments } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  Beaker, 
  FileText, 
  Home,
  GraduationCap,
  ClipboardCheck,
  Menu,
  X,
  Image,
  ChevronDown
} from "lucide-react";

export default function ExperimentTheoryPage() {
  const params = useParams();
  const router = useRouter();
  const [theoryContent, setTheoryContent] = useState<TheoryContent | null>(null);
  const [experiment, setExperiment] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);
  const [mobileContentExpanded, setMobileContentExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("aim");
  const [footerTop, setFooterTop] = useState<number | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  
  // Refs for each section
  const aimRef = useRef<HTMLDivElement>(null);
  const theoryRef = useRef<HTMLDivElement>(null);
  const procedureRef = useRef<HTMLDivElement>(null);
  const illustrationsRef = useRef<HTMLDivElement>(null);

  const toRoman = (num: number): string => {
    const romanNumerals = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ];
  
    let result = '';
    let remaining = num;
    
    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }
    
    return result;
  };

  useEffect(() => {
    setIsMounted(true);
    const id = Number(params.id);
    if (!isNaN(id)) {
      const content = getTheoryContent(id);
      const exp = experiments.find(e => e.id === id);
      setTheoryContent(content || null);
      setExperiment(exp);
    }

    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Debug
      console.log("Window width:", window.innerWidth, "Is mobile:", isMobileView);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set up intersection observer to update active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -75% 0px" } // Adjust as needed
    );
    
    // Observe all section refs
    if (aimRef.current) observer.observe(aimRef.current);
    if (theoryRef.current) observer.observe(theoryRef.current);
    if (procedureRef.current) observer.observe(procedureRef.current);
    if (illustrationsRef.current) observer.observe(illustrationsRef.current);
    
    // Function to update the sidebar position based on footer
    const updateSidebarPosition = () => {
      const footer = document.querySelector("body > footer");
      const header = document.querySelector("body > div > header") || document.querySelector("body > header");
      
      // Remove console logs for production
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setFooterTop(footerRect.top);
      }
      
      if (header) {
        const headerRect = header.getBoundingClientRect();
        setHeaderHeight(headerRect.height || 0);
      } else {
        // If no header is found, use a default height
        setHeaderHeight(60); // Use a reasonable default height
      }
    };
    
    // Call once on mount
    updateSidebarPosition();
    
    // Add resize listener to recalculate when window size changes
    window.addEventListener('resize', updateSidebarPosition);
    window.addEventListener('scroll', updateSidebarPosition);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
      // Remove event listeners on cleanup
      window.removeEventListener('resize', updateSidebarPosition);
      window.removeEventListener('scroll', updateSidebarPosition);
    };
  }, [params.id]);

  if (!isMounted || !theoryContent || !experiment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  const handleStartExperiment = () => {
    window.open(experiment.url, '_blank', 'noopener,noreferrer');
  };
  
  // Update the scrollToSection function to use document.querySelector
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      // Add offset to prevent section from starting right at the top edge
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  // Navigation items for page navigation
  const navItems = [
    { 
      label: 'Home', 
      icon: <Home className="h-5 w-5" />, 
      onClick: () => router.push('/experiments') 
    },
    { 
      label: 'Pre-Test', 
      icon: <GraduationCap className="h-5 w-5" />, 
      onClick: () => router.push(`/test/pre-test/${experiment.id}`) 
    },
    { 
      label: 'Simulation', 
      icon: <Beaker className="h-5 w-5" />, 
      onClick: handleStartExperiment 
    },
    { 
      label: 'Post-Test', 
      icon: <ClipboardCheck className="h-5 w-5" />, 
      onClick: () => router.push(`/test/post-test/${experiment.id}`) 
    }
  ];
  
  // Update the contentItems array
  const contentItems = [
    {
      id: "aim",
      label: "Aim",
      icon: <BookOpen className="h-4 w-4" />,
      onClick: () => scrollToSection("aim"),
    },
    {
      id: "theory",
      label: "Theory",
      icon: <FileText className="h-4 w-4" />,
      onClick: () => scrollToSection("theory"),
    },
    ...(theoryContent.procedures ? [{
      id: "procedure",
      label: "Procedure",
      icon: <Beaker className="h-4 w-4" />,
      onClick: () => scrollToSection("procedure"),
    }] : []),
    ...(theoryContent.images ? [{
      id: "illustrations",
      label: "Illustrations",
      icon: <Image className="h-4 w-4" />,
      onClick: () => scrollToSection("illustrations"),
    }] : []),
  ];

  // Update the sidebar style object to position it better
  const sidebarStyle = {
    top: `${Math.max(headerHeight + 20, 0)}px`, // Add 20px spacing below header
    height: footerTop 
      ? `calc(100vh - ${Math.max(headerHeight + 20, 0)}px - ${window.innerHeight - footerTop}px - 20px)` 
      : `calc(100vh - ${Math.max(headerHeight + 20, 0)}px - 80px)`,
    overflowY: "auto" as const
  };

  return (
    <div className="bg-[#efeeee] min-h-screen flex">
      {/* Desktop Sidebar*/}
      {!isMobile && (
        <motion.div 
          className="bg-white shadow-lg fixed left-0 z-20 flex flex-col py-4 overflow-y-auto rounded-tr-lg rounded-br-lg"
          style={sidebarStyle}
          initial={{ width: "70px" }}
          animate={{ 
            width: sidebarExpanded ? "240px" : "70px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <div className="px-3 mb-8 flex justify-center">
            <motion.div
              animate={{ opacity: sidebarExpanded ? 1 : 0.8 }}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold"
            >
              {experiment && toRoman(experiment.id)}
            </motion.div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Page Navigation Items */}
            <div className="mb-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  className="w-full flex items-center px-3 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={item.onClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center w-10">
                    {item.icon}
                  </span>
                  <AnimatePresence>
                    {sidebarExpanded && (
                      <motion.span
                        className="ml-3 font-medium whitespace-nowrap overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
            
            {/* Content Outline - separator */}
            {sidebarExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-3 mb-3 border-t border-gray-200 pt-2"
              >
                <span className="text-xs text-gray-500 font-medium px-3">CONTENT</span>
              </motion.div>
            )}
            
            {/* Content Outline Items */}
            <div>
              {contentItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`w-full flex items-center px-3 py-2.5 hover:bg-blue-50 transition-colors ${
                    activeSection === item.id 
                      ? "text-blue-600 bg-blue-50 font-medium" 
                      : "text-gray-600"
                  }`}
                  onClick={item.onClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`flex items-center justify-center w-10 ${
                    activeSection === item.id 
                      ? "text-blue-600" 
                      : "text-gray-500"
                  }`}>
                    {item.icon}
                  </span>
                  <AnimatePresence>
                    {sidebarExpanded && (
                      <motion.span
                        className="ml-3 whitespace-nowrap overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu Button - Enhanced Visibility */}
      {isMobile && (
        <div className="fixed top-[64px] left-0 z-30 w-full bg-white shadow-md flex items-center p-3 border-b border-gray-200">
          <button 
            className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            <span className="ml-2 font-medium text-sakec-blue">{theoryContent.title}</span>
          </button>
          
          {/* Current section indicator */}
          <div className="ml-auto mr-2 text-sm text-gray-600">
            <span>Current: </span>
            <span className="font-medium text-blue-600">{contentItems.find(item => item.id === activeSection)?.label}</span>
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu - Overlay */}
      {isMobile && (
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      {/* Mobile Dropdown Menu - Content */}
      {isMobile && (
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div 
              className="fixed top-14 left-4 right-4 z-50 bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              {/* Navigation Section */}
              <div className="p-2">
                <div 
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-md mb-2 cursor-pointer"
                  onClick={() => setMobileNavExpanded(!mobileNavExpanded)}
                >
                  <span className="font-medium text-blue-800">Navigation</span>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${mobileNavExpanded ? 'rotate-180' : ''}`} 
                    size={18} 
                  />
                </div>
                
                <AnimatePresence>
                  {mobileNavExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        {navItems.map((item, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors rounded-md"
                            onClick={() => {
                              setMobileSidebarOpen(false);
                              item.onClick();
                            }}
                          >
                            <span className="flex items-center justify-center w-6 mr-3">
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Content Section */}
              <div className="p-2 border-t border-gray-100">
                <div 
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-md mb-2 cursor-pointer"
                  onClick={() => setMobileContentExpanded(!mobileContentExpanded)}
                >
                  <span className="font-medium text-blue-800">Jump to Section</span>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${mobileContentExpanded ? 'rotate-180' : ''}`} 
                    size={18} 
                  />
                </div>
                
                <AnimatePresence>
                  {mobileContentExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        {contentItems.map((item) => (
                          <button
                            key={item.id}
                            className={`w-full flex items-center p-3 transition-colors rounded-md ${
                              activeSection === item.id 
                                ? "text-blue-600 bg-blue-50 font-medium" 
                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                            onClick={() => {
                              setMobileSidebarOpen(false);
                              item.onClick();
                            }}
                          >
                            <span className="flex items-center justify-center w-6 mr-3">
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Main Content with adjusted margin */}
      <div className={`flex-1 ${!isMobile ? "ml-[70px]" : "mt-14"}`}>
        <div className="bg-[#efeeee] min-h-screen py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                <h1 className="text-3xl font-bold mb-4 text-center">{theoryContent.title}</h1>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                    {experiment.category}
                  </span>
                  <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                    {experiment.difficulty}
                  </span>
                  <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                    {experiment.duration}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <motion.div
                  ref={aimRef}
                  id="aim"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-800 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Aim
                  </h2>
                  <p className="text-gray-700">{theoryContent.aim}</p>
                </motion.div>
                
                <motion.div
                  ref={theoryRef}
                  id="theory"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Theory
                  </h2>
                  <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    {theoryContent.theory.map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Procedure Section */}
                {theoryContent.procedures && (
                  <motion.div
                    ref={procedureRef}
                    id="procedure"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                      <Beaker className="h-5 w-5 mr-2" />
                      Procedure
                    </h2>
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <ol className="list-decimal pl-5 space-y-3">
                        {theoryContent.procedures.map((step: string, index: number) => (
                          <li key={index} className="text-gray-700 leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}

                {theoryContent.images && (
                  <motion.div
                    ref={illustrationsRef}
                    id="illustrations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="my-10 space-y-8"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                      <Image className="h-5 w-5 mr-2" />
                      Illustrations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {theoryContent.images.map((image, index) => (
                        <figure key={index} className="mb-6 border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-center mb-3">
                            <img 
                              src={image.src} 
                              alt={image.alt || image.caption || `Figure ${index + 1}`} 
                              className="max-h-60 object-contain"
                            />
                          </div>
                          <figcaption className="text-center text-gray-600 italic text-sm">
                            {image.caption || `Figure ${index + 1}`}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}