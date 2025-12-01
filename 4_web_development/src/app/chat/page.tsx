"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: number;
  sender: "user" | "counselor" | "system";
  content: string;
  timestamp: Date;
  type: "text" | "voice" | "system";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "system",
      content: "Welcome to SALAM secure chat. You've been connected with a trained counselor. This conversation is confidential and encrypted.",
      timestamp: new Date(Date.now() - 300000),
      type: "system"
    },
    {
      id: 2,
      sender: "counselor",
      content: "Hello, I'm here to support you today. How are you feeling right now? Please take your time to share whatever feels comfortable.",
      timestamp: new Date(Date.now() - 240000),
      type: "text"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");
  const [counselorInfo] = useState({
    name: "Dr. Sarah M.",
    type: "Professional",
    specialization: "Trauma Therapy",
    status: "online"
  });
  const [showCrisisOptions, setShowCrisisOptions] = useState(false);
  const [moodLevel, setMoodLevel] = useState<string>("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate counselor response
    setTimeout(() => {
      const counselorResponse: Message = {
        id: messages.length + 2,
        sender: "counselor",
        content: "Thank you for sharing that with me. I can hear that you're going through a difficult time. Your feelings are completely valid. Would you like to talk more about what's been weighing on your mind?",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, counselorResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCrisisSupport = () => {
    setShowCrisisOptions(true);
    const crisisMessage: Message = {
      id: messages.length + 1,
      sender: "system",
      content: "Crisis support has been activated. A mental health professional will join this conversation immediately. Emergency resources are also available.",
      timestamp: new Date(),
      type: "system"
    };
    setMessages(prev => [...prev, crisisMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-2rem)]">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Chat Header */}
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {counselorInfo.name.charAt(0)}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(counselorInfo.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    <div>
                      <div className="font-medium">{counselorInfo.name}</div>
                      <div className="text-sm text-gray-600">
                        {counselorInfo.type} • {counselorInfo.specialization}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      connectionStatus === "connected" ? "bg-green-100 text-green-800" :
                      connectionStatus === "connecting" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {connectionStatus}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Voice Call
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleCrisisSupport}
                    >
                      Crisis Support
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Messages Area */}
            <Card className="flex-1 flex flex-col">
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : message.sender === "system"
                            ? "bg-gray-100 text-gray-800 border border-gray-200"
                            : "bg-white text-gray-800 border border-gray-200"
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here... (Press Enter to send)"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Send
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>This conversation is encrypted and confidential</span>
                    <span>Press Shift+Enter for new line</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Crisis Support Panel */}
            {showCrisisOptions && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">Crisis Support Active</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Emergency Hotline
                  </Button>
                  <Button variant="outline" className="w-full border-red-600 text-red-600">
                    Crisis Resources
                  </Button>
                  <Button variant="outline" className="w-full border-red-600 text-red-600">
                    Professional Escalation
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Mood Check */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Mood Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={moodLevel} onValueChange={setMoodLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="How are you feeling?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="okay">Okay</SelectItem>
                    <SelectItem value="struggling">Struggling</SelectItem>
                    <SelectItem value="crisis">In Crisis</SelectItem>
                  </SelectContent>
                </Select>
                {moodLevel && (
                  <Button size="sm" className="w-full">
                    Update Mood
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Session Type</div>
                  <div className="text-gray-600">Support Chat</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Duration</div>
                  <div className="text-gray-600">23 minutes</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Privacy Level</div>
                  <div className="text-gray-600">Anonymous</div>
                </div>
                <Button variant="outline" className="w-full">
                  Session Notes
                </Button>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full text-left justify-start">
                  Breathing Exercise
                </Button>
                <Button variant="outline" className="w-full text-left justify-start">
                  Grounding Techniques
                </Button>
                <Button variant="outline" className="w-full text-left justify-start">
                  Coping Strategies
                </Button>
                <Button variant="outline" className="w-full text-left justify-start">
                  Emergency Contacts
                </Button>
              </CardContent>
            </Card>

            {/* Session Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Session Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Pause Session
                </Button>
                <Button variant="outline" className="w-full">
                  Request Different Counselor
                </Button>
                <Button variant="outline" className="w-full">
                  Save Conversation
                </Button>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  End Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}