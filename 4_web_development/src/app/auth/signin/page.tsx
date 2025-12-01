"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignInPage() {
  const [signInType, setSignInType] = useState<"anonymous" | "identified">("identified");
  const [userRole, setUserRole] = useState<string>("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    anonymousId: "",
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log("Sign in:", { signInType, userRole, formData });
    
    // Redirect to appropriate dashboard based on role
    const dashboardUrl = userRole === "patient" ? "/dashboard/patient" :
                        userRole === "volunteer" ? "/dashboard/volunteer" :
                        "/dashboard/professional";
    
    window.location.href = dashboardUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to SALAM</h1>
          <p className="text-gray-600">Safe And Loving Aid for Minds</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle>Sign In to Your Account</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method and user role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* User Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">I am a:</Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient/User seeking support</SelectItem>
                    <SelectItem value="volunteer">Volunteer helper</SelectItem>
                    <SelectItem value="professional">Mental health professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sign-in Type Tabs */}
              <Tabs value={signInType} onValueChange={(value) => setSignInType(value as "anonymous" | "identified")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="identified">With Identity</TabsTrigger>
                  <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
                </TabsList>
                
                <TabsContent value="identified" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="anonymous" className="space-y-4 mt-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Anonymous Access</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Your privacy is protected. We'll create a secure, anonymous session for you.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="anonymousId">Choose a temporary identifier (optional)</Label>
                      <Input
                        id="anonymousId"
                        type="text"
                        placeholder="e.g., Helper123, Survivor456"
                        value={formData.anonymousId}
                        onChange={(e) => handleInputChange("anonymousId", e.target.value)}
                      />
                      <p className="text-xs text-blue-600">
                        This helps us maintain your session. Leave blank for completely anonymous access.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember my session
                </Label>
              </div>

              {/* Crisis Support Notice */}
              {userRole === "patient" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 font-medium">
                    In immediate crisis?
                  </p>
                  <p className="text-xs text-red-700 mb-2">
                    If you're having thoughts of self-harm, please contact emergency services immediately.
                  </p>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    Emergency Support
                  </Button>
                </div>
              )}

              {/* Sign In Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {signInType === "anonymous" ? "Enter Anonymously" : "Sign In"}
              </Button>

              {/* Additional Options */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="/auth/signup" className="text-blue-600 hover:underline">
                    Sign up here
                  </a>
                </p>
                {signInType === "identified" && (
                  <a href="#" className="text-sm text-blue-600 hover:underline block">
                    Forgot your password?
                  </a>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your safety and privacy are our top priorities. All communications are encrypted and confidential.
          </p>
        </div>
      </div>
    </div>
  );
}