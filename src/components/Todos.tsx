import React, {useState} from 'react';
import http from '@/api/http';
import { useQuery } from 'react-query';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

const Todos = () => {
    const [todos, setTodos] = useState([]);

    const { isLoading, isError, data, error } = useQuery('todos', http.fetchTodoList, {
        refetchOnWindowFocus: false,
        retry: 0, // 실패시 재호출 횟수 지정
        onSuccess: (data) => {
            // 서버에서 데이터를 받아오는데 성공했을 때 호출되는 함수
            console.log('onSuccess', data.data);
            setTodos(data?.data.slice(0,10));
        },
        onError: (error) => {
            // 서버에서 데이터를 받아오는데 실패했을 때 호출되는 함수
            console.log('onError', error);
        },
    });
    
    if(isLoading) return <span>Loading...</span>;
    if(isError) return <span>Error: {error}</span>;

    return (
        <ul>
            {todos.map((todo: Todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};

export default Todos;