import React, { useRef } from "react";
import { Trash } from "lucide-react";

import { Card, CardContent } from "./card";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const Dropzone = React.forwardRef(
  (
    {
      className,
      classNameWrapper,
      dropMessage,
      handleOnDrop,
      imgPreview,
      handleRemove,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef(null);
    // Function to handle drag over event
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    // Function to handle drop event
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    return (
      <Card
        ref={ref}
        className={cn(
          `h-full border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper,
          imgPreview && "hover:cursor-default hover:border-muted-foreground/0",
        )}
      >
        {imgPreview ? (
          <div className="group relative flex h-full w-full items-center justify-center p-1">
            <div className="absolute right-0 top-0 hidden group-hover:block">
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove();
                }}
              >
                <Trash />
              </Button>
            </div>
            <img className="h-full w-full object-contain" src={imgPreview} />
          </div>
        ) : (
          <CardContent
            className="flex h-full flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            <div className="flex items-center justify-center text-muted-foreground">
              <span className="font-medium">{dropMessage}</span>
              <Input
                {...props}
                value={undefined}
                ref={inputRef}
                type="file"
                className={cn("hidden", className)}
                onChange={(e) => handleOnDrop(e.target.files)}
              />
            </div>
          </CardContent>
        )}
      </Card>
    );
  },
);

Dropzone.displayName = "Dropzone";

export default Dropzone;
