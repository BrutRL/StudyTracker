import { authorized } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

function ProctectedRoutes({ children }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["authorized"],
    queryFn: () => authorized(),
    retry: false,
  });

  if (isLoading) {
    return (
      <main className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-1000 flex p-5 justify-center items-center h-screen">
        <h1 className="text-4xl font-semibold">Checking your credentials</h1>
      </main>
    );
  }
  if (!data?.ok) {
    return <Navigate to="/login" replace />;
  }
  if (isSuccess) {
    return children;
  }
}

export default ProctectedRoutes;
