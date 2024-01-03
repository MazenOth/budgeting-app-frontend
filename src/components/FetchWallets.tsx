import { ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";
import useWallets, { Wallet } from "../hooks/useWallets";
import useAuth from "../hooks/useAuth";

const FetchWallets = () => {
  const { auth } = useAuth();
  const { data } = useWallets();

  return (
    <>
      <UnorderedList mb={3}>
        {data?.map((wallet) => (
          <ListItem key={wallet._id}>
            {wallet.name}{" "}
            <HStack>
              <EditWallet walletId={wallet._id} />
              <DeleteWallet />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default FetchWallets;
