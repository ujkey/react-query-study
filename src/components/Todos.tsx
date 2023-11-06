import React, {useState, useEffect} from 'react';
import http from '@/api/http';
import { useQueries, useQuery } from 'react-query';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    address: any[]; //TODO: address interface
    phone: string;
    website: string;
    company: any[]; //TODO: company interface

}

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const result = useQueries([
        {
            queryKey: 'posts',
            queryFn: http.fetchPostList,
        }, 
        {
            queryKey: 'comments',
            queryFn: http.fetchCommentList,
        }
    ]);

    useEffect(() => {
        console.log('result', result);
        const loadingFinishAll = result.some(result => result.isLoading);
        console.log('loadingFinishAll', loadingFinishAll); //loadingFinishAll이 false이면 완료
    }, [result]);

    const { status, data: todoList, error } = useQuery('todos', http.fetchTodoList, {
        refetchOnWindowFocus: false,
        retry: 0, // 실패시 재호출 횟수 지정
        onSuccess: (data) => {
            // 서버에서 데이터를 받아오는데 성공했을 때 호출되는 함수
            console.log('todo data', data.data);
            setTodos(data?.data.slice(0,10));
        },
        onError: (error) => {
            // 서버에서 데이터를 받아오는데 실패했을 때 호출되는 함수
            console.log('onError', error);
        },
    });

    const { status: status_user, data: userList, error: error_user } = useQuery('users', http.fetchUserList, { 
        enabled: !!todoList, // true가 되면 http.fetchUserList를 실행
        onSuccess: (data) => {
            console.log('user data', data.data);
            setUsers(data?.data.slice(0,10));
        }, 
    });
    
    if(status === 'loading') return <span>Loading...</span>;
    if(status === 'error') return <span>Error: {error}</span>;

    return (
        <>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Todos;