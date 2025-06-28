
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import DeliveryBooking from '@/components/DeliveryBooking';
import MessageViewer from '@/components/MessageViewer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'delivery' | 'messages'>('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const slides = [
    {
      title: "LEARN GROW AND EXPLORE ENDLESS OPPORTUNITIES!",
      subtitle: "Join a community of like-minded learners and industry professionals who are passionate about technology and...",
      buttons: ["Join Now", "Learn More"]
    },
    {
      title: "We Provide Services That You Can Trust!",
      subtitle: "Dedicated to empowering individuals and businesses with cutting-edge solutions.",
      buttons: ["Learn More", "About Us"]
    },
    {
      title: "Get the skills, mentorship, and resources you need to thrive in today's digital world.",
      subtitle: "",
      buttons: ["joinUs", "Contact Now"]
    }
  ];

  const programs = [
    {
      title: "Software Development",
      description: "Learn to build responsive and dynamic websites using modern technologies like HTML, CSS, JavaScript, and frameworks. Whether you want to create personal blogs, business websites, or complex web applications, our courses will equip you with the skills to succeed in the tech industry.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
      title: "Video Editing and Graphics Design",
      description: "Unleash your creativity by mastering both video editing and graphic design. Learn to transform raw footage into professional-quality videos using industry-standard software like Adobe Premiere Pro and DaVinci Resolve. At the same time, develop skills in graphic design with tools like Photoshop, Illustrator, and Canva to create eye-catching logos, posters, social media content, and marketing materials.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    },
    {
      title: "Data Analysis",
      description: "Turn data into insights and make data-driven decisions. Learn how to use tools like Excel, Python, SQL, and Power BI to analyze and visualize data, helping businesses and organizations optimize their performance.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
      title: "Forex Trading",
      description: "Discover how to trade the global financial markets and make informed investment decisions. Learn the fundamentals of forex trading, technical and fundamental analysis, risk management, and strategies to become a successful trader.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
    },
    {
      title: "UI/UX Design",
      description: "Master the art of creating user-friendly and visually appealing interfaces. Learn the principles of user experience (UX) and user interface (UI) design using tools like Figma and Adobe XD to craft intuitive and engaging digital experiences.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
    },
    {
      title: "Gadget Repairs & Sales",
      description: "Top-Quality Gadgets, or reliable repair services? We offer a wide range of mobile devices, accessories and tech essentials at unbeatable prices... Whether you need a brand-new, high-performance gadget or expert repairs for your damaged device, We are ready to assist.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Jones",
      text: "JE Techhub transformed my career. The hands-on training and expert instructors helped me gain the skills I needed to land my first job in web development. The community and support I received here were amazing!",
      date: "22 Aug, 2023"
    },
    {
      name: "Michael Smith",
      text: "I've been through several tech training programs, but none compared to the quality of JE Techhub. The curriculum was up-to-date, and I learned everything I needed to start my own freelance business in digital marketing. Highly recommend!",
      date: "15 Sept, 2023"
    },
    {
      name: "Emma Watson",
      text: "Thanks to JE Techhub's software development course, I now have the skills to build my own applications. The instructors were not only experts but also genuinely caring, and the practical training helped me grow fast!",
      date: "5 Jan, 2024"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  if (isLoading) {
    return (
      <div className="preloader fixed inset-0 bg-gradient-to-r from-slate-900 to-blue-900 flex items-center justify-center z-50">
        <div className="text-center text-white animate-pulse">
          <h1 className="text-6xl font-bold mb-4 animate-bounce">JOE EXPRESS</h1>
          <h2 className="text-3xl font-light animate-fade-in">TECH HUB</h2>
        </div>
      </div>
    );
  }

  // If not on home section, show the appropriate component
  if (activeSection === 'delivery') {
    return (
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
        {/* Dark Mode Toggle */}
        <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-0.5">
            <Sun className={`h-2 w-2 ${isDarkMode ? 'text-gray-400' : 'text-orange-500'}`} />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-orange-500 scale-[0.4]"
            />
            <Moon className={`h-2 w-2 ${isDarkMode ? 'text-orange-500' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* New Header */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .header {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px 0;
              position: sticky;
              top: 0;
              z-index: 40;
              backdrop-filter: blur(12px);
              background: ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
              border-bottom: ${isDarkMode ? '1px solid rgba(51, 65, 85, 1)' : '1px solid rgba(229, 231, 235, 1)'};
            }

            .logo-container {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
            }

            .logo {
              height: 40px;
              margin-right: 10px;
            }

            .nav-menu {
              display: flex;
              gap: 25px;
            }

            .nav-menu a {
              text-decoration: none;
              color: ${isDarkMode ? '#d1d5db' : '#000'};
              font-size: 16px;
              position: relative;
              cursor: pointer;
              transition: color 0.3s ease;
            }

            .nav-menu a:hover {
              color: ${isDarkMode ? '#3b82f6' : '#2d4ecf'};
            }

            .nav-menu a.active {
              color: #2d4ecf;
            }

            .nav-menu a.active::after {
              content: "";
              display: block;
              width: 25px;
              height: 3px;
              background-color: #2d4ecf;
              margin-top: 5px;
              border-radius: 2px;
              margin-left: auto;
              margin-right: auto;
            }
          `
        }} />

        <header className="header">
          <div className="logo-container">
            <img 
              src="/lovable-uploads/89fde1f2-1f36-4592-986e-b34ca8ce20ee.png" 
              alt="JEX Logo" 
              className="logo" 
            />
          </div>
          <nav className="nav-menu">
            <a onClick={() => setActiveSection('home')}>Home</a>
            <a href="#about">About Us</a>
            <a href="#programs">Programmes</a>
            <a href="#contact">Contact Us</a>
            <a onClick={() => setActiveSection('delivery')} className={activeSection === 'delivery' ? 'active' : ''}>Delivery</a>
            <a onClick={() => setActiveSection('messages')}>Messages</a>
          </nav>
        </header>

        <div className="pt-8">
          <DeliveryBooking isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  if (activeSection === 'messages') {
    return (
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
        {/* Dark Mode Toggle */}
        <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-0.5">
            <Sun className={`h-2 w-2 ${isDarkMode ? 'text-gray-400' : 'text-orange-500'}`} />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-orange-500 scale-[0.4]"
            />
            <Moon className={`h-2 w-2 ${isDarkMode ? 'text-orange-500' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* New Header */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .header {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px 0;
              position: sticky;
              top: 0;
              z-index: 40;
              backdrop-filter: blur(12px);
              background: ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
              border-bottom: ${isDarkMode ? '1px solid rgba(51, 65, 85, 1)' : '1px solid rgba(229, 231, 235, 1)'};
            }

            .logo-container {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
            }

            .logo {
              height: 40px;
              margin-right: 10px;
            }

            .nav-menu {
              display: flex;
              gap: 25px;
            }

            .nav-menu a {
              text-decoration: none;
              color: ${isDarkMode ? '#d1d5db' : '#000'};
              font-size: 16px;
              position: relative;
              cursor: pointer;
              transition: color 0.3s ease;
            }

            .nav-menu a:hover {
              color: ${isDarkMode ? '#3b82f6' : '#2d4ecf'};
            }

            .nav-menu a.active {
              color: #2d4ecf;
            }

            .nav-menu a.active::after {
              content: "";
              display: block;
              width: 25px;
              height: 3px;
              background-color: #2d4ecf;
              margin-top: 5px;
              border-radius: 2px;
              margin-left: auto;
              margin-right: auto;
            }
          `
        }} />

        <header className="header">
          <div className="logo-container">
            <img 
              src="/lovable-uploads/89fde1f2-1f36-4592-986e-b34ca8ce20ee.png" 
              alt="JEX Logo" 
              className="logo" 
            />
          </div>
          <nav className="nav-menu">
            <a onClick={() => setActiveSection('home')}>Home</a>
            <a href="#about">About Us</a>
            <a href="#programs">Programmes</a>
            <a href="#contact">Contact Us</a>
            <a onClick={() => setActiveSection('delivery')}>Delivery</a>
            <a onClick={() => setActiveSection('messages')} className={activeSection === 'messages' ? 'active' : ''}>Messages</a>
          </nav>
        </header>

        <div className="pt-8">
          <MessageViewer isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-slate-900' : 'bg-white'} relative`}>
      {/* Dark Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center space-x-0.5">
          <Sun className={`h-2 w-2 ${isDarkMode ? 'text-gray-400' : 'text-orange-500'}`} />
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            className="data-[state=checked]:bg-orange-500 scale-[0.4]"
          />
          <Moon className={`h-2 w-2 ${isDarkMode ? 'text-orange-500' : 'text-gray-400'}`} />
        </div>
      </div>

      {/* New Header */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 40;
            backdrop-filter: blur(12px);
            background: ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
            border-bottom: ${isDarkMode ? '1px solid rgba(51, 65, 85, 1)' : '1px solid rgba(229, 231, 235, 1)'};
          }

          .logo-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          .logo {
            height: 40px;
            margin-right: 10px;
          }

          .nav-menu {
            display: flex;
            gap: 25px;
          }

          .nav-menu a {
            text-decoration: none;
            color: ${isDarkMode ? '#d1d5db' : '#000'};
            font-size: 16px;
            position: relative;
            cursor: pointer;
            transition: color 0.3s ease;
          }

          .nav-menu a:hover {
            color: ${isDarkMode ? '#3b82f6' : '#2d4ecf'};
          }

          .nav-menu a.active {
            color: #2d4ecf;
          }

          .nav-menu a.active::after {
            content: "";
            display: block;
            width: 25px;
            height: 3px;
            background-color: #2d4ecf;
            margin-top: 5px;
            border-radius: 2px;
            margin-left: auto;
            margin-right: auto;
          }
        `
      }} />

      <header className="header">
        <div className="logo-container">
          <img 
            src="/lovable-uploads/89fde1f2-1f36-4592-986e-b34ca8ce20ee.png" 
            alt="JEX Logo" 
            className="logo" 
          />
        </div>
        <nav className="nav-menu">
          <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about">About Us</a>
          <a href="#programs">Programmes</a>
          <a href="#contact">Contact Us</a>
          <a onClick={() => setActiveSection('delivery')}>Delivery</a>
          <a onClick={() => setActiveSection('messages')}>Messages</a>
        </nav>
      </header>

      {/* Hero Slider - Enhanced for larger screens */}
      <section id="home" className="relative h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900/50 to-slate-900/70"></div>
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop&overlay=gradient&opacity=30" 
            alt="Tech background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-7xl animate-fade-in">
            <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight animate-scale-in">
              {slides[currentSlide].title}
            </h2>
            {slides[currentSlide].subtitle && (
              <p className="text-lg md:text-xl lg:text-3xl xl:text-4xl mb-8 opacity-90 animate-slide-in-right max-w-5xl mx-auto leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.3s'}}>
              {slides[currentSlide].buttons.map((button, index) => (
                <button
                  key={index}
                  className={`px-8 py-4 lg:px-12 lg:py-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg lg:text-xl ${
                    index === 0
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg'
                      : 'border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white backdrop-blur-sm'
                  }`}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                currentSlide === index ? 'bg-orange-500 shadow-lg shadow-orange-500/50' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission and Vision - Enhanced for larger screens */}
      <section className={`py-16 lg:py-24 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            <div className={`text-center transform hover:scale-105 transition-all duration-500 p-8 lg:p-12 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border border-slate-700/50 shadow-2xl' : 'bg-white shadow-xl hover:shadow-2xl'}`}>
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl lg:text-3xl">🎯</span>
              </div>
              <h3 className={`text-3xl lg:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Our Mission</h3>
              <p className={`text-lg lg:text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To connect education and technology with innovative and practical tutoring that enhances tech skills....
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 lg:px-10 lg:py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-lg">
                Learn More
              </button>
            </div>
            <div className={`text-center transform hover:scale-105 transition-all duration-500 p-8 lg:p-12 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border border-slate-700/50 shadow-2xl' : 'bg-white shadow-xl hover:shadow-2xl'}`}>
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl lg:text-3xl">🚀</span>
              </div>
              <h3 className={`text-3xl lg:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Our Vision</h3>
              <p className={`text-lg lg:text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Shaping the future of tech—raising brilliant minds and crafting skilled...
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 lg:px-10 lg:py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 max-w-6xl lg:max-w-7xl text-center">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 animate-fade-in ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>About Us</h2>
          <div className="mb-12 lg:mb-16 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop" 
              alt="About us" 
              className="relative w-full max-w-4xl lg:max-w-5xl mx-auto rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            />
          </div>
          <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto">
            <p className={`text-lg lg:text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              JE Tech Hub, officially launched February 2024, marking a new phase of growth and innovation to deliver top-tier tech solutions while empowering individuals and businesses with industry-leading skills.
            </p>
            <p className={`text-lg lg:text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Having several training programs ongoing and approximately 30 graduates...we believe in nurturing creativity, fostering growth, and equipping our community with practical skills to thrive in the digital era.
            </p>
          </div>
          <div className="mt-10 lg:mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 lg:px-12 lg:py-5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium text-lg lg:text-xl">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-5xl lg:max-w-6xl">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>What We Offer</h2>
          
          <div className="text-center mb-12 lg:mb-16">
            <p className={`text-xl lg:text-2xl font-semibold mb-6 lg:mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Hands-on training and innovative solutions.
            </p>
            <p className={`text-lg lg:text-xl mb-8 lg:mb-10 leading-relaxed max-w-4xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Operating under the umbrella of JE Gadgets, our parent brand, which specializes in gadget sales, repairs, and swaps. We pride ourselves on being a leading tech education center that empowers individuals to transform their ideas into impactful, actionable opportunities.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 lg:px-10 lg:py-4 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg">
              JE Gadgets
            </button>
          </div>

          <div className="text-center">
            <p className={`text-lg lg:text-xl mb-8 lg:mb-10 leading-relaxed max-w-4xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you're an entrepreneur looking to scale, a tech enthusiast eager to explore new frontiers, or someone seeking to upskill, we offer the knowledge, tools, and mentorship to help you thrive in the ever-evolving digital landscape.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 lg:px-10 lg:py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg">
              Join Us
            </button>
          </div>
        </div>
      </section>

      {/* Programs - Enhanced grid for larger screens */}
      <section id="programs" className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 lg:mb-10 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Our Cutting-Edge Programs</h2>
            <p className={`text-lg lg:text-xl max-w-5xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We provide practical experience and expert guidance across various tech-driven fields with several ongoing training programs empower you with the skills you need to excel. Check Out Our advanced IT training, software development courses and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 lg:gap-10">
            {programs.map((program, index) => (
              <div key={index} className={`group rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-4 ${isDarkMode ? 'bg-slate-800 border border-slate-700 hover:border-orange-500/50' : 'bg-gray-50 hover:bg-white hover:shadow-xl'}`}>
                <div className="h-52 lg:h-60 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className={`text-xl lg:text-2xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{program.title}</h3>
                <p className={`mb-6 leading-relaxed text-sm lg:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{program.description}</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 lg:py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 font-medium text-lg">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&h=1080&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center max-w-5xl lg:max-w-6xl relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 lg:mb-10 animate-fade-in">Ready to Elevate Your Skills?</h2>
          <div className="space-y-6 lg:space-y-8 text-lg lg:text-xl leading-relaxed">
            <p>
              Whether you're interested in web development, graphic design, data analysis, or other innovative sectors, our tailored courses equip you with the skills needed to excel in today's fast-paced digital landscape.
            </p>
            <p>
              Our mission goes beyond education—we aim to cultivate a creative, entrepreneurial mindset that prepares you for the future of technology.
            </p>
            <p>
              Join a community of like-minded learners and industry professionals who are passionate about technology and personal growth. Get the skills, mentorship, and resources you need to thrive in today's digital world.
            </p>
          </div>
          <button className="bg-orange-500 text-white px-8 py-3 lg:px-12 lg:py-5 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-lg lg:text-xl mt-8 lg:mt-10">
            Get Started
          </button>
        </div>
      </section>

      {/* Delivery Services */}
      <section className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-5xl lg:max-w-6xl">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Delivery Services</h2>
          
          <div className="text-center mb-12 lg:mb-16">
            <p className={`text-xl lg:text-2xl font-semibold mb-6 lg:mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              We Also Offer reliable delivery services.
            </p>
            <div className="space-y-6 lg:space-y-8 text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Explore the world of logistics and deliveries. Learn how to start and operate a successful delivery business, optimize routes, manage orders, and use digital tools to ensure fast and efficient deliveries for e-commerce, food, and courier services.
              </p>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Whether you are purchasing or whatever—we ensure that everything arrives at your doorstep or your preferred location.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8 lg:mb-12">
            {[
              "Door-To-Door Delivery",
              "Office Delivery", 
              "Food Delivery",
              "Motor Park Pickup",
              "Motor Park Dropoff",
              "Mail Pockets"
            ].map((service, index) => (
              <div key={index} className={`p-4 lg:p-6 rounded-lg shadow text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
                <span className={`font-medium text-sm lg:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setActiveSection('delivery')}
              className="bg-green-600 text-white px-8 py-3 lg:px-10 lg:py-4 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-16 lg:mb-20 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Testimonials</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`rounded-lg p-6 lg:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-gray-50'}`}>
                <p className={`mb-6 leading-relaxed italic text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.text}"
                </p>
                <div className={`border-t pt-4 ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                  <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{testimonial.name}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-3xl lg:max-w-4xl">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Contact Us</h2>
          
          <form onSubmit={handleSubmit} className={`rounded-lg p-8 lg:p-12 shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <label className={`block font-medium mb-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  className={`w-full p-3 lg:p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block font-medium mb-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className={`w-full p-3 lg:p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <label className={`block font-medium mb-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  className={`w-full p-3 lg:p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block font-medium mb-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject</label>
                <input 
                  type="text" 
                  required 
                  className={`w-full p-3 lg:p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            
            <div className="mb-6 lg:mb-8">
              <label className={`block font-medium mb-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea 
                required 
                rows={5}
                className={`w-full p-3 lg:p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-orange-500 text-white py-3 lg:py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-semibold text-lg lg:text-xl"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 lg:py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-t border-slate-700' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">About Us</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                JE Tech Hub is dedicated to empowering individuals with cutting-edge technology skills through hands-on training and innovative solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Quick Links</h3>
              <ul className="space-y-2 lg:space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">Courses</a></li>
                <li><a href="#programs" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">Programs</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Our Services</h3>
              <ul className="space-y-2 lg:space-y-3">
                <li><span className="text-gray-300 text-lg">Software Development</span></li>
                <li><span className="text-gray-300 text-lg">Data Analysis</span></li>
                <li><span className="text-gray-300 text-lg">UI/UX Design</span></li>
                <li><span className="text-gray-300 text-lg">Forex Trading</span></li>
                <li><span className="text-gray-300 text-lg">Graphics & Video</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Open Hours</h3>
              <div className="text-gray-300 space-y-2 lg:space-y-3 text-lg">
                <p>Mondays - Fridays: 8.00-20.00</p>
                <p>Saturdays: 9.00-18.30</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
