const apiClient = {
  baseURL: '/api',

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`)
    return response.json()
  },

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

export default apiClient
