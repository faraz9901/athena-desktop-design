import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface LoaderButtonProps
  extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

export const LoaderButton = React.forwardRef<HTMLButtonElement, LoaderButtonProps>(
  ({ isLoading, loadingText, children, disabled, ...props }, ref) => {
    const content = isLoading ? (
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        {loadingText ?? children}
      </>
    ) : (
      children
    );

    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </Button>
    );
  },
);

LoaderButton.displayName = "LoaderButton";
