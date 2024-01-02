import axios from "axios";
import useAuth from "../hooks/useAuth";
import { ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";
import useWalletStore from "../context/store";
import { useQuery } from "@tanstack/react-query";

export interface Wallet {
  _id: string;
  name: string;
}

const FetchWallets = () => {
  const { auth } = useAuth();
  // const { walletName } = useWalletStore();

  const { data } = useQuery<Wallet[]>({
    queryKey: ["wallets"],
    queryFn: () =>
      axios
        .get<Wallet[]>("http://localhost:4000/getWallets/" + auth.id)
        .then((res) => res.data),
  });


  const updateWallet = (wallet: Wallet) => {
    data?.map((w) =>
      w._id === wallet._id ? { ...w, name: auth.walletName } : w
    );

    console.log("new", auth.walletName);
  };

  return (
    <>
      <UnorderedList mb={3}>
        {data?.map((wallet) => (
          <ListItem key={wallet._id}>
            {wallet.name}{" "}
            <HStack>
              <EditWallet
                walletId={wallet._id}
                onEdit={() => updateWallet(wallet)}
              />
              <DeleteWallet />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default FetchWallets;
