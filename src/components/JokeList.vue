<template>
  <div style="">
    <div v-for="(item, index) in list" :key="index">
      <div class="text">{{ item.text }}</div>
      <video
        :src="item.video"
        controls
        v-if="item.type === 'video'"
        style="width: 200px;"
      ></video>
      <img :src="item.images" alt="" srcset="" v-else style="width: 200px;" />
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import useGetJokeList from "@/hooks/useGetJokeList";

export default {
  props: {
    type: {
      type: String
    },
    page: {
      type: Number
    }
  },
  setup(props) {
    // 使用 `toRefs` 创建对prop 的 property 的响应式引用
    const { type, page } = toRefs(props);
    const { list, getList } = useGetJokeList(type, page);

    return {
      list,
      getList
    };
  }
};
</script>
