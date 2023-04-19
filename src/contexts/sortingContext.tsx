import { createContext, useContext, useState } from 'react';

interface SortingContextType {
  numberArray: number[];
  setNumberArray: React.Dispatch<React.SetStateAction<number[]>>;
  isSorting: boolean;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
  delay: number;
  setDelay: React.Dispatch<React.SetStateAction<number>>;
  withDelay: boolean;
  setWithDelay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortingContext = createContext<SortingContextType | null>(null);

interface SortingProviderProps {
  children: React.ReactNode;
  values: number[];
}

export const useSortingContext = () => {
  const context = useContext(SortingContext);

  if (context === null) {
    throw new Error('useSortingContext must be used within a SortingProvider');
  }

  return context;
};

export const SortingProvider: React.FC<SortingProviderProps> = ({ children, values }) => {
  const [numberArray, setNumberArray] = useState<number[]>(values);
  const [withDelay, setWithDelay] = useState<boolean>(true);
  const [delay, setDelay] = useState<number>(1);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  return (
    <SortingContext.Provider
      value={{
        numberArray,
        setNumberArray,
        isSorting,
        setIsSorting,
        delay,
        setDelay,
        withDelay,
        setWithDelay,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};
