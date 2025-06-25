
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`shadow-lg sticky top-0 z-40 transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-b border-slate-700' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="text-center mb-4">
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              JOE EXPRESS TECH HUB
            </h1>
          </div>
          
          {/* Dark Mode Toggle */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <Sun className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-orange-500'}`} />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-orange-500"
              />
              <Moon className={`h-4 w-4 ${isDarkMode ? 'text-orange-500' : 'text-gray-400'}`} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="block">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="#home" className={`font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}`}>
                Home
              </a>
              <a href="#about" className={`font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}`}>
                About Us
              </a>
              <a href="#programs" className={`font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}`}>
                Programs
              </a>
              <a href="#contact" className={`font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}`}>
                Contact Us
              </a>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Contact Now
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Slider */}
      <section id="home" className="relative h-screen bg-gradient-to-r from-slate-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop&overlay=gradient&opacity=30" 
            alt="Tech background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-scale-in">
              {slides[currentSlide].title}
            </h2>
            {slides[currentSlide].subtitle && (
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-in-right">
                {slides[currentSlide].subtitle}
              </p>
            )}
            <div className="space-x-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
              {slides[currentSlide].buttons.map((button, index) => (
                <button
                  key={index}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    index === 0
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                currentSlide === index ? 'bg-orange-500' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission and Vision */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <h3 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Our Mission</h3>
              <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To connect education and technology with innovative and practical tutoring that enhances tech skills....
              </p>
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Learn More
              </button>
            </div>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <h3 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Our Vision</h3>
              <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Shaping the future of tech—raising brilliant minds and crafting skilled...
              </p>
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className={`text-4xl font-bold mb-8 animate-fade-in ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>About Us</h2>
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop" 
              alt="About us" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            JE Tech Hub, officially launched February 2024, marking a new phase of growth and innovation to deliver top-tier tech solutions while empowering individuals and businesses with industry-leading skills.
          </p>
          <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Having several training programs ongoing and approximately 30 graduates...we believe in nurturing creativity, fostering growth, and equipping our community with practical skills to thrive in the digital era.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* What We Offer */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-4xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>What We Offer</h2>
          
          <div className="text-center mb-12">
            <p className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Hands-on training and innovative solutions.
            </p>
            <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Operating under the umbrella of JE Gadgets, our parent brand, which specializes in gadget sales, repairs, and swaps. We pride ourselves on being a leading tech education center that empowers individuals to transform their ideas into impactful, actionable opportunities.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              JE Gadgets
            </button>
          </div>

          <div className="text-center">
            <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you're an entrepreneur looking to scale, a tech enthusiast eager to explore new frontiers, or someone seeking to upskill, we offer the knowledge, tools, and mentorship to help you thrive in the ever-evolving digital landscape.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Join Us
            </button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Our Cutting-Edge Programs</h2>
            <p className={`text-lg max-w-4xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We provide practical experience and expert guidance across various tech-driven fields with several ongoing training programs empower you with the skills you need to excel. Check Out Our advanced IT training, software development courses and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className={`rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-gray-50'}`}>
                <div className="h-48 rounded-lg mb-6 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{program.title}</h3>
                <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{program.description}</p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&h=1080&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-4xl font-bold mb-8 animate-fade-in">Ready to Elevate Your Skills?</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Whether you're interested in web development, graphic design, data analysis, or other innovative sectors, our tailored courses equip you with the skills needed to excel in today's fast-paced digital landscape.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            Our mission goes beyond education—we aim to cultivate a creative, entrepreneurial mindset that prepares you for the future of technology.
          </p>
          <p className="text-lg mb-8 leading-relaxed">
            Join a community of like-minded learners and industry professionals who are passionate about technology and personal growth. Get the skills, mentorship, and resources you need to thrive in today's digital world.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold">
            Get Started
          </button>
        </div>
      </section>

      {/* Delivery Services */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-4xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Delivery Services</h2>
          
          <div className="text-center mb-12">
            <p className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              We Also Offer reliable delivery services.
            </p>
            <p className={`text-lg mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore the world of logistics and deliveries. Learn how to start and operate a successful delivery business, optimize routes, manage orders, and use digital tools to ensure fast and efficient deliveries for e-commerce, food, and courier services.
            </p>
            <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you are purchasing or whatever—we ensure that everything arrives at your doorstep or your preferred location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              "Door-To-Door Delivery",
              "Office Delivery", 
              "Food Delivery",
              "Motor Park Pickup",
              "Motor Park Dropoff",
              "Mail Pockets"
            ].map((service, index) => (
              <div key={index} className={`p-4 rounded-lg shadow text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-16 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-gray-50'}`}>
                <p className={`mb-6 leading-relaxed italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.text}"
                </p>
                <div className={`border-t pt-4 ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                  <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{testimonial.name}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className={`text-4xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Contact Us</h2>
          
          <form onSubmit={handleSubmit} className={`rounded-lg p-8 shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject</label>
                <input 
                  type="text" 
                  required 
                  className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea 
                required 
                rows={5}
                className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-t border-slate-700' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300 leading-relaxed">
                JE Tech Hub is dedicated to empowering individuals with cutting-edge technology skills through hands-on training and innovative solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Courses</a></li>
                <li><a href="#programs" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Programs</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-300">Software Development</span></li>
                <li><span className="text-gray-300">Data Analysis</span></li>
                <li><span className="text-gray-300">UI/UX Design</span></li>
                <li><span className="text-gray-300">Forex Trading</span></li>
                <li><span className="text-gray-300">Graphics & Video</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Open Hours</h3>
              <div className="text-gray-300 space-y-2">
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
