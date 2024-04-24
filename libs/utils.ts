import { TypeToast } from "@/models/enums";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const showToast = (
  title: string,
  description: string,
  type: TypeToast
) => {
  switch (type) {
    case TypeToast.SUCCESS:
      toast.success(title, {
        description: description,
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
      break;
    case TypeToast.INFO:
      toast.info(title, {
        description: description,
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
      break;
    case TypeToast.WARNING:
      toast.warning(title, {
        description: description,
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
      break;
    case TypeToast.ERROR:
      toast.error(title, {
        description: description,
        action: {
          label: "Cerrar",
          onClick: () => {},
        },
      });
      break;
    default:
      break;
  }
};
