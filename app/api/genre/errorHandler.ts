import { apiDebugger as log } from '#root/utils/debuggers'

interface ParsedError {
  code: number
  message: string
}

type ErrorMap = {
  [key in number]: ParsedError
}

const parseError = (error: any): ParsedError => {
  const errorMap: ErrorMap = {
    11000: {
      code: 400,
      message: 'A genre with that name already exist.',
    },
  }
  log(error)
  return (
    errorMap[error.code] || {
      code: 500,
      messsage: 'Unknow error.',
    }
  )
}

export default parseError
