import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import ColorModeSwitch from "../ColorModeSwitch";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import WalletsMenu from "../wallets/WalletsMenu";

const CategoryNavBar = () => {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      padding={"2"}
      mr={"3"}
    >
      <Box>
        {" "}
        <HStack>
          <IconButton
            aria-label="Search database"
            icon={<ArrowBackIcon />}
            variant={"ghost"}
            onClick={handleClick}
          />
          <Text>My Categories</Text>
        </HStack>
      </Box>
      <Spacer />
      <WalletsMenu />
      <ColorModeSwitch />
    </Flex>
  );
};

export default CategoryNavBar;
