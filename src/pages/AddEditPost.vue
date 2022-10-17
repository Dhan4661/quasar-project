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
            :to="{ name: 'HomePage' }"
          >
            FabBook
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
      <div style="padding: 100px">
        <q-card>
          <q-card-header> </q-card-header>
          <q-divider></q-divider>
          <q-card-section>
            <div>Upload your Post.</div>
          </q-card-section>
        </q-card>
        <div style="padding-top: 50px">
          <q-card>
            <q-card-header> </q-card-header>
            <q-divider></q-divider>
            <q-card-section>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input
                  filled
                  v-model="post.name"
                  label="Post HeadLine"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-input
                  filled
                  type="textarea"
                  v-model="post.description"
                  label="Post Description"
                />

                <!-- <q-toggle
                  v-model="accept"
                  label="I accept the license and terms"
                /> -->

                <div>
                  <q-btn label="Submit" type="submit" color="primary" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
//import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const linksList = [
  {
    title: 'Home',
    icon: 'school',
    link: '/Home',
  },
  {
    title: 'Reset Password',
    icon: 'code',
    link: '/ResetPassword',
  },
  {
    title: 'Logout',
    icon: 'favorite',
    link: '/Login',
  },
];

export default defineComponent({
  name: 'PostList',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    //const $q = useQuasar();
    const router = useRouter();
    const post = reactive({
      name: '',
      description: '',
      accept: '',
    });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      post,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      onSubmit() {
        window.alert('Post created sucessfully');
        void router.push({ name: 'HomePage' });
      },
    };
  },
});
</script>
