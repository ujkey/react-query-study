# `react-query` study


<br/><br/>

## react-query?
react-query는 데이터 Fetching, Caching, 동기화, 에러 핸들링 등을 간편하게 처리할 수 있도록 도와주는 라이브러리이다. 

<br/>

## 장점
### Data Fetching
서버로부터 데이터를 가져오는 작업을 간편하게 처리할 수 있다
### Caching
불필요한 중복 데이터 Fetching을 방지하고, 캐시를 활용하여 성능을 향상시킬 수 있다
### 동기화
서버와 클라이언트 데이터를 동기화하여 실시간 데이터 업데이트를 가능하게 한다
### 에러 핸들링
데이터 Fetching 중 발생하는 에러를 처리하고, 다양한 에러 핸들링 옵션을 제공한다
### 편리함
React Hooks와 유사한 사용법을 제공하며, 비교적 코드의 양이 적고 구조가 단순하여 추후 유지보수에 용이하다

<br/>

## 설치 및 세팅
### 설치
```bash
npm install react-query
```

### 세팅
> 1. `QueryClient` 인스턴스 생성한다
> 2. 컴포넌트가 `QueryClient`에 접근할 수 있도록, root가 되는 컴포넌트를 `QueryClientProvider`로 감싼다
> 3. client props로 `QueryClien`t 인스턴스를 전달한다

```typescript
// src/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
```

<br/>

## React Query Devtools 사용하기
React Query Devtools는 react-query의 쿼리 상태를 모니터링할 수 있는 시각화 도구이다. 쿼리의 상태를 확인하고, 캐시된 데이터를 확인할 수 있다.<br/>
`QueryClientProvider`로 감싼 컴포넌트 내부에 `ReactQueryDevtools` 컴포넌트를 추가하면 된다.

```typescript
<QueryClientProvider client={queryClient}>
    // [initialIsOpen] devtools를 열어둘지 여부(기본값은 true)
    // [position] devtools의 위치(기본값은 bottom-right)
    <ReactQueryDevtools initialIsOpen={false} />

    <Component {...pageProps} />
</QueryClientProvider>
```

<br/>

## `useQuery()`
GET 요청과 같이 서버로부터 데이터를 조회하는 작업을 할 때 사용한다

### 사용법(parameter)
```typescript
useQuery([queryKey], queryFn, [config])
```
#### 1. queryKey
- useQuery마다 부여되는 고유한 Key 값
- react-query는 queryKey를 사용하여 쿼리를 실행하고, 캐시에 저장한다. 캐시된 데이터는 queryKey를 사용하여 가져올 수 있다
- 배열로 선언한다. 첫번째 요소는 다른 컴포넌트에서 해당 컴포넌트의 데이터를 사용할 때 사용되는 키값이고, 두번째 요소는 query 함수 내부에 파라미터로 전달된다
- 반환값은 API의 성공, 실패여부, api return 값을 포함한 객체이다
- useQuery는 비동기로 작동한다. (즉, 한 컴포넌트에 여러개의 useQuery가 있다면 하나가 끝나고 다음 useQuery가 실행되는 것이 아닌 두개의 useQuery가 동시에 실행된다)

#### 2. queryFn
Promise를 반환하는 비동기 함수(서버에 API 요청을 보내는 함수)

#### 3. options
자주 사용되는 옵션을 알아보자

|option|설명|
|------|---|
|`enabled`|쿼리를 실행할지 여부를 결정한다. 기본값은 true이다.|
|`retry`|쿼리가 실패할 경우, 다시 시도할 횟수를 설정한다. 기본값은 3이다.|
|`onSuccess`|쿼리가 성공적으로 완료되었을 때 실행되는 함수|
|`onError`|쿼리가 실패했을 때 실행되는 함수|
|`initialData`|쿼리가 실행되기 전에 사용할 초기 데이터를 설정한다.|
|`staleTime`|캐시된 데이터가 만료되기 전까지의 시간을 설정한다.(fresh 상태로 유지되는 시간) 기본값은 0이다.|
|`cacheTime`|캐시된 데이터가 삭제되기 전까지의 시간을 설정한다. 기본값은 5분이다.|

### 예제
```typescript
// status: 쿼리의 상태(idle, loading, error, success)
const { status, data: todoList, error } = useQuery('todos', http.fetchTodoList, {
    onSuccess: (data) => {
        console.log('todo data', data?.data);
    },
    onError: (error) => {
        console.log('onError', error);
    },
});
```

### `useQuery` 동기적으로 실행하기
config option에서 `enabled: false` 옵션을 사용하면, `useQuery`를 동기적으로 사용할 수 있다.

```typescript
const { data: todoList } = useQuery('todos', http.fetchTodoList, {
    onSuccess: (data) => {
        console.log('Todo data', data.data);
    },
});

const { data: userList } = useQuery('users', http.fetchUserList, { 
    enabled: !!todoList, // true일 경우 useQuery를 실행(http.fetchUserList)
    onSuccess: (data) => {
        console.log('User data', data.data);
    }, 
});
```

<!-- <br/>

## useQueries -->

<br/>

## `useMutation`
POST, PUT, DELETE와 같이 데이터 변경 및 삭제 작업을 할 때 사용한다. 데이터를 저장하지 않으므로 queryKey는 필요하지 않다.

```typescript
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
```

<!-- <br/>

## useInfiniteQuery
## react Suspense와 함께 사용하기 -->

<br/>

## Reference
- [🔗 reference_01](https://react-query.tanstack.com/overview)