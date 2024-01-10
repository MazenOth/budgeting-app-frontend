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
    setAuth({ ...auth, walletId: value });
    console.log(auth.walletId);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
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
        {data?.map((wallet) => (
          <MenuItem
            key={wallet._id}
            onClick={() => handleWalletClick(wallet._id)}
          >
            {wallet.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default WalletsMenu;
