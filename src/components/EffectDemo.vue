<!--
    深入响应式对象
        * 保存 effect
        * 检测变化
        * 触发 trigger effect
-->
<template>
  <div class="effect-demo">深入响应式对象, 控制台查看打印</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "effect-demo",
  setup() {
    //  保存 effect 对象
    const dep = new Set();
    let total = 0;
    //  一个副作用
    const effect = () => {
      total = product.price * product.count;
    };
    //  存 effect
    function track() {
      dep.add(effect);
    }
    //  循环执行所有 effect
    const trigger = () => {
      dep.forEach((effect: any) => {
        effect();
      });
    };
    //  侦听器
    const reactive = (obj: any) => {
      const hander = {
        get(target: any, prop: any, revicer: any) {
          console.log("-- get --");
          track();
          return Reflect.get(target, prop, revicer);
        },
        set(target: any, prop: any, newValue: any, revicer: any) {
          console.log("-- set --");
          Reflect.set(target, prop, newValue, revicer);
          trigger();
          return true;
        },
      };
      return new Proxy(obj, hander);
    };
    //  某个被侦听器侦听的产品
    let product = reactive({
      price: 5,
      count: 2,
    });
    //  侦听 get, 收集 effect
    effect();
    console.log(total);
    //  产品属性发生变化, 触发 set
    product.price = 10;
    //  重新获取值, 发送响应地改变
    console.log(total);
  },
});
</script>