import {
  ListItem,
  UnorderedList,
  HStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Container,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import DeleteWallet from "./DeleteWallet";
import EditWallet from "./EditWallet";
import useWallets, { Wallet } from "../../hooks/useWallets";
import useAuth from "../../hooks/useAuth";

const FetchWallets = () => {
  const { auth } = useAuth();
  const { data } = useWallets();

  return (
    <>
      <Container maxW={"3xl"}>
        <Card mt={"5"} borderRadius={"10"} border={"1px"}>
          <CardBody textAlign={"center"}>
            <Stack divider={<StackDivider />} spacing="4">
              {data?.map((wallet) => (
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Box key={wallet._id}>{wallet.name}</Box>
                  <Spacer />
                  <Box>
                    <EditWallet walletId={wallet._id} />
                    <DeleteWallet walletId={wallet._id} />
                  </Box>
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FetchWallets;
