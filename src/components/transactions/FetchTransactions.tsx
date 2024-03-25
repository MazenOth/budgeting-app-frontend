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
  const exportedData = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    // Add more data as needed
  ];
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
                <Flex
                  minWidth="max-content"
                  alignItems="center"
                  gap="2"
                  key={transaction._id}
                >
                  <Box>{transaction.category.name}</Box>
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
              <ExcelExport
                data={data ? data : exportedData}
                fileName="New File"
              />
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FetchTransactions;
