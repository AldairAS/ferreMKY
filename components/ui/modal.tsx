import { SyntheticEvent, useEffect } from 'react';

const Modal = ({
  children,
  isOpen,
  handleClose
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    });
  }, []);

  const handleModalContainerClick = (e: SyntheticEvent) => e.stopPropagation();

  return (
    <div
      className={`fixed overflow-auto z-50 top-0 left-0 w-full min-h-screen justify-center items-center inset-0 bg-neutral-800 bg-opacity-10 ${
        isOpen ? `flex` : `hidden`
      }`}
      onClick={handleClose}
    >
      <section
        className={`relative p-8 min-w-[320px] max-w-[640px] bg-black rounded-lg overflow-y-auto min-h-[200px] max-h-[80vh]`}
        onClick={handleModalContainerClick}
      >
        {/* le agrego el stop propagation porque sino seria como si al hacer click al modal-container tambien le haría click al div principal con la clase modal y cerraria todo */}
        <button
          className={`top-4 right-4 p-2 absolute bg-red-500 rounded-full text-white`}
          onClick={handleClose}
        >
          X
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;
