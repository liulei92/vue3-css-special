<template>
  <div class="view95">
    <a href="javaScript:;" data-id="1" @click="handleClick">
      <span v-for="item in spanList1" :key="item" :style="item"></span>
      button1
    </a>
    <a href="javaScript:;" data-id="2" @click="handleClick">
      <span v-for="item in spanList2" :key="item" :style="item"></span>
      button2
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";

type TStyle = { left: string; top: string }[];
export default defineComponent({
  name: "CSsDefault",
  setup(props, ctx) {
    console.log(props, ctx);
    onMounted(() => {
      console.log("view95 按钮涟漪特效");
    });

    const data = reactive<{ spanList1: TStyle; spanList2: TStyle }>({
      spanList1: [],
      spanList2: []
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const x = e.clientX - target.offsetLeft;
      const y = e.clientY - target.offsetTop;
      const list = target.dataset.id === "1" ? data.spanList1 : data.spanList2;
      // if (list.length >= 3) {
      //   list.shift();
      // }
      list.push({ left: x + "px", top: y + "px" });
      setTimeout(() => {
        list.shift();
      }, 500);
    };

    return {
      ...toRefs(data),
      handleClick
    };
  }
});
</script>

<style lang="scss" scoped>
.view95 {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #040d15;
  a {
    position: relative;
    display: inline-block;
    padding: 12px 36px;
    margin: 10px 0;
    color: #ffffff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 2px;
    border-radius: 40px;
    background: linear-gradient(90deg, #0162c8, #55e7fc);
    overflow: hidden;
  }
  a:nth-child(2) {
    background: linear-gradient(90deg, #755bea, #ff72c0);
  }

  span {
    position: absolute;
    background: #ffffff;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: animate 0.5s linear infinite;
  }

  @keyframes animate {
    0% {
      width: 0;
      height: 0;
      opacity: 0.5;
    }
    100% {
      width: 500px; // 50px 和 500px 效果不一样
      height: 500px;
      opacity: 0;
    }
  }
}
</style>
