<template>

 <div class="q-pa-md" style="max-width: 350px">
 {{postsList}}
    <q-list bordered separator>
      <q-item v-for="post in postLinks" :key="post.name"
          v-bind="post">
        <q-item-section>{{post.name}} <SinglePost :post="post" /></q-item-section>
      </q-item>


    </q-list>
  </div>
</template>

<script>

import { onMounted, onUnmounted, onUpdated } from 'vue';
import SinglePost from './SinglePost.vue'


const postsList = [
  {
    name: 'Docs',
    description: 'quasar.dev',
  },
  {
    name: 'Github',
    description: 'github.com/quasarframework',
  },
  {
    name: 'Discord Chat Channel',
    description: 'chat.quasar.dev',
  },
  {
    name: 'Forum',
    description: 'forum.quasar.dev',
  },
  {
    name: 'Twitter',
    description: '@quasarframework',
  },
  {
    name: 'Facebook',
    description: '@QuasarFramework',
  },
  {
    name: 'Quasar Awesome',
    description: 'Community Quasar projects',
  }
];


export default {
  props: ['posts'],
  components: {
    SinglePost
  },
  setup(props){
    console.log(props)
    onMounted(() => console.log('component mounted'));
    onUnmounted(() => console.log('component unmounted'));
    onUpdated(() => console.log('component updated'));

  return {
    postLinks: postsList,
  }
   },
}
</script>
