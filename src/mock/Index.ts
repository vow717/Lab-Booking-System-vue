import { listLabs, listTeachers } from '@/datasource/datasourse'
import type { Lab, ResultVO, User } from '@/datasource/type'
import { createServer, Response } from 'miragejs'

const server = createServer({})
server.namespace = 'api'

server.post('/login', (schema, request) => {
  const { number, password } = JSON.parse(request.requestBody)
  console.log('1')
  const resultVO: ResultVO<{}> = {
    code: 200,
    data: {}
  }
  if (number === 'teacher' && password == 'teacher') {
    resultVO.data = { role: 'kU4T', id: '000001', name: 'Lily' }
    return new Response(
      200,
      {
        token: '1a2s3d4f5g',
        role: 'kU4T'
      },
      resultVO
    )
  }
  if (number === 'admin' && password == 'admin') {
    resultVO.data = { role: 'R2md', id: '000002', name: 'BO' }
    return new Response(
      200,
      {
        token: '1q2w3e4r5t',
        role: 'R2md'
      },
      resultVO
    )
  }
  resultVO.code = 401
  resultVO.message = '用户名密码错误'
  return resultVO
})

server.get('admin/labs', (_schema, request) => {
  console.log(request.params.uid)
  const resultVO: ResultVO<Lab[]> = {
    code: 200,
    data: listLabs()
  }

  return resultVO
})
server.delete('admin/processes/:pid', (_schema, request) => {
  console.log(request.params.uid)
  const resultVO: ResultVO<Lab[]> = {
    code: 200,
    data: listLabs()
  }

  return resultVO
})

server.get('admin/teachers', (_schema, request) => {
  console.log(request.params.uid)
  const resultVO: ResultVO<User[]> = {
    code: 200,
    data: listTeachers()
  }

  return resultVO
})
