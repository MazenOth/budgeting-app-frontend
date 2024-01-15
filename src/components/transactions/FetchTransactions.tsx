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

const FetchTransactions = () => {
  const { auth } = useAuth();
  const { data } = useTransactions();

  console.log(data);

  return (
    <>
      <Container maxW={"3xl"}>
        <Card mt={"5"} borderRadius={"10"} border={"1px"}>
          <CardBody textAlign={"center"}>
            <Stack divider={<StackDivider />} spacing="4">
              {data?.map((transaction) => (
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Box key={transaction._id}>{transaction.amount}</Box>
                  <Box key={transaction._id}>{transaction.transactionDate}</Box>
                  <Spacer />
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FetchTransactions;
