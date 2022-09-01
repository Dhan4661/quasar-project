<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <router-link
            style="color: aliceblue; text-decoration: none"
            :to="{ name: 'HomeIn' }"
          >
            {{ userName }}
          </router-link>
        </q-toolbar-title>
        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Profile </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div style="padding: 50px 100px 100px 100px">
        <q-card>
          <q-card-header> </q-card-header>
          <q-divider></q-divider>
          <q-card-section>
            <div>
              Fabbook helps you connect and share with the people in your life.
            </div>
          </q-card-section>
        </q-card>

        <div style="padding-top: 50px">
          <q-card>
            <q-card-header> </q-card-header>
            <q-divider></q-divider>
            <q-card-section>
              <div>Please find below your post list</div>
              <PostList />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import PostList from '../components/PostList.vue';
import { useStore } from 'src/store';
//import { MutationTypes } from 'src/store/auth/mutation-types';


 const { state } = useStore();
//const store = useStore();



const linksList = [
  {
    title: 'Home',
    icon: 'school',
    link: '#/HomeIn',
  },
  {
    title: 'Reset Password',
    icon: 'code',
    link: '#/ResetPassword',
  },
  {
    title: 'Post',
    icon: 'chat',
    link: '#/Post',
  },
  {
    title: 'Logout',
    icon: 'favorite',
    link: '#/Login',
  },
];

export default defineComponent({
  name: 'HomePage',

  components: {
    EssentialLink,
    PostList,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const userName = computed(() => {
      return state.auth.currentUserData.name
    })
    //ref(store.state.auth.currentUserData.name)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      userName,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
