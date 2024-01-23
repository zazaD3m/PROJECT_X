import * as React from "react";

import { cn } from "../../lib/utils";

const Container = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-6 py-6 lg:px-8 2xl:px-96", className)}
    {...props}
  />
));
Container.displayName = "Container";

const ContainerHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-end justify-between", className)}
    {...props}
  />
));
ContainerHeader.displayName = "ContainerHeader";

const ContainerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-center text-3xl lg:text-left", className)}
    {...props}
  />
));
ContainerTitle.displayName = "ContainerTitle";

const ContainerContent = React.forwardRef(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "rounded-lg border bg-card p-4 text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
ContainerContent.displayName = "ContainerContent";

export { Container, ContainerHeader, ContainerTitle, ContainerContent };
