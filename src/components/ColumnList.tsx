import { useSortingContext } from '@/contexts/sortingContext';
import { shuffle, sleep } from '@/lib/utils';
import { useEffect } from 'react';
import Column from './Column';

interface ColumnListProps {
  values: number[];
}

const ColumnList: React.FC<ColumnListProps> = ({ values }) => {
  // Access the sorting context object
  const { numberArray, setNumberArray, isSorting, setIsSorting, delay, setDelay, withDelay, setWithDelay } = useSortingContext();

  /**
   * Asynchronously sorts an array of numbers using the Bubble Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   */
  const bubbleSort = async () => {
    setIsSorting(true);

    const n = numberArray.length;

    console.log(numberArray);

    let numberOfAccesses = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (numberArray[j] > numberArray[j + 1]) {
          numberOfAccesses++;
          const temp = numberArray[j];
          numberArray[j] = numberArray[j + 1];
          numberArray[j + 1] = temp;

          if (withDelay) await sleep(delay);

          setNumberArray([...numberArray]);
        }
      }
    }
    setIsSorting(false);
  };

  /**
   * Asynchronously sorts an array of numbers using the Insertion Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   */
  const insertionSort = async () => {
    setIsSorting(true);

    const n = numberArray.length;

    for (let i = 1; i < n; i++) {
      let key = numberArray[i];
      let j = i - 1;

      while (j >= 0 && numberArray[j] > key) {
        numberArray[j + 1] = numberArray[j];
        j--;

        if (withDelay) await sleep(delay);

        setNumberArray([...numberArray]);
      }

      numberArray[j + 1] = key;

      if (withDelay) await sleep(delay);

      setNumberArray([...numberArray]);
    }
    setIsSorting(false);
  };

  /**
   * Asynchronously partitions an array by selecting a pivot element and
   * placing all elements smaller than the pivot to its left and all elements
   * greater than the pivot to its right. The function returns the index of
   * the pivot element after partitioning.
   *
   * @param array The array to be partitioned.
   * @param low The starting index of the partition.
   * @param high The ending index of the partition.
   * @returns The index of the pivot element after partitioning.
   */
  const partition = async (array: number[], low: number, high: number) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];

        if (withDelay) await sleep(delay);

        setNumberArray([...array]);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
  };

  /**
   * Asynchronously sorts an array of numbers using the Quick Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   *
   * @param array The array to be sorted.
   * @param low The starting index of the sort. Defaults to 0.
   * @param high The ending index of the sort. Defaults to array.length - 1.
   * @returns The sorted array.
   */
  const quickSort = async (array: number[], low: number = 0, high: number = array.length - 1) => {
    if (low < high) {
      const partitionIndex = await partition(array, low, high);

      await quickSort(array, low, partitionIndex - 1);
      await quickSort(array, partitionIndex + 1, high);
    }
    return array;
  };

  /**
   * A wrapper function that sets the sorting state, updates the sorted values,
   * and resets the sorting state once the sorting is complete.
   */
  const handleQuickSort = async () => {
    setIsSorting(true);

    const newSortedArray = await quickSort([...numberArray], 0, numberArray.length - 1);
    setNumberArray(newSortedArray);

    setIsSorting(false);
  };

  /**
   * Asynchronously sorts an array of numbers using the Selection Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   * @returns The sorted array.
   */
  const selectionSort = async () => {
    const array = [...numberArray];
    console.log(array);
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }
    return array;
  };

  /**
   * Recursively sorts an array of numbers using the Merge Sort algorithm.
   * @param arr - The array of numbers to be sorted.
   * @returns The sorted array.
   */
  function mergeSort(array: number[]): number[] {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  /**
   * Merges two sorted arrays into a single sorted array.
   * @param left - The first sorted array.
   * @param right - The second sorted array.
   * @returns The merged sorted array.
   */
  function merge(left: number[], right: number[]) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  /**
   * Resets the sorted values to a new, shuffled order.
   */
  const handleReset = () => {
    setNumberArray([...shuffle(values)]);
  };

  return (
    <div className='column-list-container'>
      {/* <div className='column-list'>
        {numberArray.map((value, index) => (
          <Column key={index} value={value} index={index} />
        ))}
      </div>
      <div className='button-container'>
        <button disabled={isSorting} onClick={handleQuickSort}>
          Quick sort
        </button>
        <button disabled={isSorting} onClick={bubbleSort}>
          Bubble Sort
        </button>
        <button disabled={isSorting} onClick={insertionSort}>
          Insertion Sort
        </button>

        <button disabled={isSorting} onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className='timer-container'>
        <div>
          <p>delay</p>
          <input
            disabled={isSorting}
            checked={withDelay}
            onChange={(e) => setWithDelay(e.target.checked)}
            type='checkbox'
          />
        </div>
        <div>
          <p>ms</p>
          <input
            disabled={isSorting}
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            type='number'
          />
        </div>
      </div> */}
    </div>
  );
};

export default ColumnList;
