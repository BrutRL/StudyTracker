import { all, count, create, update, destroy, progress } from "../api/subject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const subjectQuery = () =>
  useQuery({
    queryKey: ["subjectData"],
    queryFn: () => all(),
  });

export const progressQuery = () =>
  useQuery({
    queryKey: ["progress"],
    queryFn: () => progress(),
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

export const deleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => destroy(id),
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

export const updateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => update(id, body),
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
