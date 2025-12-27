import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "../api/mockApi";
import { toast } from "sonner";
import { Car } from "@/types";

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: carsApi.getAll,
  });
}

export function useCar(id: string) {
  return useQuery({
    queryKey: ["cars", id],
    queryFn: () => carsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Car, "id" | "createdAt" | "updatedAt">) =>
      carsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Car added successfully");
    },
    onError: () => {
      toast.error("Failed to add car");
    },
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Car> }) =>
      carsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["cars", variables.id] });
      toast.success("Car updated successfully");
    },
    onError: () => {
      toast.error("Failed to update car");
    },
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: string) => carsApi.toggleFeatured(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Featured status updated");
    },
    onError: () => {
      toast.error("Failed to update featured status");
    },
  });
}

export function useToggleAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: string) => carsApi.toggleAvailability(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Availability updated");
    },
    onError: () => {
      toast.error("Failed to update availability");
    },
  });
}
