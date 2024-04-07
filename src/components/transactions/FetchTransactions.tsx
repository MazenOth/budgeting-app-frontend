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
import ExcelExport from "./ExcelExport";

const FetchTransactions = () => {
  const { auth } = useAuth();
  const { data } = useTransactions();
  const exported = [];
  for (let i = 0; i < (data?.length || 0); i++) {
    exported.push({
      amount: data?.[i]?.amount,
      date: data?.[i]?.transactionDate,
      user: data?.[i]?.user.name,
      wallet: data?.[i]?.wallet.name,
      category: data?.[i]?.category?.name,
    });
  }

  console.log(data);
  console.log(exported);

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
                <Flex
                  minWidth="max-content"
                  alignItems="center"
                  gap="2"
                  key={transaction._id}
                >
                  <Box>{transaction.category?.name}</Box>
                  <Box>{transaction.amount}</Box>
                  <Box>
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </Box>
                  <Spacer />
                  <Box>
                    <EditTransaction transactionId={transaction._id} />
                    <DeleteTransaction transactionId={transaction._id} />
                  </Box>
                </Flex>
              ))}
              <AddTransaction />
              <ExcelExport data={exported} fileName="Transactions" />
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FetchTransactions;
