import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import useWallets from "../../hooks/useWallets";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const WalletsMenu = () => {
  const queryClient = useQueryClient();
  const { data } = useWallets();
  const { setAuth, auth } = useAuth();
  const handleWalletClick = (value: string) => {
    const id = value;
    setAuth({ ...auth, walletId: id });
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        mr={"5"}
        variant={"ghost"}
      >
        Wallets
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          defaultValue={auth.walletId}
          title="Select a wallet"
          type="radio"
        >
          {data?.map((wallet) => (
            <MenuItemOption
              value={wallet._id}
              onClick={() => handleWalletClick(wallet._id)}
            >
              {wallet.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default WalletsMenu;
