import * as React from "react";
import { Html, Button } from "@react-email/components";

export const Email: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Html lang="en">
      <Button href={url} aria-label="Click">Click me</Button>
    </Html>
  );
};

export default Email;
