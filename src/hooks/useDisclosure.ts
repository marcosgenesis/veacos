import { useEffect, useState } from "react";

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    setIsOpen((old) => (old === initialState ? old : initialState));
  }, [initialState]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
