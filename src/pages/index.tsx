import ColumnList from '@/components/ColumnList';
import { SortingProvider, useSortingContext } from '@/contexts/sortingContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <SortingProvider>
        <ColumnList />
      </SortingProvider>
    </>
  );
}
