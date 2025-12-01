"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TrainingPage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([1, 2]);

  const trainingModules = [
    {
      id: 1,
      title: "Psychological First Aid Basics",
      description: "Learn the fundamental principles of providing immediate psychological support",
      duration: "45 minutes",
      difficulty: "Beginner",
      progress: 100,
      completed: true,
      badge: "First Aid Certified",
      topics: [
        "Understanding psychological first aid",
        "The 5-step PFA model",
        "Creating safety and comfort",
        "Stabilization techniques",
        "Information gathering",
        "Collaborative services",
        "Coping information",
        "Collaborative problem solving"
      ]
    },
    {
      id: 2,
      title: "Active Listening Techniques",
      description: "Master the art of empathetic and effective listening",
      duration: "30 minutes",
      difficulty: "Beginner",
      progress: 100,
      completed: true,
      badge: "Active Listener",
      topics: [
        "Principles of active listening",
        "Non-verbal communication",
        "Reflective responses",
        "Asking open-ended questions",
        "Avoiding judgment",
        "Managing silence",
        "Cultural sensitivity in listening"
      ]
    },
    {
      id: 3,
      title: "Crisis Intervention",
      description: "Learn to identify and respond to mental health crises",
      duration: "60 minutes",
      difficulty: "Intermediate",
      progress: 75,
      completed: false,
      badge: "Crisis Responder",
      topics: [
        "Recognizing crisis situations",
        "Risk assessment techniques",
        "De-escalation strategies",
        "Safety planning",
        "When to escalate to professionals",
        "Documentation requirements",
        "Self-care after crisis intervention"
      ]
    },
    {
      id: 4,
      title: "Cultural Sensitivity & Trauma",
      description: "Understanding diverse cultural perspectives on trauma and healing",
      duration: "40 minutes",
      difficulty: "Intermediate",
      progress: 0,
      completed: false,
      badge: "Cultural Competency",
      topics: [
        "Cultural factors in trauma response",
        "Religious and spiritual considerations",
        "Language barriers and communication",
        "Family dynamics across cultures",
        "Traditional healing practices",
        "Avoiding cultural assumptions",
        "Working with interpreters"
      ]
    },
    {
      id: 5,
      title: "Trauma-Informed Care",
      description: "Comprehensive approach to understanding and responding to trauma",
      duration: "90 minutes",
      difficulty: "Advanced",
      progress: 0,
      completed: false,
      badge: "Trauma Specialist",
      topics: [
        "Understanding trauma and its effects",
        "The neurobiology of trauma",
        "Trauma-informed principles",
        "Secondary trauma prevention",
        "Building resilience",
        "Trauma-specific interventions",
        "Creating trauma-informed environments"
      ]
    },
    {
      id: 6,
      title: "Boundaries & Self-Care",
      description: "Maintaining healthy boundaries while providing support",
      duration: "35 minutes",
      difficulty: "Beginner",
      progress: 0,
      completed: false,
      badge: "Self-Care Advocate",
      topics: [
        "Professional boundaries",
        "Emotional boundaries",
        "Recognizing burnout signs",
        "Self-care strategies",
        "Seeking supervision",
        "Managing difficult cases",
        "Work-life balance"
      ]
    }
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed your first training module", earned: true },
    { id: 2, title: "Active Learner", description: "Completed 3 training modules", earned: true },
    { id: 3, title: "Crisis Ready", description: "Completed crisis intervention training", earned: false },
    { id: 4, title: "Cultural Competent", description: "Completed cultural sensitivity training", earned: false },
    { id: 5, title: "Trauma Informed", description: "Completed all trauma-related modules", earned: false },
    { id: 6, title: "Master Volunteer", description: "Completed all training modules", earned: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartModule = (moduleId: number) => {
    setSelectedModule(moduleId);
    // In a real app, this would navigate to the module content
    console.log("Starting module:", moduleId);
  };

  const handleCompleteModule = (moduleId: number) => {
    setCompletedModules(prev => [...prev, moduleId]);
    // Update progress and award badge
    console.log("Module completed:", moduleId);
  };

  const overallProgress = (completedModules.length / trainingModules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Volunteer Training Center</h1>
          <p className="text-gray-600">Build your skills to provide effective psychological first aid</p>
          
          {/* Overall Progress */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Overall Training Progress</span>
              <span className="text-sm text-gray-600">{completedModules.length}/{trainingModules.length} modules completed</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Training Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trainingModules.map((module) => (
                <Card key={module.id} className={`transition-all hover:shadow-lg ${
                  module.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription className="mt-2">{module.description}</CardDescription>
                      </div>
                      {module.completed && (
                        <Badge className="bg-green-100 text-green-800 ml-2">
                          Completed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4">
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">{module.duration}</span>
                      {module.badge && (
                        <Badge variant="outline" className="text-xs">
                          Earns: {module.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    {/* Topics Preview */}
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Topics Covered:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {module.topics.slice(0, 3).map((topic, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            {topic}
                          </li>
                        ))}
                        {module.topics.length > 3 && (
                          <li className="text-gray-500">
                            +{module.topics.length - 3} more topics
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {module.completed ? (
                        <Button variant="outline" className="flex-1">
                          Review Module
                        </Button>
                      ) : module.progress > 0 ? (
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleStartModule(module.id)}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button 
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleStartModule(module.id)}
                        >
                          Start Module
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Achievements</CardTitle>
                <CardDescription>Track your progress and earn recognition for your dedication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned 
                          ? 'border-yellow-300 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}>
                          <span className="text-2xl">
                            {achievement.earned ? '🏆' : '🔒'}
                          </span>
                        </div>
                        <h3 className={`font-medium mb-2 ${
                          achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && (
                          <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Reference Guides</CardTitle>
                  <CardDescription>Essential resources for volunteers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Crisis Intervention Checklist
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Active Listening Quick Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Cultural Sensitivity Tips
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Self-Care Strategies
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Emergency Contact Numbers
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Learning</CardTitle>
                  <CardDescription>Expand your knowledge with these resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Recommended Reading List
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Video Library
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Webinar Recordings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Case Study Examples
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Professional Development
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support & Supervision</CardTitle>
                  <CardDescription>Get help when you need it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Contact Supervisor
                  </Button>
                  <Button variant="outline" className="w-full">
                    Volunteer Support Group
                  </Button>
                  <Button variant="outline" className="w-full">
                    Ask a Question
                  </Button>
                  <Button variant="outline" className="w-full">
                    Report an Issue
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certification</CardTitle>
                  <CardDescription>Official recognition of your training</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{completedModules.length}/6</div>
                    <div className="text-sm text-blue-700">Modules Completed</div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={completedModules.length < 6}
                  >
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Training Record
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