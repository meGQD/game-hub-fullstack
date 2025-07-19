import UserLoginForm from "@/features/users/components/UserLoginForm";
import UserRegistrationForm from "@/features/users/components/UserRegistrationForm";
import { Box, Card, Tabs } from "@chakra-ui/react";

const AuthenticationPage = () => {
  return (
    <>
      <Box justifyContent="center" padding={5} maxW="lg" mx="auto">
        <Card.Root>
          <Card.Body>
            <Tabs.Root defaultValue="login" variant="outline">
              <Tabs.List>
                <Tabs.Trigger value="login">Login</Tabs.Trigger>
                <Tabs.Trigger value="signup">SignUp</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="login">
                <UserLoginForm />
              </Tabs.Content>
              <Tabs.Content value="signup">
                <UserRegistrationForm />
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
      </Box>
    </>
  );
};

export default AuthenticationPage;
