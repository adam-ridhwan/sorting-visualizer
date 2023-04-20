import { generateColumns } from '@/lib/generateColumns';
import { shuffle } from '@/lib/utils';
import { createContext, useContext, useState } from 'react';

interface SortingContextType {
  numberArray: number[];
  setNumberArray: React.Dispatch<React.SetStateAction<number[]>>;
  arrayLength: number;
  setArrayLength: React.Dispatch<React.SetStateAction<number>>;
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
}

export const useSortingContext = () => {
  const context = useContext(SortingContext);

  if (context === null) {
    throw new Error('useSortingContext must be used within a SortingProvider');
  }

  return context;
};

export const SortingProvider: React.FC<SortingProviderProps> = ({ children }) => {
  const values = shuffle(generateColumns(50));

  const [numberArray, setNumberArray] = useState<number[]>(values);
  const [arrayLength, setArrayLength] = useState<number>(numberArray.length);
  const [withDelay, setWithDelay] = useState<boolean>(true);
  const [delay, setDelay] = useState<number>(10);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  return (
    <SortingContext.Provider
      value={{
        numberArray,
        setNumberArray,
        arrayLength,
        setArrayLength,
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
