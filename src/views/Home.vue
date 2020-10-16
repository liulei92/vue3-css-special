<template>
  <div class="home">
    {{ position }}
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="changeJokePage">切换页码</button>
    <button @click="changeJokeType">切换jokeType</button>
    <JokeList v-bind="jokeData" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  ref,
  // toRefs,
  computed,
  watchEffect,
  watch
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import JokeList from "@/components/JokeList.vue";
import UseMouseover from "@/hooks/useMouseover";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    JokeList
  },
  setup(props, ctx) {
    onMounted(() => {
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });

    const obj = reactive({ count: 0 }); // 适用对象进行响应代理
    // const data: {
    //   todoList: { [key: string]: any }[];
    //   todoItem: string;
    //   todoLength: number;
    // } = reactive({
    //   todoList: [],
    //   todoItem: "",
    //   todoLength: computed(() => {
    //     return data.todoList.filter(
    //       (item: { [key: string]: any }) => !item.completed
    //     ).length;
    //   })
    // });
    const count = ref<string | number>(0); // ref 接收一个参数返回响应式且能改变的ref对象。若接收对象 则调用reactive进行深层响应转换

    const plusOne = computed(() => "countL" + count.value);

    const stop = watchEffect(() => console.log(count.value));
    stop(); // 可停止

    const jokeData = reactive({
      type: "video",
      page: 1
    });

    // const jokeType = ref("video");

    const changeJokePage = () => {
      jokeData.page++;
    };

    const changeJokeType = () => {
      jokeData.type = jokeData.type === "video" ? "image" : "video";
      jokeData.page = 1;
    };

    watch(
      () => obj.count,
      (count, prevCount) => {
        console.log(count, prevCount);
      }
    );

    setTimeout(() => {
      obj.count++;
    }, 2000);

    const { position } = UseMouseover();

    watch(position, () => {
      ctx.emit("position", position);
    });

    return {
      obj,
      // ...toRefs(data),
      count,
      plusOne,
      position,
      // jokeType,
      jokeData,
      changeJokeType,
      changeJokePage
    };
  }
});
</script>
