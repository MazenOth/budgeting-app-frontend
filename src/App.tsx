import Signup from "./components/Signup";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, errors, isLoading, setUsers, setErrors, setLoading } =
    useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mazen" };
    setUsers([newUser, ...users]);

    userService
      .add(newUser)
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

    userService.update(updatedUser).catch((err) => {
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
