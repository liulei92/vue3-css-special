<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <select name="cssPage" @change="handleCssChange">
      <option
        :value="item.path"
        v-for="(item, index) in cssRoutes"
        :key="index"
        >{{ item.name }}</option
      >
    </select>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";
// const  = useRouter();
// import { useStore } from "vuex";
// const store = useStore();

export default defineComponent({
  name: "APP",
  setup() {
    const router = useRouter();
    const { routes } = router.options;
    const cssRoutes = ref<{ name: string; path: string }[]>([]);
    routes.forEach((el: RouteRecordRaw) => {
      if (el.name === "Css") {
        cssRoutes.value = (el.children as RouteRecordRaw[])
          .filter((item: RouteRecordRaw) => item.name !== undefined)
          .map((item: RouteRecordRaw) => {
            return {
              name: (el.name as string) + "." + (item.name as string),
              path: el.path + "/" + item.path
            };
          });
      }
    });

    const handleCssChange = (e: Event) => {
      const target = e.target as HTMLSelectElement;
      router.push(target.value);
    };

    return {
      cssRoutes,
      handleCssChange
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
