export default class ApiHelper {
    private static baseUrl = 'https://localhost:44334/api/';

    public static async get<T>(url: string, params = {}) {
        const endpoint = this.createEndpoint(url);
        const response = await fetch(
            endpoint + new URLSearchParams({ ...params })
        );
        return response.json();
    }

    public static async post<T>(url: string, model: T) {
        const endpoint = this.createEndpoint(url);
        const response = await fetch(
            endpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...model}),
            }
        );
        return response.json();
    }

    public static async put<T>(url: string, id: number | string, model: T) {
        const endpoint = this.createEndpoint(url) + '/'+ id;
        const response = await fetch(
            endpoint, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...model}),
            }
        );
        return (await ApiHelper.parseResponseData(response)) as Promise<T>;
    }

    public static async delete<T>(url: string, id: T) {
        const endpoint = this.createEndpoint(url) + '/' + id;
        const response = await fetch(
            endpoint, {
                method: 'DELETE',
            }
        );
        return (await ApiHelper.parseResponseData(response)) as Promise<T>;
    }

    private static createEndpoint(url: string) {
        if (url.at(0) === "/") {
            url = url.slice(1);
        }
        return this.baseUrl + url;
    }

    private static async parseResponseData<T>(response: Response): Promise<T> {
        const copyResponse = response.clone();
        try {
            return (await response.json()) as T;
        } catch {}
        try {
            return (await copyResponse?.text()) as T;
        } catch (e) {
            return (await response) as T;
        }
    }
}