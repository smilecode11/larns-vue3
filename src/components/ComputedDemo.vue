<template>
  <div class="computed-demo">Computed Demo</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "computed-demo",
  setup() {
    //#region 对 computed 实现的理解伪代码
    //    错误理解
    /* computed((getter) => {
      let value;
      watchEffect(() => {
        value = getter();
      });
      return value;
    }); */

    //  正确理解, 引用数据类型数据响应
    /* computed((getter) => {
      let ref = {
        value: null,
      };
      watchEffect(() => {
        ref.value = getter();
      });
      return ref;
    }); */

    let aRef = (getter: Function) => {
      let ref = {
        value: null,
      };
      setTimeout(() => {
        ref.value = getter();
      }, 1500);
      return ref;
    };

    aRef(() => 100);
    console.log(aRef);

    //#endregion
  },
});
</script>
