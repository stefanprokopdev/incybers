import { LearningProfileProvider } from "@site/src/context/LearningProfileContext";
import Root from "@theme-original/Root";
import React, { JSX } from "react";

export default function RootWrapper(props: React.ComponentProps<typeof Root>): JSX.Element {
  return (
    <LearningProfileProvider>
      <Root {...props} />
    </LearningProfileProvider>
  );
}
