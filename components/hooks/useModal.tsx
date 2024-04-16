import { useState } from 'react';

const useModal = (initialValue = false): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
};

export default useModal;
