<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  name: 'App',
  components: {},
  created () {
    if (localStorage.Token) {
      const decoded = jwt_decode(localStorage.Token);
      // token存储到vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length ===0)
      );
    }
  }
}
</script>

<style>

</style>
