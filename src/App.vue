<template>
  <HelloWorld msg="Welcome to Vue3.0" />
  <hr />
  <ProxyDemo />
  <hr />
  <EffectDemo />
  <hr />
  <WatchEffectDemo
    :msg="watchEffectMsg"
    @onHandleChangeWatchEffectMsg="handleChangeWatchEffectMsg"
  />
  <hr />
  <WatchDemo :msg="watchEffectMsg" />
  <hr />
  <HooksDemo />
  <hr />
  <ContextDemo
    :msg="watchEffectMsg"
    @onHandleChangeWatchEffectMsg="handleChangeWatchEffectMsg"
  >
    <template v-slot:header>
      <div>header</div>
    </template>
    <template #main="mainProps">
      <div>
        main
        <span>{{ mainProps.attrs.msg }}</span>
      </div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </ContextDemo>
  <hr />
  <LifeCyclesDemo
    v-if="flag"
    :msg="watchEffectMsg"
    @onHandleChangeWatchEffectMsg="handleChangeWatchEffectMsg"
  />
  <br />
  <button @click="flag = !flag">切换 flag</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import ProxyDemo from "./components/ProxyDemo.vue";
import EffectDemo from "./components/EffectDemo.vue";
import WatchEffectDemo from "./components/WatchEffectDemo.vue";
import WatchDemo from "./components/WatchDemo.vue";
import HooksDemo from "./components/HooksDemo.vue";
import ContextDemo from "./components/ContextDemo.vue";
import LifeCyclesDemo from "./components/LifeCyclesDemo.vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      watchEffectMsg: "hello, watchEffect!",
      flag: true,
    };
  },
  methods: {
    handleChangeWatchEffectMsg(value: string) {
      this.watchEffectMsg = value;
    },
  },
  components: {
    HelloWorld,
    ProxyDemo,
    EffectDemo,
    WatchEffectDemo,
    WatchDemo,
    HooksDemo,
    ContextDemo,
    LifeCyclesDemo,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
