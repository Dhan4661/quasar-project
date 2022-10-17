<template>
  <div class="q-pa-md" style="max-width: 350px">
    {{ postsList }}
    <q-list bordered separator>
      <q-item v-for="post in postLinks" :key="post.name" v-bind="post">
        <q-item-section>
          {{ post.name }}
          <SinglePost :post="post" />
          <EditPost
            v-if="true"
            :post="post"
            @on-update="(e) => updatePost(e)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import SinglePost from './SinglePost.vue';
import EditPost from './EditPost.vue';

const postsList = [
  {
    name: 'Docs',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
  },
];

export default {
  props: ['posts'],
  components: {
    SinglePost,
    EditPost,
  },
  setup(props) {
    console.log(props);
    onMounted(() => console.log('component mounted'));
    onUnmounted(() => console.log('component unmounted'));
    onUpdated(() => console.log('component updated'));

    return {
      postLinks: postsList,
      updatePost(value) {
        postsList.forEach((element) => {
          if (element.name == value.name) {
            element.description = value.description;
          }
        });
      },
    };
  },
};
</script>
