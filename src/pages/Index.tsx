
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoCarousel from "@/components/AutoCarousel";
import { ArrowRight, Code, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  const programs = [
    {
      title: "Full Stack Development",
      description: "Master both frontend and backend technologies with focus on React, Node.js, and modern databases. Learn to build complete web applications that serve Nigerian businesses.",
      duration: "6 months",
      level: "Intermediate",
      images: [
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ]
    },
    {
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications for Android and iOS. Focus on apps that solve real Nigerian problems like fintech, agriculture, and e-commerce.",
      duration: "4 months",
      level: "Beginner",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ]
    },
    {
      title: "Data Science & Analytics",
      description: "Learn Python, machine learning, and data visualization to extract insights from data. Work on projects using Nigerian datasets and solve local business challenges.",
      duration: "5 months",
      level: "Advanced",
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AutoCarousel 
          images={heroImages} 
          alt="Tech Hub Nigeria Hero"
          className="absolute inset-0 w-full h-full"
          interval={6000}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-left text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your Future with
            <span className="block text-blue-600 bg-white px-4 py-2 rounded-lg inline-block mt-4">
              Tech Skills
            </span>
          </h1>
          <p className="text-left text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl opacity-90">
            Join Nigeria's leading tech training hub and master the skills that will power the next generation of African innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/delivery">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg">
                Book Delivery Service
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose TechHub Nigeria?
            </h2>
            <p className="text-left text-lg text-gray-600 max-w-3xl">
              We're committed to building Nigeria's tech ecosystem through world-class training and mentorship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Industry-Ready Skills",
                description: "Learn technologies that Nigerian companies are actively hiring for, from fintech to e-commerce."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Nigerian Mentors",
                description: "Get guidance from successful Nigerian developers working at top tech companies locally and globally."
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Job Placement Support",
                description: "Access our network of partner companies across Lagos, Abuja, and other tech hubs in Nigeria."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-blue-900 text-white rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-left text-lg text-gray-600 max-w-3xl">
              Comprehensive programs designed for the Nigerian tech landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <AutoCarousel 
                    images={program.images} 
                    alt={program.title}
                    interval={6000}
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{program.duration}</Badge>
                    <Badge variant={program.level === 'Beginner' ? 'default' : program.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                      {program.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {program.description}
                  </CardDescription>
                  <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-left text-lg sm:text-xl mb-8 opacity-90">
            Join thousands of Nigerians who have transformed their careers through our programs. Your future in tech starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 text-lg">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechHub Nigeria</h3>
              <p className="text-gray-400">
                Empowering Nigeria's next generation of tech leaders.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Full Stack Development</li>
                <li>Mobile App Development</li>
                <li>Data Science</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechHub Nigeria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
