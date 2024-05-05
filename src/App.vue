<script setup lang="ts">
import { mapActions } from 'pinia'
import BaseGreenLink from './components/BaseGreenLink.vue'
import TheHelloWorld from './components/TheHelloWorld.vue'
import TheUserInfo from './components/TheUserInfo.vue'
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE
} from './consts/routes'
import { useUserStore } from './stores/useUserStore'
</script>

<script lang="ts">
export default {
  created() {
    this.refresh()
  },
  methods: {
    ...mapActions(useUserStore, ['refresh'])
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <TheHelloWorld :msg="'Vending machine'" />

      <nav>
        <BaseGreenLink :link-to="HOME_ROUTE" msg="Home" />
        <BaseGreenLink :link-to="ADMIN_ROUTE" msg="Admin panel" />
        <BaseGreenLink :link-to="LOGIN_ROUTE" msg="Log In" />
        <BaseGreenLink :link-to="REGISTRATION_ROUTE" msg="Sign In" />
      </nav>

      <TheUserInfo />
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;

  nav {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;

    .wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
      }
    }
  }
}
</style>
