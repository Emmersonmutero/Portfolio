
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      feedback: 'Emmerson delivered an exceptional website that exceeded our expectations. The 3D elements and smooth animations truly set us apart from competitors.'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCorp',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      feedback: 'Working with Emmerson was a game-changer. His attention to detail and technical expertise helped us launch our product successfully.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, BrandFlow',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      feedback: 'The website Emmerson created for us has significantly improved our conversion rates. His modern approach to web design is impressive.'
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Clients <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Testimonials from satisfied clients who trusted me with their projects
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                {/* Gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Client photo */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gradient-to-r from-purple-400 to-blue-400">
                        <img
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <blockquote className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                        "{testimonials[currentTestimonial].feedback}"
                      </blockquote>
                      
                      <div>
                        <h4 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-white/60">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400 scale-125' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
