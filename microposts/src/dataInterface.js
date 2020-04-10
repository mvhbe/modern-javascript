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

    getPost(id) {
        return easyHttp.get(`${this.url}/${id}`);
    }

    updatePost(post) {
        return easyHttp.put(`${this.url}/${post.id}`, post);
    }
}

export const dataInterface = new DataInterface();