
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { useEffect } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  // Handle click outside to dismiss toasts
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toastElements = document.querySelectorAll('[data-sonner-toast]');
      let clickedOutside = true;

      toastElements.forEach((element) => {
        if (element.contains(event.target as Node)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside && toastElements.length > 0) {
        // Dismiss all toasts
        const toastIds = Array.from(toastElements).map(el => el.getAttribute('data-toast-id')).filter(Boolean);
        toastIds.forEach(id => {
          if (id) toast.dismiss(id);
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={5000}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
