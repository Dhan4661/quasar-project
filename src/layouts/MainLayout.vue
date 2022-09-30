<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div
            style="color: aliceblue; text-decoration: none"
            @click="router.push('/')"
          >
            FabBook
          </div>
        </q-toolbar-title>
          <div
            data-testId="login"
            class="router-link"
            style=" padding-right: 5px"
            @click="router.push('/Login')"
          >
            Login
          </div>
          <div
            data-testId="signUp"
            class="router-link"
            @click="router.push('/Register')"
          >
            SignUp
          </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div style="padding: 100px">
        <q-card>
          <q-card-header> </q-card-header>
          <q-divider></q-divider>
          <q-card-section>
            <div style="font-size: 30px">
              Fabbook helps you connect and share with the people in your life.
            </div>
            <HomepageImage />
          </q-card-section>
        </q-card>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import HomepageImage from '../components/HomepageImage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="scss">

.router-link {
  cursor: pointer;
  color: aliceblue;
  text-decoration: none;
}
</style>
