"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";

export default function ProfessionalDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  const todaySchedule = [
    { id: 1, time: "9:00 AM", patient: "Anonymous_User_123", type: "Initial Assessment", duration: "50 min", status: "Confirmed" },
    { id: 2, time: "11:00 AM", patient: "Survivor_456", type: "Follow-up Session", duration: "45 min", status: "Confirmed" },
    { id: 3, time: "2:00 PM", patient: "Helper_789", type: "Crisis Intervention", duration: "60 min", status: "Urgent" },
    { id: 4, time: "4:00 PM", patient: "Anonymous_User_321", type: "Therapy Session", duration: "50 min", status: "Confirmed" }
  ];

  const pendingCases = [
    {
      id: 1,
      patient: "Emergency_Case_001",
      traumaType: "Acute PTSD",
      urgency: "Critical",
      referredBy: "Crisis Hotline",
      timeWaiting: "15 minutes",
      notes: "Recent trauma survivor, needs immediate professional assessment"
    },
    {
      id: 2,
      patient: "Volunteer_Escalation_002",
      traumaType: "Severe Depression",
      urgency: "High",
      referredBy: "Volunteer Sarah K.",
      timeWaiting: "2 hours",
      notes: "Volunteer concerned about patient's safety, requesting professional intervention"
    }
  ];

  const weeklyStats = {
    sessionsCompleted: 24,
    newPatients: 6,
    crisisInterventions: 3,
    averageSessionRating: 4.9,
    hoursWorked: 32
  };

  const recentResources = [
    { id: 1, title: "PTSD Treatment Guidelines", type: "Article", views: 156, lastUpdated: "2 days ago" },
    { id: 2, title: "Anxiety Coping Strategies", type: "Video", views: 89, lastUpdated: "1 week ago" },
    { id: 3, title: "Grief Counseling Techniques", type: "Webinar", views: 234, lastUpdated: "3 days ago" }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Urgent": return "bg-red-100 text-red-800";
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptCase = (caseId: number) => {
    console.log("Accepting case:", caseId);
  };

  const handleScheduleSession = (caseId: number) => {
    console.log("Scheduling session for case:", caseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Professional Dashboard</h1>
          <p className="text-gray-600">Providing expert mental health care and guidance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Critical Cases Alert */}
                {pendingCases.filter(case_ => case_.urgency === "Critical").length > 0 && (
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-red-800">Critical Cases Requiring Immediate Attention</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {pendingCases.filter(case_ => case_.urgency === "Critical").map((case_) => (
                        <div key={case_.id} className="p-4 bg-white border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{case_.patient}</div>
                            <Badge className="bg-red-100 text-red-800">
                              Waiting {case_.timeWaiting}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{case_.notes}</p>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleAcceptCase(case_.id)}
                            >
                              Accept Immediately
                            </Button>
                            <Button size="sm" variant="outline">
                              Refer to Colleague
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Today's Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Your appointments for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaySchedule.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="font-medium text-blue-600">{appointment.time}</div>
                              <div className="text-sm text-gray-600">{appointment.duration}</div>
                            </div>
                            <div>
                              <div className="font-medium">{appointment.patient}</div>
                              <div className="text-sm text-gray-600">{appointment.type}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <div className="mt-2">
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                Start Session
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Performance</CardTitle>
                    <CardDescription>Your impact this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{weeklyStats.sessionsCompleted}</div>
                        <div className="text-sm text-blue-700">Sessions</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{weeklyStats.newPatients}</div>
                        <div className="text-sm text-green-700">New Patients</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{weeklyStats.crisisInterventions}</div>
                        <div className="text-sm text-red-700">Crisis Cases</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{weeklyStats.averageSessionRating}</div>
                        <div className="text-sm text-yellow-700">Avg Rating</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{weeklyStats.hoursWorked}</div>
                        <div className="text-sm text-purple-700">Hours</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Emergency Consultation
                    </Button>
                    <Button variant="outline" className="w-full">
                      View All Cases
                    </Button>
                    <Button variant="outline" className="w-full">
                      Create Resource
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Webinar
                    </Button>
                  </CardContent>
                </Card>

                {/* Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium">Session completed</div>
                      <div className="text-gray-600">Anonymous_User_123 • 2 hours ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Resource published</div>
                      <div className="text-gray-600">"Coping with Anxiety" • 1 day ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Crisis case resolved</div>
                      <div className="text-gray-600">Emergency_Case_005 • 2 days ago</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaySchedule.map((appointment) => (
                      <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{appointment.time}</div>
                            <div className="text-sm text-gray-600">{appointment.patient}</div>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-700 mb-3">
                          {appointment.type} • {appointment.duration}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm">Join Session</Button>
                          <Button size="sm" variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <Button className="w-full mt-4">
                    Schedule New Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Cases</CardTitle>
                <CardDescription>Cases requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingCases.map((case_) => (
                    <div key={case_.id} className={`p-4 border rounded-lg ${getUrgencyColor(case_.urgency)}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium">{case_.patient}</div>
                          <div className="text-sm">{case_.traumaType}</div>
                        </div>
                        <div className="text-right">
                          <Badge className={getUrgencyColor(case_.urgency)}>
                            {case_.urgency} Priority
                          </Badge>
                          <div className="text-sm mt-1">Waiting: {case_.timeWaiting}</div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{case_.notes}</p>
                      <div className="text-sm text-gray-600 mb-3">
                        Referred by: {case_.referredBy}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleAcceptCase(case_.id)}
                        >
                          Accept Case
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleScheduleSession(case_.id)}
                        >
                          Schedule Session
                        </Button>
                        <Button size="sm" variant="outline">
                          Refer to Colleague
                        </Button>
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
                  <CardTitle>Your Published Resources</CardTitle>
                  <CardDescription>Educational content you've created</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentResources.map((resource) => (
                      <div key={resource.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{resource.title}</div>
                          <Badge variant="secondary">{resource.type}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {resource.views} views • Updated {resource.lastUpdated}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">View Stats</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    Create New Resource
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Library</CardTitle>
                  <CardDescription>Browse and contribute to our knowledge base</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Browse All Resources
                  </Button>
                  <Button variant="outline" className="w-full">
                    Upload New Article
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Webinar
                  </Button>
                  <Button variant="outline" className="w-full">
                    Create Video Content
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Professional Guidelines
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