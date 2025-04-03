export default function StringSlice(data, sliceEnd) {
  return data.length > sliceEnd ? data.slice(1, sliceEnd) + "..." : data;
}
