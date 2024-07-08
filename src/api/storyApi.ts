import type { StoryItem, StoryLevelItem, StoryQuery } from '@/pages/story/typing'
import request from '@/utils/request'

export async function storyQueryList(storyQuery?: StoryQuery): Promise<any> {
  return request({
    method: 'post',
    url: `/story/query`,
    data: storyQuery,
  })
}

export async function storyQuery(storyId: number): Promise<any> {
  return request({
    method: 'get',
    url: `/story/query/${storyId}`,
  })
}

export async function storyUpdate(data: StoryItem): Promise<any> {
  return request({
    method: 'post',
    url: '/story/update',
    data,
  })
}

export async function storyAdd(data: StoryItem): Promise<any> {
  return request({
    method: 'post',
    url: '/story/add',
    data,
  })
}

export async function storyUpdateDisable(storyId: number): Promise<any> {
  return request({
    method: 'get',
    url: `/story/${storyId}/update/disable`,

  })
}

// story level

export async function storyLevelQueryList(storyId: number, disableFlag: boolean): Promise<any> {
  return request({
    method: 'get',
    url: `/story/${storyId}/level/query?disableFlag=${disableFlag}`,

  })
}

export async function storyLevelQuery(storyLevelId: number): Promise<any> {
  return request({
    method: 'get',
    url: `/story/level/query/${storyLevelId}`,
  })
}

export async function storyLevelUpdate(data: StoryLevelItem): Promise<any> {
  return request({
    method: 'post',
    url: '/story/level/update',
    data,
  })
}

export async function storyLevelAdd(data: StoryItem): Promise<any> {
  return request({
    method: 'post',
    url: '/story/level/add',
    data,
  })
}

export async function storyLevelUpdateDisable(storyLevelId: number): Promise<any> {
  return request({
    method: 'get',
    url: `/story/level/${storyLevelId}/update/disable`,

  })
}
