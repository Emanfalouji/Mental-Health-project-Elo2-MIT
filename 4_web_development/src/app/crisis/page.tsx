"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CrisisPage() {
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [crisisDescription, setCrisisDescription] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "Phone"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, confidential crisis support via text",
      type: "Text"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate life-threatening emergencies",
      type: "Emergency"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse support",
      type: "Phone"
    }
  ];

  const quickCopingStrategies = [
    {
      title: "5-4-3-2-1 Grounding",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      duration: "2-3 minutes"
    },
    {
      title: "Box Breathing",
      description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
      duration: "3-5 minutes"
    },
    {
      title: "Cold Water",
      description: "Splash cold water on your face or hold ice cubes",
      duration: "1-2 minutes"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release each muscle group from toes to head",
      duration: "10-15 minutes"
    }
  ];

  const handleEmergencyConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      // In a real app, this would connect to emergency services
      console.log("Emergency connection initiated");
    }, 3000);
  };

  const handleCrisisChat = () => {
    // In a real app, this would connect to crisis counselors
    console.log("Crisis chat initiated with urgency:", urgencyLevel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Emergency Alert Banner */}
        <div className="mb-6 bg-red-100 border border-red-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-red-800">Crisis Support Center</h2>
              <p className="text-red-700">If you're in immediate danger, please call emergency services immediately.</p>
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.open('tel:911')}
            >
              Call 911
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Immediate Support */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Contacts</CardTitle>
                <CardDescription>Immediate professional support available 24/7</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-red-800">{contact.name}</h3>
                      <Badge className={
                        contact.type === "Emergency" ? "bg-red-100 text-red-800" :
                        contact.type === "Phone" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {contact.type}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-red-600 mb-2">{contact.number}</div>
                    <p className="text-sm text-red-700">{contact.description}</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => window.open(`tel:${contact.number.replace(/\D/g, '')}`)}
                    >
                      Call Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Crisis Chat */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Crisis Chat Support</CardTitle>
                <CardDescription>Connect with a crisis counselor immediately</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    How urgent is your situation?
                  </label>
                  <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate danger - need help now</SelectItem>
                      <SelectItem value="high">High - having thoughts of self-harm</SelectItem>
                      <SelectItem value="medium">Medium - feeling overwhelmed</SelectItem>
                      <SelectItem value="low">Low - need someone to talk to</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Briefly describe what's happening (optional)
                  </label>
                  <Textarea
                    value={crisisDescription}
                    onChange={(e) => setCrisisDescription(e.target.value)}
                    placeholder="This helps us connect you with the right support..."
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={handleCrisisChat}
                  disabled={!urgencyLevel || isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect to Crisis Counselor"}
                </Button>

                <div className="text-xs text-gray-600 text-center">
                  Your conversation will be confidential and secure
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Coping Strategies */}
          <div className="space-y-6">
            {/* Immediate Coping Strategies */}
            <Card>
              <CardHeader>
                <CardTitle>Immediate Coping Strategies</CardTitle>
                <CardDescription>Quick techniques to help you feel more grounded right now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickCopingStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-blue-800">{strategy.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        {strategy.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">{strategy.description}</p>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                      Try This Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety Planning */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Planning</CardTitle>
                <CardDescription>Create a plan for when you're feeling unsafe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Create Personal Safety Plan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Emergency Contact List
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Warning Signs Checklist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Coping Strategies List
                </Button>
              </CardContent>
            </Card>

            {/* Professional Support */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Support</CardTitle>
                <CardDescription>Connect with mental health professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleEmergencyConnect}
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Emergency Professional Consultation"}
                </Button>
                <Button variant="outline" className="w-full">
                  Find Local Crisis Centers
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Urgent Therapy Session
                </Button>
                <Button variant="outline" className="w-full">
                  Mobile Crisis Team
                </Button>
              </CardContent>
            </Card>

            {/* Self-Care Reminders */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Remember</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    You are not alone in this struggle
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    This feeling is temporary and will pass
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Asking for help is a sign of strength
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    You deserve support and care
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Recovery is possible with the right support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h3 className="font-medium text-gray-800">Need immediate help?</h3>
              <p className="text-sm text-gray-600">Professional support is available 24/7</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open('tel:988')}
              >
                Call 988
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('sms:741741?body=HOME')}
              >
                Text Crisis Line
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}