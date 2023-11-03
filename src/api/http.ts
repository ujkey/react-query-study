import axios from 'axios';

class Https {
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
}

export default new Https();
