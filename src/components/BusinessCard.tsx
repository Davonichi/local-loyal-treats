
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Phone, Star, Gift, Clock } from "lucide-react";

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

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  const getProgressValue = () => {
    if (business.loyaltyType === "Visit-based" && business.currentVisits) {
      return (business.currentVisits / business.rewardThreshold) * 100;
    }
    if (business.loyaltyType === "Points-based" && business.currentPoints) {
      return (business.currentPoints / business.rewardThreshold) * 100;
    }
    return 0;
  };

  const getProgressText = () => {
    if (business.loyaltyType === "Visit-based") {
      return `${business.currentVisits}/${business.rewardThreshold} visits`;
    }
    return `${business.currentPoints}/${business.rewardThreshold} points`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Salon":
        return "bg-pink-100 text-pink-700";
      case "Barbershop":
        return "bg-blue-100 text-blue-700";
      case "Eatery":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-900">{business.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getTypeColor(business.type)}>
                {business.type}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">{business.rating}</span>
              </div>
            </div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
            <Gift className="h-4 w-4 mr-1" />
            View Rewards
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {business.address}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {business.phone}
          </div>
        </div>

        {/* Loyalty Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Progress to next reward</span>
            <span className="text-sm text-gray-600">{getProgressText()}</span>
          </div>
          <Progress value={getProgressValue()} className="h-2" />
          <div className="flex items-center text-sm text-gray-600">
            <Gift className="h-4 w-4 mr-1 text-orange-500" />
            Next reward: {business.nextReward}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Clock className="h-4 w-4 mr-1" />
            Hours
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MapPin className="h-4 w-4 mr-1" />
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
