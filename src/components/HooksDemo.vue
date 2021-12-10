<template>
  <div class="hooks-demo">
    <div v-if="todoData.loading">get todo ...</div>
    <div v-else>{{ todoData.result?.title }}</div>
    <div v-if="postData.loading">get posts ...</div>
    <div v-else>{{ postData.result?.body }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useURLLoader from "../hooks/useURLLoader";

export default defineComponent({
  name: "hooks-demo",
  setup() {
    //    定义 todo 形状
    interface TodoProps {
      title: string;
      completed: boolean;
      id: number;
      userId: number;
    }
    const todoData = useURLLoader<TodoProps>(
      `https://jsonplaceholder.typicode.com/todos/1`
    );

    //  定义 post 形状
    interface PostProps {
      body: string;
      id: number;
      title: string;
      userId: number;
    }
    const postData = useURLLoader<PostProps>(
      `https://jsonplaceholder.typicode.com/posts/1`
    );
    return {
      todoData,
      postData,
    };
  },
});
</script>