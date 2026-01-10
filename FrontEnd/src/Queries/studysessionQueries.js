import { toast } from "sonner";
import { summary, all, count, create } from "../api/studysession";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const summaryQuery = () =>
  useQuery({
    queryKey: ["summaryData"],
    queryFn: () => summary(),
  });

export const allSessionQuery = () =>
  useQuery({
    queryKey: ["sessionLogs"],
    queryFn: () => all(),
  });

export const sessionCount = () =>
  useQuery({
    queryKey: ["sessionCount"],
    queryFn: () => count(),
  });

export const createSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => create(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["sessionLogs"]);
      } else {
        toast.error(response.message);
      }
    },
  });
};
