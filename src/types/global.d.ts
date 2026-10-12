/**
 * Global type declarations (Window, etc.)
 */

export {};

declare global {
  interface Window {
    CustomSubstackWidget?: {
      substackUrl?: string;
      placeholder?: string;
      theme?: string;
      colors?: { primary: string; input: string; email: string; text: string };
      buttonText?: string;
    };
  }
}

declare module "@theme/Layout" {
  interface Props {
    noEventBar?: boolean;
    noHeader?: boolean;
  }
}
