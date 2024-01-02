import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";
import useWalletStore from "../context/store";

export interface Wallet {
  _id: string;
  name: string;
}

const FetchWallets = () => {
  const { walletName } = useWalletStore();

  const { auth } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get<Wallet[]>("http://localhost:4000/getWallets/" + auth.id, {
        signal: controller.signal,
      })
      .then((res) => {
        setWallets(res.data);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const updateWallet = (wallet: Wallet) => {
    setWallets(
      wallets.map((w) =>
        w._id === wallet._id ? { ...w, name: "new name" } : w
      )
    );
    console.log("new", auth.walletName);
  };

  return (
    <>
      <UnorderedList mb={3}>
        {wallets.map((wallet) => (
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
