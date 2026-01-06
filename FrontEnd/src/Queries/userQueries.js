import { useQuery } from "@tanstack/react-query";
import { specific } from "../api/user";

export const userQuery = () =>
  useQuery({
    queryKey: ["userData"],
    queryFn: () => specific(),
  });
