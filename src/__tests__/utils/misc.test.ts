import '@testing-library/jest-dom/extend-expect'
import { capitalizeFirstLetter, convertMilisecondsToDate } from 'utils/misc';

describe(`Utils > misc`, () => {
  test(`capitalizeFirstLetter() capitalizes first letter`, () => {
    const lowerCaseString = 'capitalize me';

    expect(capitalizeFirstLetter(lowerCaseString)).toBe('Capitalize me');
  })

  test(`convertMilisecondsToDate() converts miliseconds to {day: dd, month: mm, year: yyyy} ()`, () => {
    const miliseconds = 1538129354; // 28/09/2018
    expect(convertMilisecondsToDate(miliseconds)).toMatchObject({day: 28, month: 9, year: 2018 });
  })
})
