<template>
  <router-view />
</template>

<script>
import useAuth from "./modules/auth/composables/useAuth";
export default {
  setup() {
    const { authStatus, checkAuthentication } = useAuth();
    checkAuthentication();
    return {
      authStatus,
    };
  },
};
</script>
