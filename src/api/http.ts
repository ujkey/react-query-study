import axios from 'axios';
import { Post } from '../types';

class Https {
    // Get
    fetchTodoList = () => {
        return axios.get('http://localhost:9999/todos');
    }

    fetchPost = (id: number) => {
        return axios.get(`http://localhost:9999/posts/${id}`);
    }

    fetchUserList = () => {
        return axios.get('http://localhost:9999/users');
    }

    fetchPostList = () => {
        return axios.get('http://localhost:9999/posts');
    }

    fetchCommentList = () => {
        return axios.get('http://localhost:9999/comments');
    } 
    
    // Create
    createPost = (post: Post) => {
        return axios.post(`http://localhost:9999/posts/`, post);
    }
}

export default new Https();
