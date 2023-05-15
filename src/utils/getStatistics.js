/**
  computation for the statistics
**/

function count_range(array, min, max) {
  let newArray = []
  array.map((item) => {
    if (item >= min && item <= max) {
      newArray.push(item)
    }
  })

  return newArray.length
}

export default function getStatistics(pricesArray:any){
  // get highest number
  const highest = Math.max(...pricesArray);

  // get lowest number
  const lowest = Math.min(...pricesArray);

  // Group data by price range
  let spread = highest - lowest
  let priceStep = spread / 5
  let priceGroup = [
    {
      range: `${lowest} - ${lowest+priceStep}`,
      members: count_range(pricesArray, lowest, lowest+priceStep)
    },
    {
      range: `${lowest+priceStep} - ${(lowest+(priceStep*2)).toFixed(2)}`,
      members: count_range(pricesArray, lowest+priceStep+1, lowest+(priceStep*2))
    },
    {
      range: `${(lowest+(priceStep*2)).toFixed(2)} - ${(lowest+(priceStep*3)).toFixed(2)}`,
      members: count_range(pricesArray, lowest+(priceStep*2)+1, lowest+(priceStep*3))
    },
    {
      range: `${(lowest+(priceStep*3)).toFixed(2)} - ${(lowest+(priceStep*4)).toFixed(2)}`,
      members: count_range(pricesArray, lowest+(priceStep*3)+1, lowest+(priceStep*4))
    },
    {
      range: `${(lowest+(priceStep*4)).toFixed(2)} - ${(lowest+(priceStep*5)).toFixed(2)}`,
      members: count_range(pricesArray, lowest+(priceStep*4)+1, lowest+(priceStep*5))
    }
  ]

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
    standardDeviation,
    priceGroup
  }
}
