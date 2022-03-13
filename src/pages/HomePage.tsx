import { FC, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import Heading from "../ui/Heading";
import Page from "../ui/Page";
import Category from "../components/Category";
import LogoutBtn from "../components/LogoutBtn";

const HomePage: FC = () => {
  const authCtx = useContext(AuthContext);

  const name = authCtx.isGuest ? "Guest" : authCtx.name;

  return (
    <Page>
      <LogoutBtn>
        <Heading text={`Hello, ${name}!`} />
      </LogoutBtn>
      <Heading type="main" text="Your videos library" />
      <Category categoryID={2} />
      <Category categoryID={3} />
      <Category categoryID={4} />
      <Category categoryID={5} />
    </Page>
  );
};

export default HomePage;
