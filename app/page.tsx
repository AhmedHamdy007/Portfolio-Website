"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
  Code,
  Database,
  Smartphone,
  Globe,
  Calendar,
  Award,
  ExternalLink,
  Download,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "100%"])


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projects = [
  {
    title: "API Marketplace",
    period: "April 2025 – May 2025",
    description: "Built a full-stack API marketplace platform with a Python backend and Vue.js frontend.",
    highlights: [
      "User authentication & product management",
      "RESTful API endpoints with database relationships",
      "Vue 3 frontend with Composition API & Pinia",
      "Shopping cart & responsive design with Tailwind CSS",
    ],
    tech: ["Python", "Vue.js", "Tailwind CSS", "Docker"],
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "WiseDose Application",
    period: "March 2025 – May 2025",
    description: "Developed a mobile app to assist users in managing medication intake and getting expert guidance.",
    highlights: [
      "AI-powered virtual pharmacist chatbot",
      "Medication management system",
      "Expert guidance integration",
    ],
    tech: ["Mobile Development", "AI/ML", "Flutter"],
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    title: "Google Drive Links Management",
    period: "June 2024 – Nov. 2024",
    description: "Developed a single-page academic management platform for students and lecturers.",
    highlights: [
      "Role differentiation (student/lecturer)",
      "Google Drive integration for resource sharing",
      "Real-time updates & file management",
      "MongoDB NoSQL collections",
    ],
    tech: ["JavaScript", "MongoDB", "Google Drive API", "MVC"],
    gradient: "from-slate-400 to-slate-600",
  },
  {
    title: "TVPSS System",
    period: "May 2024 – July 2024",
    description:
      "Developed a secure web-based application using Spring Tool Suite for managing applications and interviews.",
    highlights: [
      "Role-based dashboards (Admin, Teacher, Student)",
      "Spring Security & Thymeleaf integration",
      "PostgreSQL relational data storage",
      "Session-based authentication",
    ],
    tech: ["Java", "Spring", "PostgreSQL", "Thymeleaf"],
    gradient: "from-green-400 to-emerald-500",
  },
]

   const skills = {
    Languages: ["Java", "Python", "C++", "C#", "Flutter", "JavaScript", "HTML/CSS", "SQL", "NoSQL"],
    Databases: ["PostgreSQL", "MongoDB"],
    "Frameworks & Tools": ["Spring", "Vue.js", "Tailwind CSS", "Docker", "Google Drive API"],
    "Areas of Interest": [
      "Quality Assurance",
      "Full-Stack Development",
      "Natural Language Processing",
    ],
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-500 hover:bg-white/80 hover:backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Ahmed Hamdy
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Education", "Projects", "Skills", "Contact"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-emerald-600 relative group ${
                    activeSection === item.toLowerCase() ? "text-emerald-600" : "text-slate-600"
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  {item}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeSection === item.toLowerCase() ? "100%" : 0,
                      scaleX: activeSection === item.toLowerCase() ? 1 : 0 
                    }}
                    whileHover={{ width: "100%", scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-emerald-400/10 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>
            {/* Mobile menu indicator */}
            <motion.div 
              className="md:hidden w-6 h-6 flex flex-col justify-center items-center cursor-pointer group"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span 
                className="w-5 h-0.5 bg-slate-600 mb-1 group-hover:bg-emerald-600 transition-colors duration-300"
                animate={{ rotate: 0 }}
                whileHover={{ scaleX: 1.2 }}
              />
              <motion.span 
                className="w-5 h-0.5 bg-slate-600 mb-1 group-hover:bg-emerald-600 transition-colors duration-300"
                whileHover={{ scaleX: 0.8 }}
              />
              <motion.span 
                className="w-5 h-0.5 bg-slate-600 group-hover:bg-emerald-600 transition-colors duration-300"
                whileHover={{ scaleX: 1.2 }}
              />
            </motion.div>
          </div>
          {/* Progress bar indicator */}
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"
            style={{ 
              scaleX: scrollYProgress,
              transformOrigin: "0%" 
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-cyan-100/50 to-teal-100/50"
        />
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="text-center lg:text-left">
                <motion.h1
                  className="text-5xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    Ahmed
                  </span>
                  <br />
                  <span className="text-gray-800">Hamdy</span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Software Engineering Student At UTM
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={() => scrollToSection("projects")}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-3 rounded-full"
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection("contact")}
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-200 to-teal-200 p-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src="/ahmed-photo.jpeg"
                      alt="Ahmed Hamdy"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-300"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-blue-500" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              I am an International Computer Science undergraduate student with a strong foundation in software
              engineering and hands-on experience developing and testing web and mobile applications.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Passionate about backend systems and scalable application design, I'm eager to contribute to
              innovative projects and gain real-world experience in software development environments.
            </p>
            <div className="flex items-center gap-4 text-emerald-600 bg-emerald-50/50 p-4 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Seeking 6-month internship: Aug 2025 - Mar 2026</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { icon: Phone, text: "+60 11-1164 3110" },
              { icon: Mail, text: "hamdy.mohamed@graduate.utm.my" },
              { icon: Linkedin, text: "linkedin.com/in/ahmedabdelaziz" },
              { icon: MapPin, text: "Malaysia, JB" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-600 bg-white/50 p-4 rounded-lg backdrop-blur-sm hover:bg-white/70 transition-all duration-300 group border border-slate-200/50">
                <item.icon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto"></div>
        </div>
        
        <Card className="max-w-4xl mx-auto bg-white/50 backdrop-blur-xl border-slate-200/50 hover:bg-white/70 transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-50/50 to-blue-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-700">
                  Bachelor Of Computer Science (Software Engineering)
                </CardTitle>
                <CardDescription className="text-emerald-600">Universiti Teknologi Malaysia</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-slate-500">Expected Graduation</p>
                <p className="font-semibold text-slate-700">October 2026</p>
              </div>
              <div className="space-y-2">
                <p className="text-slate-500">Location</p>
                <p className="font-semibold text-slate-700">Malaysia, JB</p>
              </div>
              <div className="space-y-2">
                <p className="text-slate-500">CGPA</p>
                <p className="font-semibold text-slate-700">3.68/4.00</p>
              </div>
              <div className="space-y-2">
                <p className="text-slate-500">Achievement</p>
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600">
                  <Award className="w-4 h-4 mr-1" />
                  Dean's List High Honors
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-xl border-slate-200/50 hover:bg-white/70 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-slate-700 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-emerald-600 font-medium">{project.period}</CardDescription>
                  </div>
                  <div className={`p-2 bg-gradient-to-r ${project.gradient} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-slate-500 flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full mt-2 flex-shrink-0`} />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <Badge key={idx} className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/50 backdrop-blur-xl border-slate-200/50 hover:bg-white/70 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                        {category === "Languages" && <Code className="w-5 h-5 text-white" />}
                        {category === "Databases" && <Database className="w-5 h-5 text-white" />}
                        {category === "Frameworks & Tools" && <Globe className="w-5 h-5 text-white" />}
                        {category === "Areas of Interest" && <Smartphone className="w-5 h-5 text-white" />}
                      </div>
                      <CardTitle className="text-lg text-slate-700">{category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, idx) => (
                        <Badge key={idx} className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mb-8"></div>
          
          <p className="text-xl text-slate-600 mb-12">
            I'm actively seeking internship opportunities and would love to discuss how I can contribute to your team.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {/* Email Button */}
            <Button 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              onClick={() => window.open('mailto:hamdy.mohamed@graduate.utm.my', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </Button>

            {/* LinkedIn Button */}
            <Button
              variant="outline"
              className="border-emerald-400/50 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://www.linkedin.com/in/ahmed-abdelaziz-784189262/', '_blank')}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>

            {/* Download Resume Button */}
            <Button
              variant="outline"
              className="border-slate-400/50 text-slate-600 hover:bg-slate-50 px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                // Method 1: Direct download link (if resume is in public folder)
                const link = document.createElement('a');
                link.href = '/_resume2.pdf'; // Path to your resume file
                link.download = 'Ahmed_Resume.pdf'; // Downloaded filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: "Phone", value: "+60 11-1164 3110", gradient: "from-emerald-400 to-teal-500" },
              { icon: Mail, title: "Email", value: "hamdy.mohamed@graduate.utm.my", gradient: "from-blue-400 to-indigo-500" },
              { icon: MapPin, title: "Location", value: "Malaysia, JB", gradient: "from-slate-400 to-slate-600" },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white/50 backdrop-blur-xl rounded-lg border border-slate-200/50 hover:bg-white/70 transition-all duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-slate-700 mb-1">{item.title}</p>
                <p className="text-slate-500 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Ahmed Hamdy. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
