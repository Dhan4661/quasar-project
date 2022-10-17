<template>
  <div class="q-pa-md">
    <q-btn
      label="View Post"
      style="margin-right: 20px"
      color="primary"
      @click="dialog = true"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <span class="q-ml-sm">{{props.name}}</span> -->
        </q-card-section>

        <q-card-section class="row items-center">
          <span>{{ snippet }}</span>
        </q-card-section>

        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup="cancelEnabled"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
//import { useQuasar } from 'quasar';

//name: 'SinglePost',
//props: ['post'],
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

//const $q = useQuasar();

interface IProps {
  post: string;
}
const props = defineProps<IProps>();

const snippet = computed(() => {
  // return props.post.description.substring(0, 10000) + '....';
  return props.post.description;
});

const dialog = ref(false);
const cancelEnabled = ref(true);
// onSubmit() {
//   window.alert('Post created sucessfully');
//   void router.push({ name: 'HomePage' });
// },
</script>
