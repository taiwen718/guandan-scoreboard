import type * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  if (!open) return null;

  if (isMobile) {
    return (
      <div
        role="presentation"
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
        onClick={() => onOpenChange(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onOpenChange(false);
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-h-[90dvh] overflow-y-auto bg-background rounded-t-xl p-6 shadow-lg animate-in slide-in-from-bottom"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="mx-auto w-12 h-1.5 rounded-full bg-muted mb-6" />
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground mb-4">{description}</p>
          )}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") onOpenChange(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-background rounded-xl p-6 shadow-lg animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
