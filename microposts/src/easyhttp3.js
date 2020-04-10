const STATUS_OK = 200;

class Easyhttp3 {
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async post(url, data) {
        const response = await
            fetch(
                url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
        return await response.json();
    }

    async put(url, data) {
        console.log(`>>> put(${JSON.stringify(data)}`);
        const response = await
            fetch(
                url, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
        return await response.json();
    }

    async delete(url) {
        const response = await
            fetch(
                url, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );
        return response.json();
    }
}

export const easyHttp = new Easyhttp3();