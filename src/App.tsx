import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import axios, { CanceledError } from "axios";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

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

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
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
  return (
    <>
      {errors && <Text color="tomato">{errors}</Text>}
      {isLoading && <Spinner />}
      <UnorderedList mb={3}>
        {users.map((user) => (
          <ListItem key={user.id}>{user.name}</ListItem>
        ))}
      </UnorderedList>
      <Signup></Signup>
    </>
  );
}

export default App;
