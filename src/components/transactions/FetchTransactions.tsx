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
import useAuth from "../../hooks/useAuth";
import useTransactions from "../../hooks/useTransactions";
import EditTransaction from "./EditTransaction";
import DeleteTransaction from "./DeleteTransaction";
import AddTransaction from "./AddTransaction";

const FetchTransactions = () => {
  const { auth } = useAuth();
  const { data } = useTransactions();

  console.log(data);

  return (
    <>
      <Container maxW={"3xl"}>
        <Card mt={"5"} borderRadius={"10"} border={"1px"}>
          <CardHeader textAlign="center">
            <Heading size="md">Recent Transactions</Heading>
          </CardHeader>
          <CardBody textAlign={"center"}>
            <Stack divider={<StackDivider />} spacing="4">
              {data?.map((transaction) => (
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Box key={transaction._id}>{transaction.category.name}</Box>
                  <Box key={transaction._id}>{transaction.amount}</Box>
                  <Box key={transaction._id}>{transaction.transactionDate}</Box>
                  <Spacer />
                  <Box>
                    <EditTransaction transactionId={transaction._id} />
                    <DeleteTransaction transactionId={transaction._id} />
                  </Box>
                </Flex>
              ))}
              <AddTransaction />
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FetchTransactions;
