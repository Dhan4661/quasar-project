

<template>
  <div class="q-pa-md">
    <q-btn label="Open Dialog" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <span class="q-ml-sm">{{props.name}}</span> -->
        </q-card-section>

        <q-card-section class="row items-center">
          <span>{{snippet}}</span>
        </q-card-section>

        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup="cancelEnabled" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,ref } from 'vue';
//import { useQuasar } from 'quasar';


export default defineComponent({
  name: 'SinglePost',
  props: ['post'],
  // props: {
  //   name: {
  //     type: String,
  //     required: true
  //   },

  //   description: {
  //     type: String,
  //     default: ''
  //   },
  // },

  setup(props) {
    //const $q = useQuasar();

    const snippet = computed(() => {
      return props.post.description.substring(0,100) + '....'
    })


    return {
      snippet,
      dialog: ref(false),
      cancelEnabled: ref(false)
      // onSubmit() {
      //   window.alert('Post created sucessfully');
      //   void router.push({ name: 'HomeIn' });
      // },
    };
  },
});
</script>

