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
import useCategories from "../../hooks/useCategories";
import AddCategory from "./AddCategory";

const FetchCategories = () => {
  const { auth } = useAuth();
  const { data } = useCategories();

  return (
    <>
      <Container maxW={"3xl"}>
        <Card mt={"5"} borderRadius={"10"} border={"1px"}>
          <CardBody textAlign={"center"}>
            <Stack divider={<StackDivider />} spacing="4">
              {data?.map((category) => (
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Box key={category._id}>{category.name}</Box>
                  <Spacer />
                </Flex>
              ))}
              <AddCategory />
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default FetchCategories;
