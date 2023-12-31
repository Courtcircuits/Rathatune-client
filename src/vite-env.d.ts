/// <reference types="vite/client" />

declare module "*.svg?react" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_CLIENT_ENDPOINT: string;
}
