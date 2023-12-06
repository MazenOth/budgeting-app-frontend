import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import apiClient, { CanceledError } from "./services/api-client";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    apiClient.delete("/users/" + user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mazen" };
    setUsers([newUser, ...users]);

    apiClient
      .post("/users", newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setErrors(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id == user.id ? updatedUser : u)));

    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {errors && <Text color="tomato">{errors}</Text>}
      {isLoading && <Spinner />}
      <Button colorScheme="blue" mb={3} onClick={addUser}>
        Add
      </Button>
      <UnorderedList mb={3}>
        {users.map((user) => (
          <Flex minWidth="max-content" alignItems="center">
            <ListItem key={user.id}>
              {user.name} <Spacer />{" "}
              <Button
                colorScheme="blue"
                mx={1}
                onClick={() => updateUser(user)}
              >
                Update
              </Button>
              <Button colorScheme="red" onClick={() => deleteUser(user)}>
                Delete
              </Button>
            </ListItem>
          </Flex>
        ))}
      </UnorderedList>
      <Signup></Signup>
    </>
  );
}

export default App;
