import { ref, onMounted, watch } from "vue";
import axios from "axios";

export default function useGetJokeList(type, page) {
  const list = ref([]);
  const getList = async () => {
    const data = await axios.get(
      `https://api.apiopen.top/getJoke?page=${page.value}&count=5&type=${type.value}`
    );
    list.value = data.data.result;
  };

  onMounted(getList);

  watch(type, () => {
    getList();
  });

  watch(page, () => {
    getList();
  });

  return {
    list,
    getList
  };
}
