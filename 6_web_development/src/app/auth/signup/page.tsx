"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function SignUpPage() {
  const [signUpType, setSignUpType] = useState<"anonymous" | "identified">("identified");
  const [userRole, setUserRole] = useState<string>("patient");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    email: "",
    password: "",
    confirmPassword: "",
    anonymousId: "",
    
    // Patient-specific
    traumaTypes: [] as string[],
    supportPreference: "",
    emergencyContact: "",
    
    // Volunteer-specific
    availability: "",
    communicationMethod: "",
    experience: "",
    
    // Professional-specific
    license: "",
    specialization: "",
    credentials: "",
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    safetyGuidelines: false
  });

  const traumaOptions = [
    "PTSD", "Anxiety", "Depression", "Loss & Grief", 
    "Displacement & Homesickness", "Survivor Guilt", "Other"
  ];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTraumaToggle = (trauma: string) => {
    const current = formData.traumaTypes;
    const updated = current.includes(trauma)
      ? current.filter(t => t !== trauma)
      : [...current, trauma];
    handleInputChange("traumaTypes", updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up:", { signUpType, userRole, formData });
    
    // Redirect to appropriate dashboard based on role
    const dashboardUrl = userRole === "patient" ? "/dashboard/patient" :
                        userRole === "volunteer" ? "/dashboard/volunteer" :
                        "/dashboard/professional";
    
    window.location.href = dashboardUrl;
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Join SALAM</h1>
          <p className="text-gray-600">Create your account to access support and resources</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Step {currentStep} of 3 - {
                currentStep === 1 ? "Basic Information" :
                currentStep === 2 ? "Role-Specific Details" :
                "Privacy & Safety"
              }
            </CardDescription>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* User Role Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="role">I want to join as a:</Label>
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

                  {/* Sign-up Type */}
                  <Tabs value={signUpType} onValueChange={(value) => setSignUpType(value as "anonymous" | "identified")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="identified">With Identity</TabsTrigger>
                      <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="identified" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="anonymous" className="space-y-4 mt-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Anonymous Registration</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Create a secure, anonymous account. Your identity will remain completely private.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="anonymousId">Choose a unique identifier</Label>
                          <Input
                            id="anonymousId"
                            type="text"
                            placeholder="e.g., Helper123, Survivor456"
                            value={formData.anonymousId}
                            onChange={(e) => handleInputChange("anonymousId", e.target.value)}
                            required
                          />
                          <p className="text-xs text-blue-600">
                            This will be your secure identifier. Choose something memorable but not personally identifiable.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Step 2: Role-Specific Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {userRole === "patient" && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">What type of support are you seeking? (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {traumaOptions.map((trauma) => (
                            <div key={trauma} className="flex items-center space-x-2">
                              <Checkbox
                                id={trauma}
                                checked={formData.traumaTypes.includes(trauma)}
                                onCheckedChange={() => handleTraumaToggle(trauma)}
                              />
                              <Label htmlFor={trauma} className="text-sm">{trauma}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supportPreference">Preferred support method</Label>
                        <Select value={formData.supportPreference} onValueChange={(value) => handleInputChange("supportPreference", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How would you like to receive support?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text messaging</SelectItem>
                            <SelectItem value="voice">Voice calls</SelectItem>
                            <SelectItem value="both">Both text and voice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {userRole === "volunteer" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="availability">When are you available to help?</Label>
                        <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="evenings">Evenings</SelectItem>
                            <SelectItem value="flexible">Flexible schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="communicationMethod">Preferred communication method</Label>
                        <Select value={formData.communicationMethod} onValueChange={(value) => handleInputChange("communicationMethod", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How do you prefer to help?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text messaging</SelectItem>
                            <SelectItem value="voice">Voice calls</SelectItem>
                            <SelectItem value="both">Both text and voice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Previous experience (optional)</Label>
                        <Textarea
                          id="experience"
                          placeholder="Tell us about any relevant experience you have..."
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {userRole === "professional" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="license">License Number</Label>
                        <Input
                          id="license"
                          type="text"
                          placeholder="Your professional license number"
                          value={formData.license}
                          onChange={(e) => handleInputChange("license", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Select value={formData.specialization} onValueChange={(value) => handleInputChange("specialization", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trauma">Trauma Therapy</SelectItem>
                            <SelectItem value="ptsd">PTSD Treatment</SelectItem>
                            <SelectItem value="anxiety">Anxiety Disorders</SelectItem>
                            <SelectItem value="depression">Depression</SelectItem>
                            <SelectItem value="grief">Grief Counseling</SelectItem>
                            <SelectItem value="general">General Mental Health</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="credentials">Additional Credentials</Label>
                        <Textarea
                          id="credentials"
                          placeholder="List your relevant certifications, training, and experience..."
                          value={formData.credentials}
                          onChange={(e) => handleInputChange("credentials", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Privacy & Safety */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Privacy & Safety Agreements</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                          required
                        />
                        <div>
                          <Label htmlFor="terms" className="text-sm font-medium">
                            I agree to the Terms of Service
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">
                            By checking this box, you agree to our platform's terms and conditions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacyAccepted}
                          onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked as boolean)}
                          required
                        />
                        <div>
                          <Label htmlFor="privacy" className="text-sm font-medium">
                            I understand the Privacy Policy
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">
                            Your data is encrypted and protected. We never share personal information.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="safety"
                          checked={formData.safetyGuidelines}
                          onCheckedChange={(checked) => handleInputChange("safetyGuidelines", checked as boolean)}
                          required
                        />
                        <div>
                          <Label htmlFor="safety" className="text-sm font-medium">
                            I have read the Safety Guidelines
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">
                            Understanding our safety protocols helps create a secure environment for everyone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crisis Support Notice */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Emergency Support</h4>
                    <p className="text-sm text-red-700 mb-3">
                      If you're in immediate danger or having thoughts of self-harm, please contact emergency services or a crisis hotline immediately.
                    </p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Emergency Resources
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={!formData.termsAccepted || !formData.privacyAccepted || !formData.safetyGuidelines}
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}