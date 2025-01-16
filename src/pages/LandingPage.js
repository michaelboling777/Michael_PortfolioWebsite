import React, { useState, useEffect, lazy, Suspense, memo, useRef } from 'react';
import { config } from '../config';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Web_Photo_Editor.jpg';
import rotatingCubeGif from '../assets/michaelboling_spinningcube.gif';
import Navigation from '../components/Navigation';
import MatrixAnimation from '../components/MatrixAnimation';  






// Displays interests/hobbies with flip animation
const InterestCard = memo(({ icon, title, items, onMouseEnter, onMouseLeave }) => {
  const handleInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div 
      className="group h-48 [perspective:1000px]"
      onMouseEnter={() => onMouseEnter(title)}
      onMouseLeave={() => onMouseLeave()}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 bg-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-white [backface-visibility:hidden]">
          {icon}
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-center mt-2 text-sm opacity-80">Click to see more</p>
        </div>
        <div className="absolute inset-0 bg-white rounded-lg p-6 text-slate-800 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h3 className="font-bold text-lg mb-2">{title} Details:</h3>
          <ul className="space-y-2 text-sm">
            {items.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});


// Displays project information with optional effects
const ProjectCard = memo(({ title, description, image, githubLink, hasEffects = true, isMatrix = false }) => {
  const handleInteraction = (e) => {
    if (!e.target.closest('a')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div 
      className={`relative group bg-slate-800 p-6 rounded-lg overflow-hidden ${
        hasEffects ? 'transition-all duration-500 ease-in-out transform hover:scale-[1.02]' : ''
      } ${(!isMatrix && image) ? 'hover:bg-white' : ''}`}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {isMatrix && <MatrixAnimation className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
      <div className="relative z-10">
        <h3 className={`text-xl font-bold mb-4 text-white ${(!isMatrix && image) ? 'group-hover:text-slate-800' : ''}`}>
          {title}
        </h3>
        <div 
          className={`mb-4 text-white ${(!isMatrix && image) ? 'group-hover:text-slate-800' : ''}`}
        >
          {description}
        </div>
        {image && (
          <div className="aspect-video mb-4 transform transition-transform duration-300 group-hover:scale-105">
            <img 
              src={image} 
              alt={`${title} Preview`} 
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
            />
          </div>
        )}
        {githubLink && (
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className={`text-blue-400 underline hover:text-blue-600 ${(!isMatrix && image) ? 'group-hover:text-blue-600' : 'hover:text-blue-300'}`}
          >
            View Source Code on GitHub
          </a>
        )}
      </div>
    </div>
  );
});

const themeColors = {
  default: 'bg-slate-700',
  Gaming: 'bg-purple-900',
  Technology: 'bg-cyan-900',
  Fitness: 'bg-emerald-900',
  Music: 'bg-indigo-900',
};



// Main landing page component managing state and UI
const LandingPage = () => {
  
    // State management
  const [formData, setFormData] = useState({
    'first-name': '',
    'last-name': '',
    'message': ''
  });
  
  const [formStatus, setFormStatus] = useState({
    type: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!formData['first-name'] || !formData['last-name'] || !formData.message) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://submit-form.com/${config.formsparkId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setFormData({
        'first-name': '',
        'last-name': '',
        'message': ''
      });
      
      setFormStatus({
        type: 'success',
        message: 'Message sent successfully!'
      });
      
      setTimeout(() => {
        setFormStatus({
          type: '',
          message: ''
        });
      }, 3000);
      
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sectionBg, setSectionBg] = useState('default');

  const handleCardEnter = (title) => {
    setSectionBg(title);
  };

  const handleCardLeave = () => {
    setSectionBg('default');
  };

  // Debounced resize handler
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const interestData = [
    {
      title: "Gaming",
      items: ["World of Warcraft", "Any Star Wars Game", "Zelda"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" x2="10" y1="11" y2="11"/>
          <line x1="8" x2="8" y1="9" y2="13"/>
          <line x1="15" x2="15.01" y1="12" y2="12"/>
          <line x1="18" x2="18.01" y1="10" y2="10"/>
          <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
        </svg>
      )
    },
    {
      title: "Technology",
      items: ["Low level programming", "Software Development", "Web Development", "AI & Machine Learning"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Fitness",
      items: ["Weight Lifting", "Basketball", "Cardio/Running"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.4 14.4 9.6 9.6"/>
          <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/>
          <path d="m21.5 21.5-1.4-1.4"/>
          <path d="M3.9 3.9 2.5 2.5"/>
          <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>
        </svg>
      )
    },
    {
      title: "Music",
      items: ["Lofi Beats", "Classical Music", "Kanye West", "The Weeknd"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-700" onClick={(e) => e.stopPropagation()}>
      {/* Navigation */}
      <Navigation 
        isLandingPage={true} 
        scrollToSection={scrollToSection} 
        showDarkMode={false} 
      />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: isMobile ? 'scroll' : 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-10"></div>
        </div>
        
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Michael Boling</h1>
          <p className="text-lg md:text-xl text-gray-300">Computer Science Graduate | Aspiring Software Developer</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/4 transform transition-transform duration-300 hover:scale-105">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="https://i.ibb.co/7ny1jsL/IMG-0706.jpg"
                  alt="With father"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/4 text-gray-300 space-y-4">
              <p>I chose to pursue a degree in Computer Science because of my innate passion for technology. When considering my career path, I took time to reflect on my strengths and interests, and it became clear that Computer Science was the perfect fit for me.</p>
              <p>Throughout my studies, I built a strong foundation in programming, learning important aspects like web development, algorithms, and computer networking. Through each semester, I gained more knowledge and experience, and my love for programming and software development grew even stronger.</p>
              <p>My passion for technology comes from my love of solving problems and thinking analytically. I have always been good at logic and analytical thinking, so when I started learning programming, it was a way that I was able to combine my strengths in a field I love.</p>
            </div>

            <div className="w-full md:w-1/4 transform transition-transform duration-300 hover:scale-105">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="https://i.ibb.co/fFBMtwz/67647-vg15573398c00-0.jpg"
                  alt="Graduation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ProjectCard 
              title="Rotating Cube"
              description="A 3D graphics project written in C++ using OpenGL. Demonstrates transformation matrices, real-time rendering, and lighting techniques."
              image={rotatingCubeGif}
              githubLink="https://github.com/yourusername/rotating-cube"
            />
            
            <ProjectCard 
              title="School Projects"
              isMatrix={true}
              description={
                <div className="flex flex-col items-center">
                  <p className="mb-4">Check out my notable school projects / coding assignments here!</p>
                  <Link 
                    to="/school-projects" 
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.scrollTo(0, 0);
                    }}
                  >
                    View School Projects
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 animate-pulse" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </Link>
                </div>
              }
              hasEffects={true}
            />
            
            <ProjectCard 
              title="Portfolio Website"
              description="This personal portfolio website built using react... designed to showcase my skills and projects!"
              hasEffects={false}
            />

            <ProjectCard 
              title="Algorithm Visualizations"
              description={
                <div className="flex flex-col items-center">
                  <p className="mb-4">Don't forget to check out my algorithms simulation page!</p>
                  <Link 
                    to="/algorithms" 
                    className="text-blue-400 hover:text-blue-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.scrollTo(0, 0);
                    }}
                  >
                    <svg className="w-full h-32" viewBox="0 0 200 100">
                      <defs>
                        <clipPath id="graph-clip">
                          <rect x="0" y="0" width="200" height="100" />
                        </clipPath>
                      </defs>
                      <path
                        d="M 10 90 Q 50 90 70 70 Q 90 50 100 20 Q 110 0 120 -20 Q 130 -40 140 -70"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <line x1="10" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="2"/>
                      <line x1="10" y1="90" x2="10" y2="10" stroke="currentColor" strokeWidth="2"/>
                      <text x="180" y="85" fill="currentColor" fontSize="12">n</text>
                      <text x="15" y="20" fill="currentColor" fontSize="12">2ⁿ</text>
                    </svg>
                    Visit Algorithms Page
                  </Link>
                </div>
              }
              hasEffects={false}
            />
          </div>
        </div>
      </section>

      {/* Resume Section */}
  
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Resume</h2>
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="text-white mb-6 md:mb-0">
                <h3 className="text-2xl font-semibold mb-2">Michael Boling</h3>
                <p className="text-gray-300">Computer Science Graduate</p>
                <p className="text-gray-400 mt-2">Last Updated: January 2025</p>
              </div>
              <a
                href="/assets/MichaelBolingResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group relative inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                View my resume here!
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Skills Highlight</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Programming Languages
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Web Development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Software Development
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Education</h4>
                <div className="text-gray-300">
                  <p className="font-semibold">Bachelor of Science in Computer Science</p>
                  <p className="text-gray-400">Missouri State University</p>
                  <p className="text-gray-400">Graduated: 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className={`py-16 transition-colors duration-500 ${themeColors[sectionBg]}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interests & Hobbies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {interestData.map((interest, index) => (
              <InterestCard 
                key={index}
                title={interest.title}
                items={interest.items}
                icon={interest.icon}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Contact Me</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="first-name"
                  value={formData['first-name']}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="last-name"
                  value={formData['last-name']}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                ></textarea>
              </div>
              
              {formStatus.message && (
                <div className={`p-3 rounded-lg ${
                  formStatus.type === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {formStatus.message}
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 Michael Boling</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/michaelboling777" 
              className="hover:text-blue-300 transition-colors duration-300" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a 
              href="https://www.linkedin.com/in/michaelboling1" 
              className="hover:text-blue-300 transition-colors duration-300" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <a 
              href="https://x.com/michael01030373" 
              className="hover:text-blue-300 transition-colors duration-300" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(LandingPage);