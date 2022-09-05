export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const convertMilisecondsToDate = (miliseconds: number) => {
  const date = new Date(miliseconds * 1000);

  return {
    day: date.getDate(),
    // getMonth() is starts counting from 0, so we need to add 1: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min;
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomDirectionCoeficient = (min: number, max: number) => {
  const randomizator = (Math.random() - 0.5) * 2; // between -1 and 1;
  if (randomizator >= 0) {
    return randomizator * (max - min + 1) + min;
  }
  else {
    return -(-randomizator * (max - min + 1) + min);
  }
}