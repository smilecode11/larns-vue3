<template>
  <div class="demo">
    <span>watch 精确控制 effect: {{ count }}</span> &nbsp;
    <button @click="count++">add count</button> <br />
    <span>{{ msg }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";
export default defineComponent({
  name: "wacth-demo",
  props: ["msg"],
  setup(props: any) {
    const count = ref(0);

    //  watch 精确控制 count
    watch(count, (newV, oldV) => {
      console.log("- watch count -");
      console.log(" newV:", newV);
      console.log(" oldV:", oldV);
    });

    //   1. 使用 toRefs 侦听来自 props 的属性
    watch(toRefs(props).msg, (newV) => {
      console.log("- toRefs props.msg -", newV);
    });

    //  2. 使用 回调函数返回 props.attr 侦听来自 props 的属性
    watch(
      () => props.msg,
      (newV, oldV) => {
        console.log("- watch props.msg -");
        console.log(" newV:", newV);
        console.log(" oldV:", oldV);
      },
      {
        immediate: true,
      }
    );

    //  3. 多值侦听, 首个参数设置成数组即可
    watch([() => props.msg, count], (newV) => {
      console.log("- watch array -", newV);
    });

    return {
      count,
    };
  },
});
</script>