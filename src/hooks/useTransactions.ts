import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export interface Transaction {
  _id: string;
  amount: number;
  transactionDate: Date;
  category: { name: string };
  user: { name: string };
  wallet: { name: string };
}

const useTransactions = () => {
  const { auth } = useAuth();
  return useQuery<Transaction[]>({
    queryKey: ["transactions", auth.walletId],
    queryFn: () =>
      axios
        .get<Transaction[]>(
          "http://localhost:4000/getTransactions/" + auth.walletId
        )
        .then((res) => res.data),
  });
};

export default useTransactions;
