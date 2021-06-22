/**
 * api util
 * @param {String} path api path without base url
 * @param {{ method?: 'GET' | 'POST' | 'PUT' | 'DELETE', payload?: Record<string, unknown>} | undefined} options api options
 * @returns response data
 */
export async function api(path, options) {
  const url = new URL(
    path,
    // can replace with process.env
    'https://od80h16jwh.execute-api.us-east-2.amazonaws.com'
  )

  const headers = new Headers()
  const method = options?.method ?? 'GET'
  const fetchOptions = { method }

  // content type header
  headers.append('Content-Type', 'application/json')
  if (options?.payload) {
    // request body
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

  // if respond with 50x, 40x
  if (!response.ok) {
    // generate the error message
    let errorMessage = `[${response.status}]: ${response.statusText}`

    // {
    //   "code": "400",
    //   "type": "Request Failed",
    //   "meaning": "Client Error, Bad Request Payload",
    //   "message": "phone_number is required"
    // }
    if (data && data.type) errorMessage = data.type
    if (data && data.meaning) errorMessage = data.meaning
    if (data && data.message) errorMessage = data.message

    throw new Error(errorMessage)
  }

  return data
}

export default api
