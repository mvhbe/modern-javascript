import { easyHttp} from "./easyhttp3";

class DataInterface {
    constructor() {
        this.url = 'http://localhost:3000/posts';
    }

    getPosts() {
        return easyHttp.get(this.url);
    }

    addPost(newPost) {
        return easyHttp.post(this.url, newPost);
    }

    deletePost(id) {
        return easyHttp.delete(`${this.url}/${id}`);
    }
}

export const dataInterface = new DataInterface();