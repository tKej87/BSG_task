import { FC } from "react";
import LoginForm from "../components/LoginForm";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Page from "../ui/Page";

const SplashPage: FC = () => {
  return (
    <Page>
      <Heading type="main" text="Welcome!" />
      <Modal>
        <LoginForm />
      </Modal>
    </Page>
  );
};

export default SplashPage;
