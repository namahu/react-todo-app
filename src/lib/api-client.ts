const baseUrl = import.meta.env.VITE_APP_API_URL;

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${baseUrl}${endpoint}`);
        const json = await response.json();
        console.log(json);
        return json;
    },
    post: async <T>(endpoint: string, data: T) => {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    },
    update: async (endpoint: string, id: string, updateProperty: { [key: string]: string | boolean }) => {
        const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProperty)
        });
        return await response.json();
    },
};
