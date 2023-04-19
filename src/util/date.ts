export const getStringDate = (date: any) => {
  return date.toISOString().slice(0, 10)
}
