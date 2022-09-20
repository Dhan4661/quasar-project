<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="color: aliceblue; text-decoration: none"
            :to="{ name: 'HomeOut' }"
          >
            FabBook
          </router-link>
        </q-toolbar-title>
        <div>
          <a style="color: aliceblue; text-decoration: none" href="#/Login">
            Login
          </a>
          <a style="color: aliceblue; text-decoration: none" href="#/Register">
            SignUp
          </a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div style="padding: 100px">
        <q-card>
          <q-card-header> </q-card-header>
          <q-divider></q-divider>
          <q-card-section>
            <div style="font-size:30px">
              Fabbook helps you connect and share with the people in your life.
            </div>
            <HomepageImage/>
          </q-card-section>
        </q-card>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomepageImage from  '../components/HomepageImage.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    HomepageImage,
  }
});
</script>
