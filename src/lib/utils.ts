/**
 * Shuffles an array of numbers in place using the Fisher-Yates shuffle algorithm.
 * @param array - The array to shuffle.
 * @returns The shuffled array of numbers.
 */
const shuffle = (array: number[]) => {
  let currentIndex = array.length, // Current index, starting with the last index
    randomIndex; // Randomly generated index

  // Continue shuffling until the entire array has been shuffled.
  while (currentIndex !== 0) {
    // Generate a random index between 0 and the current index
    randomIndex = Math.floor(Math.random() * currentIndex);

    // Decrement the current index to move on to the next element in the array
    currentIndex--;

    // Swap the values at the current index and the random index, effectively shuffling the array
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array; // Return the shuffled array.
};

/**
 * Suspends the execution of the current async function for a specified amount of time.
 * @param ms The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time has elapsed.
 */
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { shuffle, sleep };
