
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Gift, CheckCircle, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Business {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  rating: number;
  loyaltyType: string;
  rewardThreshold: number;
  currentVisits?: number;
  currentPoints?: number;
  nextReward: string;
}

interface CustomerCheckInProps {
  businesses: Business[];
}

export const CustomerCheckIn = ({ businesses }: CustomerCheckInProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const { toast } = useToast();

  const handleCheckIn = () => {
    if (!phoneNumber || !selectedBusiness) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number and select a business.",
        variant: "destructive",
      });
      return;
    }

    // Simulate check-in process
    setIsCheckedIn(true);
    toast({
      title: "Check-in Successful! 🎉",
      description: "You've earned loyalty points for this visit.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsCheckedIn(false);
      setPhoneNumber("");
      setSelectedBusiness("");
    }, 3000);
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const selectedBusinessData = businesses.find(b => b.id.toString() === selectedBusiness);

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">Customer Check-In</CardTitle>
          <CardDescription>
            Enter your phone number to earn loyalty rewards for your visit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isCheckedIn ? (
            <>
              {/* Phone Number Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="pl-10 bg-white border-orange-200 focus:border-orange-400"
                    maxLength={14}
                  />
                </div>
              </div>

              {/* Business Selection */}
              <div className="space-y-2">
                <Label>Select Business</Label>
                <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                  <SelectTrigger className="bg-white border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Choose the business you're visiting" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <span>{business.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {business.type}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Business Info */}
              {selectedBusinessData && (
                <Card className="bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900">{selectedBusinessData.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {selectedBusinessData.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-orange-100 text-orange-700">
                          {selectedBusinessData.loyaltyType}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">
                          Next: {selectedBusinessData.nextReward}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Check-in Button */}
              <Button
                onClick={handleCheckIn}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3"
                size="lg"
              >
                <Gift className="h-5 w-5 mr-2" />
                Check In & Earn Rewards
              </Button>

              {/* Alternative Check-in Methods */}
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">Or check in with:</p>
                <Button variant="outline" className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR Code
                </Button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-4 py-8">
              <div className="bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Check-in Successful!</h3>
              <p className="text-gray-600">
                You've earned rewards at {selectedBusinessData?.name}
              </p>
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  {selectedBusinessData?.loyaltyType === "Visit-based" 
                    ? "+1 visit added to your loyalty card" 
                    : "+50 points added to your account"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Quick Tips</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Check in each visit to earn loyalty points</li>
            <li>• Your phone number is your loyalty card - no app download needed</li>
            <li>• Ask staff about current promotions and bonus point days</li>
            <li>• Refer friends to earn bonus rewards</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
