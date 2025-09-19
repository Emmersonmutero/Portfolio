import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setErrorMessage('Please fill in all fields.');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Please enter a valid email address.');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Submit via Web3Form
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "ee5b6cae-a6f6-42ca-b45a-1a23cd5f2d7f",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('Web3Form submission successful:', result);

        // Reset form and show success message
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        console.error('Web3Form submission failed:', result);
        setErrorMessage('Failed to send message. Please try again or contact me directly.');
        setSubmitStatus('error');
      }

    } catch (error: unknown) {
      console.error('Form submission error:', error);

      // Handle different types of errors
      if (error instanceof Error && error.message?.includes('Failed to fetch')) {
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        setErrorMessage('Failed to send message. Please try again or contact me directly at ej.mutero@gmail.com');
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Let's Build Something Great Together
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project and create something amazing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-purple-400/50 transition-all duration-300"
                    placeholder="Your Name"
                    required />

                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  formData.name ? 'top-2 text-xs text-purple-400' : 'top-4 text-white/60'}`
                  }>
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-purple-400/50 transition-all duration-300"
                    placeholder="Your Email"
                    required />

                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  formData.email ? 'top-2 text-xs text-purple-400' : 'top-4 text-white/60'}`
                  }>
                    Your Email
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-purple-400/50 transition-all duration-300 resize-none"
                    placeholder="Your Message"
                    required />

                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  formData.message ? 'top-2 text-xs text-purple-400' : 'top-4 text-white/60'}`
                  }>
                    Your Message
                  </label>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-400/30 rounded-2xl text-green-300">

                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                }
                
                {submitStatus === 'error' &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-300">

                    ❌ {errorMessage}
                  </motion.div>
                }

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`
                  }
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}>

                  {isSubmitting ?
                  <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span> :

                  'Send Message'
                  }
                </motion.button>
              </form>

              {/* Setup Status */}
              








            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8">

              <div>
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="text-white/70 leading-relaxed">
                  I'm always excited to work on new projects and collaborate with amazing people. 
                  Whether you have a specific project in mind or just want to chat about possibilities, 
                  feel free to reach out.
                </p>
              </div>

              {/* Alternative Contact Method */}
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h4 className="text-lg font-semibold mb-2">Direct Contact</h4>
                <p className="text-white/70 text-sm mb-3">
                  Having trouble with the form? You can reach me directly:
                </p>
                <a
                  href="mailto:ej.mutero@gmail.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors">

                  ej.mutero@gmail.com
                </a>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Connect with me</h4>
                <div className="flex space-x-4">
                  {[
                  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/emmerson-mutero-779170253' },
                  { name: 'GitHub', icon: Github, href: 'https://github.com/Emmersonmutero' },
                  { name: 'Email', icon: Mail, href: 'mailto:ej.mutero@gmail.com' }].
                  map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-purple-400/50 transition-all duration-300 group"
                        whileHover={{ scale: 1.1, y: -2 }}>

                        <IconComponent className="w-6 h-6 text-white/70 group-hover:text-purple-400 transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                      </motion.a>);

                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

};

export default Contact;