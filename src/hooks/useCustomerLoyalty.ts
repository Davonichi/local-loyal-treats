
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCustomerLoyalty = (phoneNumber: string) => {
  return useQuery({
    queryKey: ['customer-loyalty', phoneNumber],
    queryFn: async () => {
      if (!phoneNumber) return [];

      const { data, error } = await supabase
        .from('customer_loyalty')
        .select(`
          *,
          business:businesses(*),
          customer:customers(*)
        `)
        .eq('customer.phone', phoneNumber);

      if (error) {
        console.error('Error fetching customer loyalty:', error);
        throw error;
      }

      return data;
    },
    enabled: !!phoneNumber,
  });
};

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ phoneNumber, businessId }: { phoneNumber: string; businessId: string }) => {
      // First, ensure customer exists
      let { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('phone', phoneNumber)
        .single();

      if (customerError && customerError.code === 'PGRST116') {
        // Customer doesn't exist, create one
        const { data: newCustomer, error: createError } = await supabase
          .from('customers')
          .insert([{ phone: phoneNumber }])
          .select()
          .single();

        if (createError) throw createError;
        customer = newCustomer;
      } else if (customerError) {
        throw customerError;
      }

      // Get business info to determine loyalty type
      const { data: business, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (businessError) throw businessError;

      // Check if loyalty record exists
      let { data: loyalty, error: loyaltyError } = await supabase
        .from('customer_loyalty')
        .select('*')
        .eq('customer_id', customer.id)
        .eq('business_id', businessId)
        .single();

      const pointsToAdd = business.loyalty_type === 'Points-based' ? 50 : 0;
      const visitsToAdd = 1;

      if (loyaltyError && loyaltyError.code === 'PGRST116') {
        // Create new loyalty record
        const { error: createLoyaltyError } = await supabase
          .from('customer_loyalty')
          .insert([{
            customer_id: customer.id,
            business_id: businessId,
            current_visits: visitsToAdd,
            current_points: pointsToAdd,
            total_visits: visitsToAdd,
            total_points: pointsToAdd,
          }]);

        if (createLoyaltyError) throw createLoyaltyError;
      } else if (loyaltyError) {
        throw loyaltyError;
      } else {
        // Update existing loyalty record
        const { error: updateError } = await supabase
          .from('customer_loyalty')
          .update({
            current_visits: loyalty.current_visits + visitsToAdd,
            current_points: loyalty.current_points + pointsToAdd,
            total_visits: loyalty.total_visits + visitsToAdd,
            total_points: loyalty.total_points + pointsToAdd,
          })
          .eq('id', loyalty.id);

        if (updateError) throw updateError;
      }

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([{
          customer_id: customer.id,
          business_id: businessId,
          type: 'check-in',
          points_earned: pointsToAdd,
          visits_added: visitsToAdd,
        }]);

      if (transactionError) throw transactionError;

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-loyalty'] });
    },
  });
};
