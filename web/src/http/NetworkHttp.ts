export interface Http {
    get<T>(url: string): Promise<T>
    post<T>(url: string, body?: string): Promise<T>
}

export class NetworkHttp implements Http {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url)
        return await response.json()
    }

    async post<T>(url: string, body?: string): Promise<T> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }
        const response = await fetch(url, options)
        return response.json()
    }
}