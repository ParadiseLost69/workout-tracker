import { NextPage } from "next";

interface props {}

const SignIn: NextPage = (props): JSX.Element => {
  return (
    <div>
      <form action="">
        <h1>Login</h1>
        <input type="email" placeholder="john@smith.com" />
        <input type="password" placeholder="*****" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default SignIn;
