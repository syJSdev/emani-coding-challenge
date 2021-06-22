/**
 * api util
 * @param {String} path api path without base url
 * @param {{ method?: 'GET' | 'POST' | 'PUT' | 'DELETE', payload?: Record<string, unknown>} | undefined} options api options
 * @returns response data
 */
export async function api(path, options) {
  const url = new URL(
    path,
    'https://od80h16jwh.execute-api.us-east-2.amazonaws.com'
  )

  const headers = new Headers()
  const method = options?.method ?? 'GET'
  const fetchOptions = { method }

  headers.append('Content-Type', 'application/json')
  if (options?.payload) {
    fetchOptions.body = JSON.stringify(options.payload)
  }

  fetchOptions.headers = headers
  const response = await fetch(url.toString(), fetchOptions)

  let data
  try {
    if (response.body) data = await response.json()
  } catch (error) {
    // ignore parse error
  }

  if (!response.ok) {
    let errorMessage = `[${response.status}]: ${response.statusText}`

    if (data && data.type) errorMessage = data.type
    if (data && data.meaning) errorMessage = data.meaning
    if (data && data.message) errorMessage = data.message

    throw new Error(errorMessage)
  }

  return data
}

export default api
