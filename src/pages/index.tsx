import ColumnList from '@/components/ColumnList';
import { SortingProvider } from '@/contexts/sortingContext';
import { generateColumns } from '@/lib/generateColumns';
import { shuffle } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const columns = shuffle(generateColumns(50));

  return (
    <>
      <SortingProvider values={columns}>
        <ColumnList values={[]} />
      </SortingProvider>
    </>
  );
}
