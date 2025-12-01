"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PatientDashboard() {
  const [currentMood, setCurrentMood] = useState<string>("");
  const [moodNote, setMoodNote] = useState<string>("");
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);

  const moodOptions = [
    { value: "excellent", label: "Excellent", color: "bg-green-500", emoji: "😊" },
    { value: "good", label: "Good", color: "bg-blue-500", emoji: "🙂" },
    { value: "okay", label: "Okay", color: "bg-yellow-500", emoji: "😐" },
    { value: "struggling", label: "Struggling", color: "bg-orange-500", emoji: "😔" },
    { value: "crisis", label: "In Crisis", color: "bg-red-500", emoji: "😰" }
  ];

  const recentSessions = [
    { id: 1, date: "2024-01-15", counselor: "Dr. Sarah M.", type: "Professional", duration: "45 min", status: "Completed" },
    { id: 2, date: "2024-01-12", counselor: "Alex K.", type: "Volunteer", duration: "30 min", status: "Completed" },
    { id: 3, date: "2024-01-10", counselor: "Dr. Michael R.", type: "Professional", duration: "50 min", status: "Completed" }
  ];

  const upcomingSessions = [
    { id: 1, date: "2024-01-18", time: "2:00 PM", counselor: "Dr. Sarah M.", type: "Professional" },
    { id: 2, date: "2024-01-20", time: "10:00 AM", counselor: "Jamie L.", type: "Volunteer" }
  ];

  const moodHistory = [
    { date: "Jan 15", mood: "good" },
    { date: "Jan 14", mood: "okay" },
    { date: "Jan 13", mood: "struggling" },
    { date: "Jan 12", mood: "good" },
    { date: "Jan 11", mood: "excellent" },
    { date: "Jan 10", mood: "good" },
    { date: "Jan 9", mood: "okay" }
  ];

  const handleMoodSubmit = () => {
    if (currentMood === "crisis") {
      setShowCrisisSupport(true);
    }
    console.log("Mood submitted:", { mood: currentMood, note: moodNote });
    // Reset form
    setCurrentMood("");
    setMoodNote("");
  };

  const getMoodColor = (mood: string) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption?.color || "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wellness Dashboard</h1>
          <p className="text-gray-600">Track your progress and connect with support</p>
        </div>

        {/* Crisis Support Alert */}
        {showCrisisSupport && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-800">Crisis Support Available</h3>
                <p className="text-red-700">We're here to help. Connect with immediate support.</p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Emergency Chat
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600">
                  Crisis Resources
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Check-in */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Mood Check-in</CardTitle>
                <CardDescription>How are you feeling today?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentMood(mood.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        currentMood === mood.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
                
                {currentMood && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Tell us more about how you're feeling today (optional)..."
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={handleMoodSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Submit Check-in
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your latest support sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{session.counselor}</div>
                        <div className="text-sm text-gray-600">{session.date} • {session.duration}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={session.type === "Professional" ? "default" : "secondary"}>
                          {session.type}
                        </Badge>
                        <div className="text-sm text-green-600 mt-1">{session.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Sessions
                </Button>
              </CardContent>
            </Card>

            {/* Mood History */}
            <Card>
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
                <CardDescription>Your emotional journey over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moodHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{entry.date}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${getMoodColor(entry.mood)}`}></div>
                        <span className="text-sm capitalize">{entry.mood}</span>
                      </div>
                    </div>
                  ))}
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
                <a href="/chat">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start New Chat
                  </Button>
                </a>
                <a href="/resources">
                  <Button variant="outline" className="w-full">
                    Browse Resources
                  </Button>
                </a>
                <Button variant="outline" className="w-full">
                  Join Support Group
                </Button>
                <a href="/crisis">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    I Need Help Now
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800">{session.counselor}</div>
                    <div className="text-sm text-blue-600">{session.date} at {session.time}</div>
                    <Badge variant="secondary" className="mt-2">
                      {session.type}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Schedule New Session
                </Button>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Weekly wellness goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Check-ins</span>
                    <span>5/7</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Support Sessions</span>
                    <span>2/2</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Resource Reading</span>
                    <span>3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Breathing Exercise</h4>
                  <p className="text-sm text-green-700">5-minute guided relaxation</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800">Sleep Hygiene Tips</h4>
                  <p className="text-sm text-purple-700">Improve your rest quality</p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Coping Strategies</h4>
                  <p className="text-sm text-yellow-700">Tools for difficult moments</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}