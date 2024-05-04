export const formatMinimized = (string, size= 40) => {
  let regex = /^(\s*?)$|(\\|\n)/m;
  const newLineIndex = string.search(regex);

  if(string.length > size || newLineIndex > 0) {
      const sliceIndex = newLineIndex < 0 ? size :  Math.min(size, newLineIndex)
      return `${string.slice(0, sliceIndex)} ...`;
    } else {
      return string;
    }
}
