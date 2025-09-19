
import React from 'react'
import { motion } from 'framer-motion'
import {ExternalLink, Github, Eye, Code, Zap, Star} from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "TaskFlow Pro",
      category: "Full Stack",
      description: "Advanced task management platform with real-time collaboration, drag-and-drop functionality, team analytics, and project timeline visualization.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "TypeScript"],
      features: ["Real-time collaboration", "Drag & drop interface", "Team analytics", "Timeline visualization", "Mobile responsive"],
      demoUrl: "https://taskflow-pro-demo.netlify.app",
      githubUrl: "https://github.com/emmerson-mutero/taskflow-pro",
      status: "Live",
      highlight: true
    },
    {
      id: 2,
      title: "EcoShop Marketplace",
      category: "E-Commerce",
      description: "Sustainable e-commerce platform featuring eco-friendly products, carbon footprint tracking, and green delivery options with integrated payment systems.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS", "Vercel"],
      features: ["Carbon tracking", "Secure payments", "Inventory management", "Admin dashboard", "SEO optimized"],
      demoUrl: "https://ecoshop-marketplace.vercel.app",
      githubUrl: "https://github.com/emmerson-mutero/ecoshop-marketplace",
      status: "Live"
    },
    {
      id: 3,
      title: "DataViz Analytics",
      category: "Data Science",
      description: "Interactive data visualization dashboard with AI-powered insights, predictive analytics, and customizable chart components for business intelligence.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "D3.js", "Python", "FastAPI", "TensorFlow"],
      features: ["AI insights", "Interactive charts", "Predictive modeling", "Export capabilities", "Real-time updates"],
      demoUrl: "https://dataviz-analytics-demo.netlify.app",
      githubUrl: "https://github.com/emmerson-mutero/dataviz-analytics",
      status: "Live"
    },
    {
      id: 4,
      title: "SocialHub Manager",
      category: "Social Media",
      description: "Comprehensive social media management platform with post scheduling, analytics tracking, content calendar, and multi-platform integration.",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Vue.js", "Express.js", "Redis", "AWS S3", "Docker"],
      features: ["Post scheduling", "Analytics dashboard", "Content calendar", "Team collaboration", "API integrations"],
      demoUrl: "https://socialhub-manager.herokuapp.com",
      githubUrl: "https://github.com/emmerson-mutero/socialhub-manager",
      status: "Live"
    },
    {
      id: 5,
      title: "CryptoTracker Pro",
      category: "Fintech",
      description: "Real-time cryptocurrency tracking application with portfolio management, price alerts, market analysis, and trading insights.",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React Native", "Firebase", "CoinGecko API", "Chart.js", "Expo"],
      features: ["Real-time prices", "Portfolio tracking", "Price alerts", "Market analysis", "Cross-platform"],
      demoUrl: "https://cryptotracker-pro.expo.dev",
      githubUrl: "https://github.com/emmerson-mutero/cryptotracker-pro",
      status: "Live"
    },
    {
      id: 6,
      title: "HealthTrack Mobile",
      category: "Healthcare",
      description: "Personal health tracking mobile app with fitness monitoring, meal planning, medical records, and healthcare provider integration.",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Flutter", "Dart", "Firebase", "HealthKit", "Google Fit"],
      features: ["Fitness tracking", "Meal planning", "Medical records", "Doctor integration", "Health insights"],
      demoUrl: "https://healthtrack-mobile-demo.web.app",
      githubUrl: "https://github.com/emmerson-mutero/healthtrack-mobile",
      status: "Development"
    },
    {
      id: 7,
      title: "VR Architecture Studio",
      category: "VR/AR",
      description: "Virtual reality application for architectural visualization with immersive walkthroughs, real-time collaboration, and design modifications.",
      image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Unity", "C#", "WebXR", "Three.js", "Blender"],
      features: ["VR walkthroughs", "Real-time collaboration", "Design modifications", "Cross-platform VR", "Cloud sync"],
      demoUrl: "https://vr-architecture-studio.netlify.app",
      githubUrl: "https://github.com/emmerson-mutero/vr-architecture-studio",
      status: "Development"
    },
    {
      id: 8,
      title: "AI Content Generator",
      category: "AI/ML",
      description: "AI-powered content generation platform with natural language processing, image generation, and automated content optimization for marketing.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Python", "OpenAI API", "React", "FastAPI", "PostgreSQL"],
      features: ["Text generation", "Image creation", "Content optimization", "Multi-language support", "API integration"],
      demoUrl: "https://ai-content-generator.vercel.app",
      githubUrl: "https://github.com/emmerson-mutero/ai-content-generator",
      status: "Live"
    },
    {
      id: 9,
      title: "EduLearn Platform",
      category: "Education",
      description: "Online learning platform with interactive courses, progress tracking, video streaming, assignments, and student-teacher communication.",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["MERN Stack", "Socket.io", "AWS", "Stripe", "JWT"],
      features: ["Interactive courses", "Progress tracking", "Video streaming", "Assignment system", "Real-time chat"],
      demoUrl: "https://edulearn-platform.herokuapp.com",
      githubUrl: "https://github.com/emmerson-mutero/edulearn-platform",
      status: "Live"
    },
    {
      id: 10,
      title: "Weather Forecast Pro",
      category: "Weather App",
      description: "Advanced weather application with detailed forecasts, interactive maps, weather alerts, and location-based recommendations.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "OpenWeather API", "Mapbox", "Chart.js", "PWA"],
      features: ["Detailed forecasts", "Interactive maps", "Weather alerts", "Location tracking", "Offline support"],
      demoUrl: "https://weather-forecast-pro.netlify.app",
      githubUrl: "https://github.com/emmerson-mutero/weather-forecast-pro",
      status: "Live"
    },
    {
      id: 11,
      title: "BlogCraft CMS",
      category: "Content Management",
      description: "Modern content management system with rich text editor, media management, SEO optimization, and multi-author collaboration features.",
      image: "https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Next.js", "Sanity CMS", "Vercel", "TypeScript", "Tailwind CSS"],
      features: ["Rich text editor", "Media management", "SEO optimization", "Multi-author support", "Custom themes"],
      demoUrl: "https://blogcraft-cms.vercel.app",
      githubUrl: "https://github.com/emmerson-mutero/blogcraft-cms",
      status: "Live"
    },
    {
      id: 12,
      title: "FoodDelivery Express",
      category: "Food Delivery",
      description: "Full-featured food delivery application with restaurant management, real-time order tracking, payment integration, and delivery optimization.",
      image: "https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe", "Google Maps"],
      features: ["Restaurant management", "Order tracking", "Payment integration", "Delivery optimization", "Rating system"],
      demoUrl: "https://fooddelivery-express.expo.dev",
      githubUrl: "https://github.com/emmerson-mutero/fooddelivery-express",
      status: "Development"
    }
  ]

  const categories = ["All", "Full Stack", "E-Commerce", "Data Science", "Social Media", "Fintech", "Healthcare", "VR/AR", "AI/ML", "Education", "Weather App", "Content Management", "Food Delivery"]
  const [activeCategory, setActiveCategory] = React.useState("All")

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">Featured Work</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Explore my comprehensive portfolio showcasing innovative solutions, cutting-edge technologies, 
            and creative problem-solving across various domains and industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16 px-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white'
                  : 'bg-white/5 backdrop-blur-sm border-white/10 text-white/70 hover:border-purple-400/50 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 ${
                project.highlight ? 'md:col-span-2 xl:col-span-2' : ''
              }`}
              whileHover={{ y: -10 }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Live' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {project.status}
                </div>
              </div>

              {/* Highlight Badge */}
              {project.highlight && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6 space-y-4">
                {/* Category & Title */}
                <div>
                  <div className="text-sm text-purple-400 font-medium mb-2">{project.category}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/60"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="px-2 py-1 text-xs text-purple-400">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-full text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-2">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">View Project</span>
                    <span className="sm:hidden">View</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm hover:border-purple-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-white/70 mb-6 text-lg">
            Interested in collaborating on your next project?
          </p>
          <motion.button
            onClick={scrollToContact}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
