import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";

export interface Wallet {
  _id: string;
  name: string;
}

const FetchWallets = () => {
  const { auth } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    axios
      .get<Wallet[]>("http://localhost:4000/getWallets/" + auth.id)
      .then((res) => {
        setWallets(res.data);
      });
    console.log(wallets);
  }, []);

  return (
    <>
      <UnorderedList mb={3}>
        {wallets.map((wallet) => (
          <ListItem key={wallet._id}>
            {wallet.name}{" "}
            <HStack>
              <EditWallet />
              <DeleteWallet />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default FetchWallets;
