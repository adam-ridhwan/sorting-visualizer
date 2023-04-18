import { useSortingContext } from '@/contexts/sortingContext';
import { shuffle, sleep } from '@/lib/utils';
import { useEffect } from 'react';
import Column from './Column';

interface ColumnListProps {
  values: number[];
}

const ColumnList: React.FC<ColumnListProps> = ({ values }) => {
  // Access the sorting context object
  const {
    sortedValues,
    setSortedValues,
    isSorting,
    setIsSorting,
    delay,
    setDelay,
    withDelay,
    setWithDelay,
  } = useSortingContext();

  /**
   * Asynchronously sorts an array of numbers using the Bubble Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   */
  const bubbleSort = async () => {
    console.log(sortedValues);
    // Indicate that sorting has started
    setIsSorting(true);

    // set the length of the array to a variable
    const n = sortedValues.length;

    // Outer loop iterates through the array
    for (let i = 0; i < n; i++) {
      // Inner loop iterates through the unsorted part of the array
      for (let j = 0; j < n - i - 1; j++) {
        // Compare and swap adjacent elements if necessary
        if (sortedValues[j] > sortedValues[j + 1]) {
          const temp = sortedValues[j];
          sortedValues[j] = sortedValues[j + 1];
          sortedValues[j + 1] = temp;

          // Add a delay for visualization purposes, if needed
          if (withDelay) {
            await sleep(delay);
          }

          // Update the state with the new sorted values
          setSortedValues([...sortedValues]);
        }
      }
    }

    // Indicate that sorting has completed
    setIsSorting(false);
    console.log(sortedValues);
  };

  /**
   * Asynchronously sorts an array of numbers using the Insertion Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   */
  const insertionSort = async () => {
    // Indicate that sorting has started
    setIsSorting(true);

    // set the length of the array to a variable
    const n = sortedValues.length;

    // Iterate through the array, starting from the second element (index 1)
    for (let i = 1; i < n; i++) {
      // Store the current element as the key
      let key = sortedValues[i];
      let j = i - 1;

      // Compare the key with elements before it and move them to the right if they are greater than the key
      while (j >= 0 && sortedValues[j] > key) {
        sortedValues[j + 1] = sortedValues[j];
        j--;

        // Add a delay for visualization purposes, if needed
        if (withDelay) {
          await sleep(delay);
        }

        // Update the state with the new sorted values
        setSortedValues([...sortedValues]);
      }

      // Insert the key in its correct position
      sortedValues[j + 1] = key;

      // Add a delay for visualization purposes, if needed
      if (withDelay) {
        await sleep(delay);
      }

      // Update the state with the new sorted values
      setSortedValues([...sortedValues]);
    }

    // Indicate that sorting has completed
    setIsSorting(false);
  };

  /**
   * Asynchronously partitions an array by selecting a pivot element and
   * placing all elements smaller than the pivot to its left and all elements
   * greater than the pivot to its right. The function returns the index of
   * the pivot element after partitioning.
   *
   * @param arr The array to be partitioned.
   * @param low The starting index of the partition.
   * @param high The ending index of the partition.
   * @returns The index of the pivot element after partitioning.
   */
  const partition = async (arr: number[], low: number, high: number) => {
    // Choose the last element as the pivot
    const pivot = arr[high];
    let i = low - 1;

    // Iterate through the partition, swapping elements to arrange them around the pivot
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        // Add a delay for visualization purposes, if needed
        if (withDelay) {
          await sleep(delay);
        }

        // Update the state with the new partitioned values
        setSortedValues([...arr]);
      }
    }

    // Swap the pivot element with the element at position i + 1
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    return i + 1;
  };

  /**
   * Asynchronously sorts an array of numbers using the Quick Sort algorithm,
   * updating the sorted values and the sorting state throughout the process.
   *
   * @param arr The array to be sorted.
   * @param low The starting index of the sort. Defaults to 0.
   * @param high The ending index of the sort. Defaults to arr.length - 1.
   * @returns The sorted array.
   */
  const quickSort = async (
    arr: number[],
    low: number = 0,
    high: number = arr.length - 1
  ) => {
    if (low < high) {
      // Partition the array and obtain the pivot index
      const partitionIndex = await partition(arr, low, high);

      // Recursively sort the left and right sub-arrays
      await quickSort(arr, low, partitionIndex - 1);
      await quickSort(arr, partitionIndex + 1, high);
      console.log('sorting');
    }

    return arr;
  };

  /**
   * A wrapper function that sets the sorting state, updates the sorted values,
   * and resets the sorting state once the sorting is complete.
   */
  const handleQuickSort = async () => {
    // Indicate that sorting has started
    setIsSorting(true);
    console.log(sortedValues);

    // Sort the values and update the state with the sorted values
    const newSortedValues = await quickSort(
      [...sortedValues],
      0,
      sortedValues.length - 1
    );
    setSortedValues(newSortedValues);

    // Indicate that sorting has completed
    setIsSorting(false);
    console.log(newSortedValues);
  };

  useEffect(() => {
    handleQuickSort();
  }, []);

  /**
   * Resets the sorted values to a new, shuffled order.
   */
  const handleReset = () => {
    // Shuffles the values and updates the state with the shuffled values
    setSortedValues([...shuffle(values)]);
  };

  return (
    <div className='column-list-container'>
      {/* <div className='column-list'>
        {sortedValues.map((value, index) => (
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
