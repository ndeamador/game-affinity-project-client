export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const convertMilisecondsToDate = (miliseconds: number) => {
  const date = new Date(miliseconds*1000);
  // console.log('This should be 28/09/2018: \n', new Date(1538129354*1000).toString());
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}