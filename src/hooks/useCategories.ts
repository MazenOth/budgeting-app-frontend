import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export interface Category {
  _id: string;
  name: string;
}

const useCategories = () => {
  const { auth } = useAuth();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get<Category[]>(
          "http://localhost:4000/getCategories/" + "65868ae22dc774a0ae8081aa"
        )
        .then((res) => res.data),
  });
};

export default useCategories;
