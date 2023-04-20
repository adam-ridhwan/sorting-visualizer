'use client';

import { useSortingContext } from '@/contexts/sortingContext';
import { CSSProperties, useEffect, useState } from 'react';

interface ColumnProps {
  value: number;
}

const Column: React.FC<ColumnProps> = ({ value }) => {
  const { arrayLength } = useSortingContext();
  const [height, setHeight] = useState<number>(0);

  const style: CSSProperties = {
    height: `${(height / arrayLength) * 50}rem`,
    width: '100%',
    backgroundColor: 'steelblue',
    border: '1px solid white',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  useEffect(() => setHeight(value), [value]);

  return (
    <div style={style}>
      <div>{height}</div>
    </div>
  );
};

export default Column;
