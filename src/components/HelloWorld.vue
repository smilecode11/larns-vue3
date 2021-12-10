<!--
  * ref
  * reactive
  * toRefs
  * computed
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr />
    <div class="user-wrapper">
      <span v-if="loginUser.name">{{ loginUser.name }}</span
      >&nbsp; <span v-if="loginUser.age">{{ loginUser.age }}</span
      >&nbsp;
      <span v-if="loginUser.identity">{{ loginUser.identity }}</span>
    </div>
    <hr />
    <div class="ref-computed-wrapper">
      <span>ref 创建响应式对象: 基础类型 count: {{ count }}</span> &nbsp;
      <span>computed double count: {{ countDouble }}</span> &nbsp;
      <button @click="handleAddWithCount">count +1</button> &nbsp;
      <button @click="handleResetCount">count reset</button> &nbsp;<br />
      <span
        >ref 创建响应式对象:复杂类型 {{ person.name }} - {{ person.age }}</span
      >
      &nbsp; <button @click="person.change">change person</button> &nbsp;
      <button @click="person.reset">change reset</button>
    </div>
    <hr />
    <div class="reactive-wrapper">
      <span
        >reactive 创建响应式对象 {{ personWithReactive.name }} -
        {{ personWithReactive.age }} - {{ personWithReactive.identity }}</span
      >
      &nbsp;
      <button @click="personWithReactive.changeIdentity">
        change identity
      </button>
      &nbsp;
      <button @click="personWithReactive.resetIdentity">reset identity</button>
    </div>
    <div class="to-refes-with-reactive">
      <span
        >toRes with reactive personWithReactive -> name: {{ name }} age:
        {{ age }} identity: {{ identity }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    //#region 登录用户信息
    interface IUser {
      name: string;
      age?: number;
      identity?: string | number;
    }
    const loginUser: IUser = {
      name: "Chenxin",
      age: 26,
      identity: "superAdmin",
    };
    //#endregion 登录用户信息

    //#region ref 创建响应式对象 count, computed 响应对象 countDouble, 事件触发更改响应对象
    const count = ref(0);
    const handleAddWithCount = (event: any) => {
      console.log(event);
      count.value++;
    };
    const handleResetCount = () => (count.value = 0);

    //  computed countDouble
    const countDouble = computed(() => count.value * 2);

    //  ref 创建响应式对象, 复杂数据
    const person = ref({
      name: "Chenxin",
      age: 26,
      change() {
        this.name = "chen xin";
        this.age = 18;
      },
      reset() {
        this.name = "Chen xin";
        this.age = 26;
      },
    });
    //#endregion 创建响应式对象 count

    //#region reactive 创建响应式对象, toRefs 运用
    const personWithReactive = reactive({
      name: "Chen xin",
      age: 26,
      identity: 1,
      /** 变更身份*/
      changeIdentity() {
        this.identity = 0;
      },
      resetIdentity() {
        this.identity = 1;
      },
    });

    //  reactive 参数必须是 object
    //  const baseWithReactive = reactive(0)

    //  toRefs 修饰 reactive 对象, 即可以使用展开运算符
    const toRefsWithPerson = toRefs(personWithReactive);
    //#endregion reactive 创建响应式对象

    return {
      loginUser,
      count,
      countDouble,
      handleAddWithCount,
      handleResetCount,
      person,
      personWithReactive,
      ...toRefsWithPerson,
    };
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
