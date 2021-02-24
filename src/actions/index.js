export const INCREMENT = 'INCREMENT'

export const sampleAction = () => {
  console.log('action in action!!')
  return {
    type: INCREMENT
  }
}
// export const sampleAction = () => ({
//   type: INCREMENT
// })