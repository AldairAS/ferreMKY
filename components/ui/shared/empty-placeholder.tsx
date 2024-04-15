import React from "react";
import { Button } from "../button";

type EmptyPlaceholderProps = {
  messageTitle: string;
  description: string;
  ctaText?: string;
  icon?: React.ReactNode;
};

export function EmptyPlaceholder({
  messageTitle,
  description,
  ctaText,
  icon,
}: EmptyPlaceholderProps) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {icon}
        <h3 className="mt-4 text-lg font-semibold">{messageTitle}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        {ctaText && (
          <Button size="sm" variant="default">
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
