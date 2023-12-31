import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import RequireAuth from "./components/RequireAuth";
import MyWallets from "./components/MyWallets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Signin />}></Route>
        <Route path="register" element={<Signup />}></Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="my-wallets" element={<MyWallets />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
