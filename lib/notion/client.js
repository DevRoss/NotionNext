import { NotionAPI } from 'notion-client'

// Notion now wraps records as { spaceId, value: { value, role } }.
// Normalize at the transport boundary before the legacy client traverses them.
export function normalizeRecordMaps (response) {
  if (!response || typeof response !== 'object') return response
  if (response.recordMap) {
    for (const table of Object.values(response.recordMap)) {
      if (!table || typeof table !== 'object') continue
      for (const [id, record] of Object.entries(table)) {
        if (record?.value?.value && typeof record.value.value === 'object') {
          table[id] = { ...record, ...record.value }
        }
      }
    }
  }
  return response
}

export class BlogNotionAPI extends NotionAPI {
  async fetch (options) {
    const result = await super.fetch({
      ...options,
      gotOptions: {
        ...options.gotOptions,
        timeout: { request: 20000, ...options.gotOptions?.timeout },
        headers: {
          'user-agent': 'RossPedia/1.0 (+https://ross.selfcoding.cn)',
          ...options.gotOptions?.headers
        }
      }
    })
    return normalizeRecordMaps(result)
  }
}
