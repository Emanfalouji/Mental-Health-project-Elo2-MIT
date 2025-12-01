"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const userRoles = [
    {
      id: "patient",
      title: "I Need Support",
      description: "Connect with trained volunteers and mental health professionals",
      features: ["Anonymous or identified support", "Mood tracking", "Crisis support", "Safe communication"],
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "volunteer",
      title: "I Want to Help",
      description: "Become a trained volunteer to support trauma survivors",
      features: ["Psychological first-aid training", "Flexible scheduling", "Peer support", "Community impact"],
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      id: "professional",
      title: "I'm a Professional",
      description: "Licensed mental health professionals providing expert care",
      features: ["Verified credentials", "Structured sessions", "Educational content", "Crisis intervention"],
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const traumaCategories = [
    "PTSD", "Anxiety", "Depression", "Loss & Grief", "Displacement & Homesickness", "Survivor Guilt"
  ];

  const safetyFeatures = [
    {
      title: "AI-Driven Safety",
      description: "Advanced harm detection and crisis intervention protocols"
    },
    {
      title: "Professional Oversight",
      description: "Licensed professionals available for escalation and guidance"
    },
    {
      title: "Encrypted Communications",
      description: "End-to-end encryption ensures complete confidentiality"
    },
    {
      title: "Anonymous Support",
      description: "Option to receive help without revealing your identity"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Safe And Loving Aid for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Minds
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A safe and empathetic environment that connects trauma survivors with mental health professionals 
              and trained volunteers. Anonymous and non-anonymous support options to respect your safety and privacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/auth/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Get Support Now
                </Button>
              </a>
              <a href="/resources">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                  Learn More
                </Button>
              </a>
            </div>

            {/* Crisis Support Banner */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-red-800 font-medium">
                In Crisis? Need immediate help?
              </p>
              <a href="/crisis">
                <Button className="bg-red-600 hover:bg-red-700 text-white mt-2">
                  Emergency Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Can We Help You?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your role to access tailored support and resources designed for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {userRoles.map((role) => (
              <Card 
                key={role.id} 
                className={`${role.color} transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  selectedRole === role.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">{role.title}</CardTitle>
                  <CardDescription className="text-gray-600">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={
                    role.id === "patient" ? "/dashboard/patient" :
                    role.id === "volunteer" ? "/dashboard/volunteer" :
                    "/dashboard/professional"
                  }>
                    <Button className={`w-full ${role.buttonColor} text-white`}>
                      Get Started
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">We Support Various Trauma Types</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides specialized support for different types of trauma and mental health challenges.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {traumaCategories.map((category, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed to provide effective, safe, and accessible mental health support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a8e207f-0489-4142-bd02-c97bcd59ba0b.png" alt="Mood tracking feature icon" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mood Tracking</h3>
              <p className="text-gray-600">Daily emotional check-ins with visual progress tracking and insights.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/da632356-3789-49d5-b1f3-a85d5453a781.png" alt="Secure messaging feature icon" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Communication</h3>
              <p className="text-gray-600">Encrypted messaging and voice chat with trained professionals and volunteers.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/249f5bba-e9fc-49c2-896e-14e1f1c77cff.png" alt="AI matching system icon" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Matching</h3>
              <p className="text-gray-600">AI-powered matching based on trauma type, language, and urgency level.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/35a02a12-639f-4f2f-8cc3-6984ff30da6c.png" alt="Volunteer training feature icon" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Volunteer Training</h3>
              <p className="text-gray-600">Comprehensive psychological first-aid training with certification badges.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0ecd09a6-09d5-44e9-8703-3f2f019fbc63.png" alt="Crisis intervention feature icon" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Crisis Intervention</h3>
              <p className="text-gray-600">24/7 emergency support with immediate professional escalation protocols.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e2097830-d031-4520-92c5-1b6a20333bc9.png" alt="Educational resources feature icon" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Resource Library</h3>
              <p className="text-gray-600">Educational content, coping exercises, and self-help tools for recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Safety is Our Priority</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We implement multiple layers of protection to ensure a safe, confidential, and supportive environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin Your Healing Journey?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of survivors who have found support, healing, and hope through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Start Your Journey
                </Button>
              </a>
              <a href="/training">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Become a Volunteer
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}