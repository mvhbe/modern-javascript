const STATUS_OK = 200;

class Easyhttp2 {
    get(url) {
        return new Promise(
            (resolve, reject) => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            }
        )
    }

    post(url, dataToPost) {
        console.log(`=> dataToPost = "${dataToPost }"`);
        return new Promise(
            (resolve, reject) => {
                fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(dataToPost)
                    }
                )
                    .then(response => response.json())
                    .then(dataToPost = resolve(dataToPost))
                    .catch(error => reject(error))
            }
        )
    }
}
