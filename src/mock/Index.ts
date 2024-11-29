import type { ResultVO,Lab } from '@/datasource/type'
import {listLabs} from '@/datasource/const'
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
    resultVO.data = { role: 'R2md', id: '000002', name: 'Bo' }
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


server.get('admin/lab', (_schema, request) => {
  console.log(request.params.uid)
  const resultVO: ResultVO<{ labs: Lab[]}> = {
    code: 200,
    data: { labs: listLabs() }
  }

  return resultVO
})
