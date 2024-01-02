import { ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";
import useWalletStore from "../context/store";
import useWallets, { Wallet } from "../hooks/useWallets";
import useAuth from "../hooks/useAuth";

const FetchWallets = () => {
  // const { walletName } = useWalletStore();
  const { auth } = useAuth();
  const { data } = useWallets();

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
