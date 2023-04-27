'use client';

import { useSortingContext } from '@/contexts/sortingContext';
import { generateColumns } from '@/lib/generateColumns';
import { shuffle, sleep } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Column from './Column';

const ColumnList = () => {
  const {
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
  } = useSortingContext();

  const inputArrayLengthRef = useRef(null);
  const [updatedArrayLength, setUpdatedArrayLength] = useState<number>(arrayLength);

  const handleArrayLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedArrayLength(Number(e.target.value));
  };

  /**
   * Asynchronously sorts an array of numbers using the Bubble Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   */
  const bubbleSort = async () => {
    setIsSorting(true);
    const n = numberArray.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (numberArray[j] > numberArray[j + 1]) {
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
    setIsSorting(true);

    const n = numberArray.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (numberArray[j] < numberArray[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [numberArray[i], numberArray[minIndex]] = [numberArray[minIndex], numberArray[i]];
      }

      if (withDelay) await sleep(delay);

      setNumberArray([...numberArray]);
    }

    setIsSorting(false);
  };

  /**
   * Asynchronously merges two sorted halves of an array into a single sorted array.
   *
   * @param array The array to be merged.
   * @param left The starting index of the first sorted half.
   * @param middle The ending index of the first sorted half.
   * @param right The ending index of the second sorted half.
   */
  const merge = async (array: number[], left: number, middle: number, right: number) => {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const leftArray: number[] = new Array(n1);
    const rightArray: number[] = new Array(n2);

    for (let i = 0; i < n1; i++) {
      leftArray[i] = array[left + i];
    }

    for (let i = 0; i < n2; i++) {
      rightArray[i] = array[middle + 1 + i];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        i++;
      } else {
        array[k] = rightArray[j];
        j++;
      }

      if (withDelay) await sleep(delay);

      setNumberArray([...array]);
      k++;
    }

    while (i < n1) {
      array[k] = leftArray[i];

      if (withDelay) await sleep(delay);

      setNumberArray([...array]);
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = rightArray[j];

      if (withDelay) await sleep(delay);

      setNumberArray([...array]);
      j++;
      k++;
    }
  };

  /**
   * Asynchronously sorts an array of numbers using the Merge Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   *
   * @param array The array to be sorted.
   * @param left The starting index of the sort. Defaults to 0.
   * @param right The ending index of the sort. Defaults to array.length - 1.
   */
  const mergeSort = async (array: number[], left: number = 0, right: number = array.length - 1) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);

      await mergeSort(array, left, middle);
      await mergeSort(array, middle + 1, right);
      await merge(array, left, middle, right);
    }
  };

  /**
   * A wrapper function that sets the sorting state, updates the sorted values,
   * and resets the sorting state once the sorting is complete.
   */
  const handleMergeSort = async () => {
    setIsSorting(true);

    await mergeSort([...numberArray], 0, numberArray.length - 1);

    setIsSorting(false);
  };

  /**
   * Asynchronously creates a max heap for a given array and index.
   * @param array - The array to create the max heap for.
   * @param n - The size of the array.
   * @param i - The index of the current element.
   */
  const heapify = async (array: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];

      if (withDelay) await sleep(delay);

      setNumberArray([...array]);

      await heapify(array, n, largest);
    }
  };

  /**
   * Asynchronously sorts an array of numbers using the Heap Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   */
  const heapSort = async () => {
    setIsSorting(true);
    const n = numberArray.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(numberArray, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [numberArray[0], numberArray[i]] = [numberArray[i], numberArray[0]];

      if (withDelay) await sleep(delay);

      setNumberArray([...numberArray]);

      await heapify(numberArray, i, 0);
    }

    setIsSorting(false);
  };

  /**
   * A wrapper function that updates the sorted values
   * and resets the sorting state once the sorting is complete.
   */
  const handleHeapSort = async () => {
    await heapSort();
  };

  /**
   * Resets the sorted values to a new, shuffled order.
   */
  const handleReset = () => {
    setNumberArray([...shuffle(numberArray)]);
  };

  const buttons = [
    {
      label: 'Bubble Sort',
      onClick: bubbleSort,
    },
    {
      label: 'Insertion Sort',
      onClick: insertionSort,
    },
    {
      label: 'Quick Sort',
      onClick: handleQuickSort,
    },
    {
      label: 'Selection Sort',
      onClick: selectionSort,
    },
    {
      label: 'Merge Sort',
      onClick: handleMergeSort,
    },
    {
      label: 'Heap Sort',
      onClick: handleHeapSort,
    },
  ];

  return (
    <>
      <div
        className='column-list-container'
        style={{
          border: '1px solid red',
          margin: '5rem',
          height: '50rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {numberArray.map((value, index) => {
          return <Column key={index} value={value} />;
        })}
      </div>

      <div className='actions-container'>
        {buttons.map(({ label, onClick }, index) => (
          <button key={index} disabled={isSorting} onClick={onClick}>
            {label}
          </button>
        ))}

        <button disabled={isSorting} onClick={handleReset}>
          Reset
        </button>

        <div>
          <input
            ref={inputArrayLengthRef}
            type='number'
            id='arrayLength'
            name='arrayLength'
            onChange={handleArrayLengthChange}
          />
          <button
            disabled={isSorting}
            onClick={() => {
              setNumberArray(shuffle(generateColumns(updatedArrayLength)));
              setArrayLength(updatedArrayLength);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ColumnList;
