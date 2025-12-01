"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const resources = [
    {
      id: 1,
      title: "5-Minute Breathing Exercise",
      description: "A guided breathing exercise to help reduce anxiety and promote relaxation",
      category: "Coping Strategies",
      type: "Audio",
      duration: "5 minutes",
      difficulty: "Beginner",
      tags: ["anxiety", "relaxation", "breathing"],
      rating: 4.8,
      views: 1234
    },
    {
      id: 2,
      title: "Understanding PTSD: A Comprehensive Guide",
      description: "Learn about PTSD symptoms, causes, and treatment options",
      category: "Educational",
      type: "Article",
      duration: "15 minutes",
      difficulty: "Intermediate",
      tags: ["ptsd", "trauma", "education"],
      rating: 4.9,
      views: 2156
    },
    {
      id: 3,
      title: "Grounding Techniques for Panic Attacks",
      description: "Practical techniques to help ground yourself during panic attacks",
      category: "Crisis Support",
      type: "Video",
      duration: "8 minutes",
      difficulty: "Beginner",
      tags: ["panic", "grounding", "emergency"],
      rating: 4.7,
      views: 987
    },
    {
      id: 4,
      title: "Sleep Hygiene for Trauma Survivors",
      description: "Tips and strategies for improving sleep quality after trauma",
      category: "Self-Care",
      type: "Article",
      duration: "10 minutes",
      difficulty: "Beginner",
      tags: ["sleep", "trauma", "recovery"],
      rating: 4.6,
      views: 1567
    },
    {
      id: 5,
      title: "Progressive Muscle Relaxation",
      description: "A guided exercise to release physical tension and stress",
      category: "Coping Strategies",
      type: "Audio",
      duration: "20 minutes",
      difficulty: "Beginner",
      tags: ["relaxation", "stress", "muscle"],
      rating: 4.8,
      views: 1890
    },
    {
      id: 6,
      title: "Dealing with Survivor Guilt",
      description: "Understanding and coping with feelings of survivor guilt",
      category: "Educational",
      type: "Article",
      duration: "12 minutes",
      difficulty: "Intermediate",
      tags: ["guilt", "survivor", "coping"],
      rating: 4.5,
      views: 743
    },
    {
      id: 7,
      title: "Building a Support Network",
      description: "How to identify and build meaningful support relationships",
      category: "Social Support",
      type: "Video",
      duration: "15 minutes",
      difficulty: "Intermediate",
      tags: ["support", "relationships", "community"],
      rating: 4.7,
      views: 1234
    },
    {
      id: 8,
      title: "Emergency Crisis Contacts",
      description: "Important phone numbers and resources for crisis situations",
      category: "Crisis Support",
      type: "Reference",
      duration: "2 minutes",
      difficulty: "Beginner",
      tags: ["emergency", "crisis", "contacts"],
      rating: 4.9,
      views: 3456
    }
  ];

  const categories = [
    "all",
    "Coping Strategies",
    "Educational",
    "Crisis Support",
    "Self-Care",
    "Social Support"
  ];

  const types = [
    "all",
    "Article",
    "Video",
    "Audio",
    "Reference"
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Article": return "📄";
      case "Video": return "🎥";
      case "Audio": return "🎵";
      case "Reference": return "📋";
      default: return "📄";
    }
  };

  const emergencyResources = [
    {
      title: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support"
    },
    {
      title: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text"
    },
    {
      title: "International Association for Suicide Prevention",
      number: "Visit iasp.info",
      description: "Global crisis resources"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resource Library</h1>
          <p className="text-gray-600">Educational content, coping tools, and support resources</p>
        </div>

        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resources">All Resources</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Support</TabsTrigger>
            <TabsTrigger value="tools">Interactive Tools</TabsTrigger>
          </TabsList>

          {/* All Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{resource.duration}</span>
                        <span>⭐ {resource.rating} ({resource.views} views)</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Badge className="bg-blue-100 text-blue-800">
                        {resource.category}
                      </Badge>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          Access Resource
                        </Button>
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No resources found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedType("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Emergency Support Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Crisis Support Resources</CardTitle>
                <CardDescription className="text-red-700">
                  If you're in immediate danger or having thoughts of self-harm, please contact emergency services or use these resources immediately.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyResources.map((resource, index) => (
                    <div key={index} className="p-4 bg-white border border-red-200 rounded-lg">
                      <h3 className="font-medium text-red-800 mb-2">{resource.title}</h3>
                      <div className="text-lg font-bold text-red-600 mb-2">{resource.number}</div>
                      <p className="text-sm text-red-700">{resource.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crisis Coping Strategies</CardTitle>
                  <CardDescription>Immediate techniques for crisis situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    5-4-3-2-1 Grounding Technique
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Box Breathing Exercise
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Crisis Safety Plan Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Emergency Contact Card
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Support</CardTitle>
                  <CardDescription>Connect with mental health professionals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Emergency Professional Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    Find Local Crisis Centers
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Urgent Appointment
                  </Button>
                  <Button variant="outline" className="w-full">
                    Crisis Text Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interactive Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Mood Tracker</CardTitle>
                  <CardDescription>Track your daily emotional state and identify patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Open Mood Tracker
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Breathing Exercise</CardTitle>
                  <CardDescription>Interactive guided breathing for anxiety relief</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Start Breathing Exercise
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Gratitude Journal</CardTitle>
                  <CardDescription>Daily gratitude practice to improve mental wellbeing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Open Journal
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Progressive Relaxation</CardTitle>
                  <CardDescription>Guided muscle relaxation exercise</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Start Relaxation
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Coping Skills Toolkit</CardTitle>
                  <CardDescription>Personalized coping strategies and techniques</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Access Toolkit
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Safety Planning</CardTitle>
                  <CardDescription>Create a personalized crisis safety plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Create Safety Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}