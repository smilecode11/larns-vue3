<!-- 
    * 深入响应式原理 Proxy
        * handler.get
        * handler.set
    * 对象操作, 为 proxy 量身定做
        Reflect.get(target, PropertyKey, receiver)
        Reflect.set(target, PropertyKey, newValue, receiver)
-->
<template>
  <div class="proxy-demo">
    <span>person.name: {{ person.name }}</span> &nbsp;
    <button @click="getAttr">读取 proxy 属性</button> &nbsp;
    <button @click="setAttr('chen xin')">
      设置 proxy 属性name 值为 chen xin
    </button>
    &nbsp;
    <button @click="resetPerson">重置 person name 属性</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "proxy-demo",
  setup() {
    //  定义对象 person
    const person = reactive({
      name: "Chen xin",
    });

    //  Reflect.get 函数取值, Reflect.set 函数形式设置值, 为 Proxy 实例 handler 对象 量身定做
    console.log('Reflect.get(person, "name") -> ', Reflect.get(person, "name"));
    Reflect.set(person, "name", "Chen Xin");

    //  proxy handler 对象
    const handler = {
      // target: any, prop: any, reciver: any
      get(target: any, prop: any, reciver: any) {
        console.log("get -- ", target, prop, reciver);
        return target[prop];
        // return Reflect.get(...arguments);
      },
      set(target: any, prop: any, newValue: any, reciver: any) {
        console.log("set -- ", reciver, newValue);
        target[prop] = newValue;
        return true; //  表示设置成功
      },
    };
    //  创建 proxy 实例,  绑定 person 进行侦听
    const proxy = new Proxy(person, handler);

    const handlerWithRefs = reactive({
      //   重置 person
      resetPerson() {
        person.name = "Chen xin";
      },
      // 读取属性 proxy
      getAttr() {
        proxy.name;
      },
      //  设置 proxy 属性:name
      setAttr(name: string) {
        proxy.name = name;
        console.log("proxy:", proxy, " person:", person);
      },
    });

    return {
      person,
      ...handlerWithRefs,
    };
  },
});
</script>