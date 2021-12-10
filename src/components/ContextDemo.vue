<!--
  setup context
  具名插槽/作用域插槽使用
-->
<template>
  <div class="context-demo">
    <span>setup context - {{ context }}</span> &nbsp;
    <button @click="handleChangeMsg">change msg</button>
    <slot name="header">
      <div class="header">内部默认的 slot header</div>
    </slot>
    <slot name="main" :attrs="context.attrs">
      <div class="header">内部默认的 slot main</div>
    </slot>
    <slot name="footer">
      <div class="header">内部默认的 slot footer</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "context-demo",
  setup(props, context) {
    console.log("setup props --", props);
    console.log("setup context --", context);

    const handleChangeMsg = () => {
      context.emit("onHandleChangeWatchEffectMsg", "context demo");
    };
    return {
      context,
      handleChangeMsg,
    };
  },
});
</script>