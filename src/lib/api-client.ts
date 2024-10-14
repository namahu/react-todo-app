const baseUrl = import.meta.env.VITE_APP_API_URL;

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${baseUrl}${endpoint}`);
        const json = await response.json();
        console.log(json);
        return json;
    },
    updateTask: async (id: string, updateProperty: { key: string, value: string | boolean }) => {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProperty)
        });
        return await response.json();
    }
};