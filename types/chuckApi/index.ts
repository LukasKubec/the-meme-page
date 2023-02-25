export interface ChuckApiResponse {
    icon_url: string;
    id: string;
    url: string;
    value: string;
}

export const isChuckApiResponse = (response: unknown | ChuckApiResponse): response is ChuckApiResponse => {
    return (
        typeof response === "object" &&
        response !== null &&
        "icon_url" in response &&
        "id" in response &&
        "url" in response &&
        "value" in response
    );
}

