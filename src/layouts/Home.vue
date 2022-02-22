<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        indicator-color="transparent"
        active-color="primary"
        class="text-grey-5 shadow-2"
      >
        <q-route-tab icon="mail" to="/home" exact />
        <q-route-tab icon="mail" to="/user" exact />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "MainLayout",
  setup() {
    return {};
  },
});
</script>
<style>
.firebase-emulator-warning {
  display: none;
}
</style>
