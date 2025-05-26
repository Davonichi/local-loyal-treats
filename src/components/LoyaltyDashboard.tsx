
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, Calendar, TrendingUp, Award, Clock } from "lucide-react";
import { Business } from "@/hooks/useBusinesses";

interface LoyaltyDashboardProps {
  businesses: Business[];
  userPhone: string;
}

export const LoyaltyDashboard = ({ businesses }: LoyaltyDashboardProps) => {
  // Mock user data
  const totalPoints = businesses.reduce((sum, business) => 
    sum + (business.current_points || 0), 0
  );
  
  const totalVisits = businesses.reduce((sum, business) => 
    sum + (business.current_visits || 0), 0
  );

  const availableRewards = businesses.filter(business => {
    if (business.loyalty_type === "Visit-based") {
      return (business.current_visits || 0) >= business.reward_threshold;
    }
    return (business.current_points || 0) >= business.reward_threshold;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Points</p>
                <p className="text-2xl font-bold">{totalPoints}</p>
              </div>
              <Star className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Visits</p>
                <p className="text-2xl font-bold">{totalVisits}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Available Rewards</p>
                <p className="text-2xl font-bold">{availableRewards.length}</p>
              </div>
              <Gift className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-pink-400 to-red-400 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Member Since</p>
                <p className="text-lg font-bold">Jan 2024</p>
              </div>
              <Award className="h-8 w-8 text-pink-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Rewards */}
      {availableRewards.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Ready to Redeem! 🎉
            </CardTitle>
            <CardDescription>
              You have {availableRewards.length} reward(s) ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableRewards.map((business) => (
              <div key={business.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                <div>
                  <h4 className="font-semibold text-gray-900">{business.name}</h4>
                  <p className="text-sm text-gray-600">{business.next_reward}</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Redeem Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Loyalty Progress */}
      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Your Loyalty Progress
          </CardTitle>
          <CardDescription>
            Track your progress at each business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {businesses.map((business) => {
            const progress = business.loyalty_type === "Visit-based" 
              ? ((business.current_visits || 0) / business.reward_threshold) * 100
              : ((business.current_points || 0) / business.reward_threshold) * 100;
              
            const progressText = business.loyalty_type === "Visit-based"
              ? `${business.current_visits || 0}/${business.reward_threshold} visits`
              : `${business.current_points || 0}/${business.reward_threshold} points`;

            return (
              <div key={business.id} className="space-y-3 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{business.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{business.type}</Badge>
                      <span className="text-sm text-gray-600">{progressText}</span>
                    </div>
                  </div>
                  <Badge className={progress >= 100 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                    {progress >= 100 ? "Ready!" : "In Progress"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next reward: {business.next_reward}</span>
                    <span className="text-gray-500">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Check-in at Tony's Barbershop</p>
                <p className="text-sm text-gray-600">Earned 50 points • 2 days ago</p>
              </div>
              <Badge variant="secondary">+50 pts</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Redeemed reward at Bella's Hair Studio</p>
                <p className="text-sm text-gray-600">Free haircut • 1 week ago</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Redeemed</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Check-in at Mama Rosa's Café</p>
                <p className="text-sm text-gray-600">Visit #3 recorded • 1 week ago</p>
              </div>
              <Badge variant="secondary">+1 visit</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
