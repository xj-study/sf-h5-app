import type { StoryItem, StoryLevelItem, StoryRecordItem, StoryRecordLevelPassForm, StoryRecordQuery } from '@/pages/story/typing'
import request from '@/utils/request'

export async function storyQueryList(data): Promise<any> {
  return request({
    method: 'post',
    url: `/story/query`,
    data,
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

export async function storyPublish(storyId: number): Promise<any> {
  return request({
    method: 'post',
    url: `/story/${storyId}/publish`,
  })
}

export async function storyOffShelf(storyId: number): Promise<any> {
  return request({
    method: 'post',
    url: `/story/${storyId}/offshelf`,
  })
}

export async function storyAdd(data: StoryItem): Promise<any> {
  return request({
    method: 'post',
    url: '/story/add',
    data,
  })
}

// story level

export async function storyLevelQueryList(storyId: number): Promise<any> {
  return request({
    method: 'get',
    url: `/story/${storyId}/level/query`,

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

export async function storyLevelAdd(data: StoryLevelItem): Promise<any> {
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

// story record

// 激活
export async function storyActive(storyId: number): Promise<any> {
  return request({
    method: 'post',
    url: `/story/record/active/${storyId}`,

  })
}

// 通关
export async function storyPass(formData: StoryRecordLevelPassForm): Promise<any> {
  return request({
    method: 'post',
    url: `/story/record/level/pass`,
    data: formData,
  })
}

export async function storyRecordQueryList(storyRecordQuery: StoryRecordQuery): Promise<any> {
  return request({
    method: 'post',
    url: `/story/record/query`,
    data: storyRecordQuery,
  })
}

export async function storyRecordQuery(storyId: number): Promise<StoryRecordItem> {
  return request({
    method: 'get',
    url: `/story/record/query/${storyId}`,
  })
}
