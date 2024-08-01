import request from '@/utils/request'

export async function tagQuery(params): Promise<any> {
  return request({
    method: 'get',
    url: `/tag/query`,
    params,
  })
}

export async function tagAdd(name): Promise<number> {
  return request({
    method: 'post',
    url: '/tag/add',
    data: { name },
  })
}
export async function tagUpdate(data): Promise<any> {
  return request({
    method: 'post',
    url: '/tag/update',
    data,
  })
}

export async function tagDelete(tagId: number): Promise<any> {
  return request({
    method: 'get',
    url: `/tag/delete/${tagId}`,
  })
}
