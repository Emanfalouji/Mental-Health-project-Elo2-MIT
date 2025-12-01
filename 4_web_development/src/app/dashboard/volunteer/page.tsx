"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function VolunteerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const activeCases = [
    {
      id: 1,
      patientId: "Anonymous_User_123",
      traumaType: "Anxiety",
      urgency: "Medium",
      lastContact: "2 hours ago",
      status: "Active",
      sessionCount: 3
    },
    {
      id: 2,
      patientId: "Survivor_456",
      traumaType: "PTSD",
      urgency: "High",
      lastContact: "30 minutes ago",
      status: "Waiting",
      sessionCount: 1
    }
  ];

  const pendingMatches = [
    {
      id: 3,
      patientId: "Helper_789",
      traumaType: "Depression",
      urgency: "Low",
      matchScore: 95,
      reason: "Similar experience, availability match"
    },
    {
      id: 4,
      patientId: "Anonymous_User_321",
      traumaType: "Grief",
      urgency: "Medium",
      matchScore: 88,
      reason: "Specialization match, timezone compatibility"
    }
  ];

  const trainingModules = [
    { id: 1, title: "Psychological First Aid Basics", progress: 100, completed: true },
    { id: 2, title: "Active Listening Techniques", progress: 100, completed: true },
    { id: 3, title: "Crisis Intervention", progress: 75, completed: false },
    { id: 4, title: "Cultural Sensitivity", progress: 0, completed: false },
    { id: 5, title: "Trauma-Informed Care", progress: 0, completed: false }
  ];

  const weeklyStats = {
    sessionsCompleted: 8,
    hoursVolunteered: 12,
    patientsHelped: 5,
    averageRating: 4.8
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptCase = (caseId: number) => {
    console.log("Accepting case:", caseId);
    // Handle case acceptance logic
  };

  const handleDeclineCase = (caseId: number) => {
    console.log("Declining case:", caseId);
    // Handle case decline logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Volunteer Dashboard</h1>
              <p className="text-gray-600">Making a difference in people's lives</p>
            </div>
            <div className="flex items-center space-x-3">
              <Label htmlFor="availability">Available for new cases</Label>
              <Switch
                id="availability"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Active Cases</CardTitle>
                <CardDescription>People you're currently supporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCases.map((case_) => (
                    <div key={case_.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {case_.patientId.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{case_.patientId}</div>
                            <div className="text-sm text-gray-600">{case_.traumaType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getUrgencyColor(case_.urgency)}>
                            {case_.urgency} Priority
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">{case_.lastContact}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {case_.sessionCount} sessions • Status: {case_.status}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Continue Chat
                          </Button>
                          <Button size="sm" variant="outline">
                            View History
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {activeCases.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No active cases at the moment. New matches will appear here.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending Matches */}
            <Card>
              <CardHeader>
                <CardTitle>New Match Suggestions</CardTitle>
                <CardDescription>People who could benefit from your support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingMatches.map((match) => (
                    <div key={match.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-medium text-sm">
                              {match.patientId.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{match.patientId}</div>
                            <div className="text-sm text-gray-600">{match.traumaType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{match.matchScore}%</div>
                          <div className="text-sm text-gray-600">Match Score</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <Badge className={getUrgencyColor(match.urgency)}>
                          {match.urgency} Priority
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">{match.reason}</p>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleAcceptCase(match.id)}
                        >
                          Accept Match
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeclineCase(match.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {!isAvailable && (
                  <div className="text-center py-4 text-gray-500">
                    You're currently unavailable for new matches. Toggle availability above to receive new cases.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Training Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>Continue your volunteer education</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingModules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{module.title}</span>
                          <span className="text-sm text-gray-600">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                      <div className="ml-4">
                        {module.completed ? (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            {module.progress > 0 ? "Continue" : "Start"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Weekly Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{weeklyStats.sessionsCompleted}</div>
                  <div className="text-sm text-blue-700">Sessions Completed</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.hoursVolunteered}</div>
                  <div className="text-sm text-green-700">Hours Volunteered</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{weeklyStats.patientsHelped}</div>
                  <div className="text-sm text-purple-700">People Helped</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{weeklyStats.averageRating}</div>
                  <div className="text-sm text-yellow-700">Average Rating</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View All Messages
                </Button>
                <Button variant="outline" className="w-full">
                  Update Availability
                </Button>
                <a href="/training">
                  <Button variant="outline" className="w-full">
                    Training Resources
                  </Button>
                </a>
                <Button variant="outline" className="w-full">
                  Volunteer Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gold-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-yellow-800">First Aid Certified</div>
                  <div className="text-sm text-yellow-700">Completed basic training</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">Active Listener</div>
                  <div className="text-sm text-blue-700">10+ successful sessions</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800">Trusted Helper</div>
                  <div className="text-sm text-green-700">4.5+ average rating</div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Volunteer Handbook
                </Button>
                <Button variant="outline" className="w-full">
                  Get Supervisor Help
                </Button>
                <Button variant="outline" className="w-full">
                  Report an Issue
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Emergency Escalation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}