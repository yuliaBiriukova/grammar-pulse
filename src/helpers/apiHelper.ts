export const API_URL = process.env.REACT_APP_API_URL;

export default class ApiHelper {
    private static baseUrl = API_URL;

    public static async get<T>(url: string, params = {}) {
        const endpoint = this.createEndpoint(url);

        const headers = new Headers();

        const jwtToken = localStorage.getItem('accessToken');
        if (jwtToken) {
            headers.append('Authorization', `Bearer ${jwtToken}`);
        }

        const queryParams = new URLSearchParams(params).toString();
        const requestUrl = queryParams ? `${endpoint}?${queryParams}` : endpoint;

        const response = await fetch(
            requestUrl, {
                method: 'GET',
                headers,
            }
        );
        /*return response.json();*/
        return (await ApiHelper.parseResponseData(response)) as Promise<any>;
    }

    public static async post<T>(url: string, model?: T) {
        const endpoint = this.createEndpoint(url);

        const headers = new Headers({ "Content-Type": "application/json" });

        const jwtToken = localStorage.getItem('accessToken');
        if (jwtToken) {
            headers.append('Authorization', `Bearer ${jwtToken}`);
        }

        const response = await fetch(
            endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify({...model}),
            }
        );
        /*return response.json();*/
        return (await ApiHelper.parseResponseData(response)) as Promise<any>;
    }

    public static async put<T>(url: string, id: number | string, model: T) {
        const endpoint = this.createEndpoint(url) + '/'+ id;

        const headers = new Headers({ "Content-Type": "application/json" });

        const jwtToken = localStorage.getItem('accessToken');
        if (jwtToken) {
            headers.append('Authorization', `Bearer ${jwtToken}`);
        }

        const response = await fetch(
            endpoint, {
                method: 'PUT',
                headers,
                body: JSON.stringify({...model}),
            }
        );
        return (await ApiHelper.parseResponseData(response)) as Promise<T>;
    }

    public static async delete<T>(url: string, id: T) {
        const endpoint = this.createEndpoint(url) + '/' + id;

        const headers = new Headers();

        const jwtToken = localStorage.getItem('accessToken');
        if (jwtToken) {
            headers.append('Authorization', `Bearer ${jwtToken}`);
        }

        const response = await fetch(
            endpoint, {
                method: 'DELETE',
                headers,
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
            return (await response.json());
        } catch (e) {}
        try {
            return (await copyResponse?.text()) as T;
        } catch (e) {
            return (await response) as T;
        }
    }
}