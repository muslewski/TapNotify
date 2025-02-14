import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SignInEmailProps {
  url: string;
  host: string;
}

export const SignInEmail = ({ url, host }: SignInEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Sign in to {host}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Sign in to {host}</Heading>
          <Text style={text}>
            Click the link below to sign in to your account:
          </Text>
          <Link href={url} style={button}>
            Sign in
          </Link>
          <Text style={footer}>
            If you didn&apos;t request this email, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const text = {
  margin: "24px 0",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#484848",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const footer = {
  fontSize: "13px",
  lineHeight: "1.4",
  color: "#9ca299",
  margin: "24px 0",
};

export default SignInEmail;
