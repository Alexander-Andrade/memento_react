export const formatMinimized = (string, size= 40) => {
  debugger
  if(string.length > size) {
      const spaceIndex = string.indexOf('\n');
      const sliceIndex = Math.min(size, spaceIndex)
      return `${string.slice(0, sliceIndex)}...`;
    } else {
      return string;
    }
}
