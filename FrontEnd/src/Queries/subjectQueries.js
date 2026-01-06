import { all, count, create } from "../api/subject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const subjectQuery = () =>
  useQuery({
    queryKey: ["subjectData"],
    queryFn: () => all(),
  });

export const subjectQueryCount = () =>
  useQuery({
    queryKey: ["subjectCount"],
    queryFn: () => count(),
  });

export const createSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => create(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        queryClient.invalidateQueries(["subjectData"]);
      } else {
        toast.error(response.message);
      }
    },
  });
};
