import { cn } from "@libs";
import { SyntheticEvent, useEffect } from "react";

const Modal = ({
  children,
  isOpen,
  title,
  handleClose,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  className?: string;
}) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalContainerClick = (e: SyntheticEvent) => e.stopPropagation();

  return (
    <div
      className={cn(
        `fixed overflow-auto z-50 top-0 left-0 w-full min-h-screen justify-center items-center inset-0 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-20 ${
          isOpen ? `flex` : `hidden`
        }`,
        className
      )}
      onClick={handleClose}
    >
      <section
        className={`relative w-[90%] md:min-w-[320px] max-w-lg p-5 gap-4 rounded-lg overflow-y-auto min-h-[200px] max-h-[80vh] inset-0 z-50 bg-white dark:bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:rounded-lg duration-200 border shadow-lg`}
        onClick={handleModalContainerClick}
      >
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="font-semibold text-2xl pb-4">{title}</h2>
        </div>
        {/* le agrego el stop propagation porque sino seria como si al hacer click al modal-container tambien le haría click al div principal con la clase modal y cerraria todo */}
        {/* <button
          className={`top-4 right-4 p-2 absolute bg-red-500 rounded-full text-white`}
          onClick={handleClose}
        >
          X
        </button> */}
        {children}
      </section>
    </div>
  );
};

export default Modal;
