import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export interface Category {
  _id: string;
  name: string;
}

const useCategories = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  return useQuery<Category[]>({
    queryKey: ["categories", auth.walletId],
    queryFn: () =>
      axios
        .get<Category[]>("http://localhost:4000/getCategories/" + auth.walletId)
        .then((res) => res.data),
  });
};

export default useCategories;
