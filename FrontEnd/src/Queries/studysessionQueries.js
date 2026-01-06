import { summary, all, count } from "../api/studysession";
import { useQuery } from "@tanstack/react-query";

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
