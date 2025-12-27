import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "../api/mockApi";
import { toast } from "sonner";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: paymentsApi.getAll,
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => paymentsApi.getById(id),
    enabled: !!id,
  });
}

export function usePaymentByOrder(orderId: string) {
  return useQuery({
    queryKey: ["payments", "order", orderId],
    queryFn: () => paymentsApi.getByOrderId(orderId),
    enabled: !!orderId,
  });
}

export function useInitiateRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      amount,
    }: {
      paymentId: string;
      amount: number;
    }) => paymentsApi.initiateRefund(paymentId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Refund initiated successfully");
    },
    onError: () => {
      toast.error("Failed to initiate refund");
    },
  });
}
