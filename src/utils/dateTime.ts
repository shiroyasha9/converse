export const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // check if am or pm
  const ampm = hours >= 12 ? 'PM' : 'AM';
  // convert to 12 hour format
  const hours12 = hours % 12 || 12;
  // add leading zero if needed
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  // return formatted string
  return `${hours12}:${minutesStr} ${ampm}`;
};
