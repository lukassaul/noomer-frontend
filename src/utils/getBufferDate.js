
export default function getBufferDate(lastDate:any){
  const today = new Date(lastDate)
  const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
  return oneMonthAgo
}
