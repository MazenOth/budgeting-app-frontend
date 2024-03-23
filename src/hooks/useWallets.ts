import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export interface Wallet {
  _id: string;
  name: string;
  balance: number;
}

const useWallets = () => {
  const { auth } = useAuth();
  return useQuery<Wallet[]>({
    queryKey: ["wallets"],
    queryFn: () =>
      axios
        .get<Wallet[]>("http://localhost:4000/getWallets/" + auth.id)
        .then((res) => res.data),
  });
};

export default useWallets;
