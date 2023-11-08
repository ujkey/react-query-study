import React, { Suspense, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { Button, TextField, Typography } from "@mui/material";
import http from "@/api/http";
import { Post } from "../types";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";


export default function Post() {
    const [id, setId] = useState<number>(0);
    const [userId, setUserId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const queryClient = useQueryClient();

    const { status, data: allPosts, error } = useQuery('posts', http.fetchPostList, {
        suspense: true, // 개별 쿼리에 suspense 옵션을 주면 해당 쿼리가 로딩 중일 때 Suspense를 발생시킴
        onSuccess: (data) => {
            console.log('Posts data', data);
        },
        onError: (error) => {
            console.log('onError', error);
        },
    });
 
    const postMutation = useMutation(http.createPost, {
        onMutate: variable => {
            // onMutate : mutate가 호출되기 전에 호출
            console.log("onMutate", variable); // variable : {loginId: 'xxx', password; 'xxx'}
        },
        onSuccess: (data, variables, context) => {
            // onSuccess : 성공했을 때 호출
            console.log("Success", data, variables, context);
            queryClient.invalidateQueries('posts'); // posts 쿼리를 다시 호출(캐싱된 쿼리를 무효화)

            // const allPosts = queryClient.getQueryData('posts');
            // queryClient.setQueryData('posts', [...allPosts.data, data.data]); // 'posts' 쿼리의 데이터를 수동 업데이트
        },
        onError: (error, variable, context) => {
            // onError : 실패했을 때 호출
            console.log('Error', error);
        }, 
        onSettled: () => {
            // onSettled : 성공, 실패 여부와 상관없이 호출
            console.log("end");     
        }
    });

    const handleSumit = () => {
        postMutation.mutate({id, userId, title, body});
    }

    return (
        <>
            <Typography variant="h4">Post - useMutation example</Typography>

            {postMutation.isSuccess ? 'Success' : 'Pending...'}
            {postMutation.isError ? 'Error' : 'Pending...'}
            
            <TextField label="id" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))} />
            <TextField label="userId" value={userId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(Number(e.target.value))} />
            <TextField label="title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            <TextField label="body" value={body} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)} />
            
            <Button variant="outlined" onClick={handleSumit}>Create Post</Button>

            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary fallback={<div>Error</div>}>
                    <ul>
                        {allPosts && allPosts.data.map((post: Post) => (
                            <li key={post.id}>{post.id}</li>
                        ))}
                    </ul>
                </ErrorBoundary>
            </Suspense>
        </>
    );
};