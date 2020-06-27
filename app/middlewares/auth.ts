export default (req: any, res: any, next: any) => {
  console.log('Authenticating ...')
  next()
}
