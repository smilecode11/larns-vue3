<!--
    watchEffect
        * 智能监听, 自动收集依赖并且触发
        * 自动销毁 effect
        * 使副作用失效
        * 副作用执行顺序
-->
<template>
  <div class="watch-effect-demo">
    <span ref="node">watch effect props.msg : {{ msg }}</span> &nbsp;
    <button @click="$emit('onHandleChangeWatchEffectMsg', 'hello ~')">
      change person msg</button
    >&nbsp;
    <button
      @click="$emit('onHandleChangeWatchEffectMsg', 'hello, watchEffect!')"
    >
      reset person msg
    </button>
    <br />
    <span>watch effect inner count: {{ count }}</span> &nbsp;
    <button @click="count++">change count</button>
    <hr />
    <div>
      watchEffect 高级用法: watchEffect 函数参数(也是一个回调函数), 函数执行.
      查看 console 及network
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from "vue";
import axios from "axios";
export default defineComponent({
  props: ["msg"],
  setup(props: any) {
    console.log("setup props:", props);

    const count = ref(1);

    const node = ref<null | HTMLElement>(null);

    //  watchEffect: *智能监听副作用
    //  只有编写在 watchEffect 中变量, 才会被监听并执行副作用
    watchEffect(
      (onInvalidate) => {
        console.log("- props effect -", props.msg);
        console.log("- inner effect -", count.value);

        //#region 副作用高级用法:
        //    多次执行, 清除未返回的请求
        const source = axios.CancelToken.source();
        axios
          .get(`https://jsonplaceholder.typicode.com/todos/${count.value}`, {
            cancelToken: source.token,
          })
          .catch((err) => {
            console.log(err.message);
          });
        //  在该回调中终止未返回的接口继续请求
        onInvalidate(() => {
          source.cancel("trigger");
        });
        //#endregion 副作用高级用法

        //#region 执行顺序
        //    watchEffect 默认执行是在 dom 渲染之前
        const currentNode = node.value ? node.value.innerHTML : "";
        console.log("- currentNode -", currentNode);
        //#endregion 执行顺序
      },
      {
        flush: "post",
        // 默认 之前 -> pre, 之后 -> post
      }
    );

    return {
      count,
      node,
    };
  },
  mounted() {
    // console.log(this.$emit);
    const stop = watchEffect(() => {
      console.log("- mounted watchEffect count -", this.count);
    });
    //  销毁该副作用
    stop();
  },
});
</script>