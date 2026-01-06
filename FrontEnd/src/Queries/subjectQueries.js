import { all, count } from "../api/subject";
import { useQuery } from "@tanstack/react-query";
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
