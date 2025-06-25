
import React, { useState, useEffect } from 'react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      description: "Learn to build responsive and dynamic websites using modern technologies like HTML, CSS, JavaScript, and frameworks. Whether you want to create personal blogs, business websites, or complex web applications, our courses will equip you with the skills to succeed in the tech industry."
    },
    {
      title: "Video Editing and Graphics Design",
      description: "Unleash your creativity by mastering both video editing and graphic design. Learn to transform raw footage into professional-quality videos using industry-standard software like Adobe Premiere Pro and DaVinci Resolve. At the same time, develop skills in graphic design with tools like Photoshop, Illustrator, and Canva to create eye-catching logos, posters, social media content, and marketing materials."
    },
    {
      title: "Data Analysis",
      description: "Turn data into insights and make data-driven decisions. Learn how to use tools like Excel, Python, SQL, and Power BI to analyze and visualize data, helping businesses and organizations optimize their performance."
    },
    {
      title: "Forex Trading",
      description: "Discover how to trade the global financial markets and make informed investment decisions. Learn the fundamentals of forex trading, technical and fundamental analysis, risk management, and strategies to become a successful trader."
    },
    {
      title: "UI/UX Design",
      description: "Master the art of creating user-friendly and visually appealing interfaces. Learn the principles of user experience (UX) and user interface (UI) design using tools like Figma and Adobe XD to craft intuitive and engaging digital experiences."
    },
    {
      title: "Gadget Repairs & Sales",
      description: "Top-Quality Gadgets, or reliable repair services? We offer a wide range of mobile devices, accessories and tech essentials at unbeatable prices... Whether you need a brand-new, high-performance gadget or expert repairs for your damaged device, We are ready to assist."
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
      <div className="preloader fixed inset-0 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 animate-pulse">JOE EXPRESS</h1>
          <h2 className="text-3xl font-light animate-pulse">TECH HUB</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-blue-600">JOE EXPRESS TECH HUB</h1>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden text-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Menu
            </button>
          </div>

          {/* Navigation */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mt-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About Us</a>
              <a href="#programs" className="text-gray-700 hover:text-blue-600 font-medium">Programs</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact Us</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Now
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Slider */}
      <section id="home" className="relative h-screen bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h2>
            {slides[currentSlide].subtitle && (
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {slides[currentSlide].subtitle}
              </p>
            )}
            <div className="space-x-4">
              {slides[currentSlide].buttons.map((button, index) => (
                <button
                  key={index}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    index === 0
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
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
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To connect education and technology with innovative and practical tutoring that enhances tech skills....
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Shaping the future of tech—raising brilliant minds and crafting skilled...
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            JE Tech Hub, officially launched February 2024, marking a new phase of growth and innovation to deliver top-tier tech solutions while empowering individuals and businesses with industry-leading skills.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Having several training programs ongoing and approximately 30 graduates...we believe in nurturing creativity, fostering growth, and equipping our community with practical skills to thrive in the digital era.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
          
          <div className="text-center mb-12">
            <p className="text-xl font-semibold text-gray-800 mb-6">
              Hands-on training and innovative solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Operating under the umbrella of JE Gadgets, our parent brand, which specializes in gadget sales, repairs, and swaps. We pride ourselves on being a leading tech education center that empowers individuals to transform their ideas into impactful, actionable opportunities.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              JE Gadgets
            </button>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're an entrepreneur looking to scale, a tech enthusiast eager to explore new frontiers, or someone seeking to upskill, we offer the knowledge, tools, and mentorship to help you thrive in the ever-evolving digital landscape.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Join Us
            </button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Cutting-Edge Programs</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We provide practical experience and expert guidance across various tech-driven fields with several ongoing training programs empower you with the skills you need to excel. Check Out Our advanced IT training, software development courses and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-6"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">Ready to Elevate Your Skills?</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Whether you're interested in web development, graphic design, data analysis, or other innovative sectors, our tailored courses equip you with the skills needed to excel in today's fast-paced digital landscape.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            Our mission goes beyond education—we aim to cultivate a creative, entrepreneurial mindset that prepares you for the future of technology.
          </p>
          <p className="text-lg mb-8 leading-relaxed">
            Join a community of like-minded learners and industry professionals who are passionate about technology and personal growth. Get the skills, mentorship, and resources you need to thrive in today's digital world.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Get Started
          </button>
        </div>
      </section>

      {/* Delivery Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Delivery Services</h2>
          
          <div className="text-center mb-12">
            <p className="text-xl font-semibold text-gray-800 mb-6">
              We Also Offer reliable delivery services.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Explore the world of logistics and deliveries. Learn how to start and operate a successful delivery business, optimize routes, manage orders, and use digital tools to ensure fast and efficient deliveries for e-commerce, food, and courier services.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
              <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h2>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea 
                required 
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
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
                <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Courses</a></li>
                <li><a href="#programs" className="text-gray-300 hover:text-white">Programs</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
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
