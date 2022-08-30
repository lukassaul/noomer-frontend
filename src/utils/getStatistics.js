/**
  computation for the statistics
**/
export default function getStatistics(pricesArray:any){

  // get highest number
  const highest = Math.max(...pricesArray);

  // get lowest number
  const lowest = Math.min(...pricesArray);

  // Creating the mean with Array.reduce
  let mean = pricesArray.reduce((acc, curr)=>{
    return acc + curr
  }, 0) / pricesArray.length;

  // Assigning (value - mean) ^ 2 to every array item
  pricesArray = pricesArray.map((k)=>{
    return (k - mean) ** 2
  })

  // Calculating the sum of updated array
  let sum = pricesArray.reduce((acc, curr)=> acc + curr, 0);

  // Calculating the variance
  let variance = sum / pricesArray.length

  // Returning the Standered deviation
  let standardDeviation = Math.sqrt(sum / pricesArray.length)

  return {
    highest,
    lowest,
    mean,
    variance,
    standardDeviation
  }
}
