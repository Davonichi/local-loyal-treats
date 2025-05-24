
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Gift, Users, TrendingUp } from "lucide-react";
import { BusinessCard } from "@/components/BusinessCard";
import { CustomerCheckIn } from "@/components/CustomerCheckIn";
import { LoyaltyDashboard } from "@/components/LoyaltyDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [userPhone, setUserPhone] = useState("");

  // Mock data for demonstration
  const businesses = [
    {
      id: 1,
      name: "Bella's Hair Studio",
      type: "Salon",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8,
      loyaltyType: "Visit-based",
      rewardThreshold: 10,
      currentVisits: 7,
      nextReward: "Free haircut"
    },
    {
      id: 2,
      name: "Tony's Barbershop",
      type: "Barbershop",
      address: "456 Oak Ave, Midtown",
      phone: "(555) 234-5678",
      rating: 4.9,
      loyaltyType: "Points-based",
      rewardThreshold: 500,
      currentPoints: 350,
      nextReward: "$20 off service"
    },
    {
      id: 3,
      name: "Mama Rosa's Café",
      type: "Eatery",
      address: "789 Pine St, Historic District",
      phone: "(555) 345-6789",
      rating: 4.7,
      loyaltyType: "Visit-based",
      rewardThreshold: 8,
      currentVisits: 3,
      nextReward: "Free lunch combo"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Local Rewards</h1>
                <p className="text-sm text-gray-600">Loyalty that pays back</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              <Users className="h-3 w-3 mr-1" />
              {businesses.length} Businesses
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-2 bg-white/60 backdrop-blur-sm p-1 rounded-xl">
          <Button
            variant={activeTab === "discover" ? "default" : "ghost"}
            onClick={() => setActiveTab("discover")}
            className="flex-1"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Discover
          </Button>
          <Button
            variant={activeTab === "checkin" ? "default" : "ghost"}
            onClick={() => setActiveTab("checkin")}
            className="flex-1"
          >
            <Phone className="h-4 w-4 mr-2" />
            Check In
          </Button>
          <Button
            variant={activeTab === "rewards" ? "default" : "ghost"}
            onClick={() => setActiveTab("rewards")}
            className="flex-1"
          >
            <Star className="h-4 w-4 mr-2" />
            My Rewards
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {activeTab === "discover" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg">Find Local Businesses</CardTitle>
                <CardDescription>
                  Discover salons, barbershops, and eateries with loyalty rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search by name or location..."
                  className="bg-white border-orange-200 focus:border-orange-400"
                />
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Total Rewards</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <Gift className="h-8 w-8 text-orange-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Points Earned</p>
                      <p className="text-2xl font-bold">1,250</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-pink-400 to-red-400 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100">Visits This Month</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Users className="h-8 w-8 text-pink-100" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Listings */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Local Businesses</h2>
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "checkin" && (
          <CustomerCheckIn businesses={businesses} />
        )}

        {activeTab === "rewards" && (
          <LoyaltyDashboard businesses={businesses} userPhone={userPhone} />
        )}
      </main>
    </div>
  );
};

export default Index;
