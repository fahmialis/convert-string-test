import { charMap, digitToLetter } from './constants.js';

// nomor 1
function convertStringToNumber(string) {
  let stringArr = string.split('');

  return stringArr.map((char) => charMap[char])?.join(' ');
}

console.log(convertStringToNumber('Titanic')); // 7 5 2 9 4 5 8
console.log(convertStringToNumber('Avenger Endgame')); // 0 0 7 4 6 7 2 0 2 4 8 6 9 4 7

// nomor 2
function alternateSum(numbers) {
  const numberArr = numbers.split(' ')?.map(Number);

  let sum = numberArr[0];

  for (let i = 1; i < numberArr.length; i++) {
    if (i % 2 === 1) {
      sum += numberArr[i];
    } else {
      sum -= numberArr[i];
    }
  }

  return sum;
}

console.log(alternateSum(convertStringToNumber('Titanic'))); // 12
console.log(alternateSum(convertStringToNumber('Avenger Endgame'))); // -16

// nomor 3
function convertNumberToLetter(number) {
  const absNumber = Math.abs(number);
  const digits = [];

  let remaining = absNumber;

  const cycle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let i = 0;

  while (remaining > 0) {
    const digit = cycle[i % cycle.length];

    if (digit <= remaining) {
      digits.push(digit);
      remaining -= digit;
      i++;
    } else {
      i = -1;
      i++;
    }
  }

  return digits.map((d) => digitToLetter[d]).join(' ');
}

console.log(
  convertNumberToLetter(alternateSum(convertStringToNumber('Titanic')))
); // A B E F I A B A B
console.log(
  convertNumberToLetter(alternateSum(convertStringToNumber('Avenger Endgame'))) // A B E F I J A B
);

// nomor 4
function convertLettersToOtherLetter(letters) {
  const letterArr = letters.split(' ');

  // Step 1: Convert letters to digits
  const digits = letterArr.map((char) => charMap[char]);

  /**
   * step 2:
   *
   * -  take last 2 digits,
   * -  assume 0 as x, 1 as y
   * -  replace x with y and y with y + 1
   * -  rejoin
   */

  const lastTwoDigits = digits.slice(-2);

  const y = lastTwoDigits[1];

  lastTwoDigits[0] = y;
  lastTwoDigits[1] = y + 1;

  return digits
    .slice(0, digits.length - 2)
    .concat(lastTwoDigits)
    .map((d) => digitToLetter[d])
    .join(' ');
}

console.log(
  convertLettersToOtherLetter(
    convertNumberToLetter(alternateSum(convertStringToNumber('Titanic')))
  )
); // A B E F I A B B E

console.log(
  convertLettersToOtherLetter(
    convertNumberToLetter(
      alternateSum(convertStringToNumber('Avenger Endgame'))
    )
  )
); // A B E F I J B E

// nomor 5
function convertLettersToDigits(letters) {
  const letterArr = letters.split(' ');

  // Step 1: Convert letters to digits
  const digits = letterArr.map((char) => charMap[char]);

  /**
   * Step 2: assumption
   * even → digit + 1, odd → same
   */
  const transformed = digits.map((digit) =>
    digit % 2 === 0 ? digit + 1 : digit
  );

  return transformed?.join(' ');
}

console.log(
  convertLettersToDigits(
    convertLettersToOtherLetter(
      convertNumberToLetter(alternateSum(convertStringToNumber('Titanic')))
    )
  )
); // 1 1 3 3 5 1 1 1 3

console.log(
  convertLettersToDigits(
    convertLettersToOtherLetter(
      convertNumberToLetter(
        alternateSum(convertStringToNumber('Avenger Endgame'))
      )
    )
  )
); // 1 1 3 3 5 5 1 3
