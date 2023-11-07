import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, TextField, Typography } from "@mui/material";
import http from "@/api/http";
import { Post } from "../types";


export default function Post() {
    const [id, setId] = useState<number>(0);
    const [userId, setUserId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const postMutation = useMutation(http.createPost, {
        onMutate: variable => {
            // onMutate : mutate가 호출되기 전에 호출
            console.log("onMutate", variable); // variable : {loginId: 'xxx', password; 'xxx'}
        },
        onSuccess: (data, variables, context) => {
            // onSuccess : 성공했을 때 호출
            console.log("Success", data, variables, context);
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
        </>
    );
};