"use client";

import OAuth from "@/components/auth/oauth";
import { Card, Divider, CardHeader, CardBody, Input } from "@heroui/react";

export default function LoginCard() {
  return (
    <Card className="border border-default bg-gradient-to-tr from-content1 to-content2">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-lg font-bold">Let's Get Started</h2>
        <p className="text-sm text-default-foreground">
          Pick a sign-in method that works best for you:
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-6 py-10 px-12">
        <OAuth callbackUrl="/" />
        <div className="flex items-center justify-center w-full">
          <div className="flex-grow h-px bg-default rounded-full"></div>
          <span className="px-4 text-default-foreground">or</span>
          <div className="flex-grow h-px bg-default rounded-full"></div>
        </div>
        <Input label="Email" type="email" />
      </CardBody>
    </Card>
  );
}
