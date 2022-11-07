<template>
  <div class="q-pa-md" style="max-width: 500px">
    <center><h5 class="bold">Post Lists</h5></center>
    {{ postsList }}
    <q-list bordered separator>
      <q-item v-for="post in postLinks" :key="post.name" v-bind="post">
        <q-item-section>
          {{ post.name }}
        </q-item-section>
        <q-item-section>
          <!-- <div class="q-pa-md"> -->
          <ViewPost :post="post" />
        </q-item-section>
        <q-item-section>
          <EditPost
            v-if="true"
            :post="post"
            @on-update="(e) => updatePost(e)"
          />
          <!-- </div> -->
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
  
<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import ViewPost from './ViewPost.vue';
import EditPost from './EditPost.vue';

const postsList = [
  {
    name: 'Post1 - This is Post1',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post2 - This is Post2',
    desc:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: 'Post3 - This is Post3',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post4 - This is Post4',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post5 - This is Post5',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post6 - This is Post6',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post7 - This is Post7',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post8 - This is Post8',
    desc:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

export default {
  props: ['posts'],
  components: {
    ViewPost,
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
            element.desc = value.desc;
          }
        });
      },
    };
  },
};
</script>
  