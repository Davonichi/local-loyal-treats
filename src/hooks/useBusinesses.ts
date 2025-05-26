
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Business {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  rating: number;
  loyalty_type: string;
  reward_threshold: number;
  next_reward: string;
  current_visits?: number;
  current_points?: number;
}

export const useBusinesses = () => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      return data as Business[];
    },
  });
};
