import axios from 'axios';
import { Post } from '../types';

class Https {
    // Get
    fetchTodoList = () => {
        return axios.get('https://jsonplaceholder.typicode.com/todos');
    }

    fetchUserList = () => {
        return axios.get('https://jsonplaceholder.typicode.com/users');
    }

    fetchPostList = () => {
        return axios.get('https://jsonplaceholder.typicode.com/posts');
    }

    fetchCommentList = () => {
        return axios.get('https://jsonplaceholder.typicode.com/comments');
    } 
    
    // Create
    createPost = (post: Post) => {
        return axios.post(`https://jsonplaceholder.typicode.com/posts`, post);
    }
}

export default new Https();
