<template>
  <div class="q-pa-md">
    <q-btn label="Edit Post" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 550px; height: 90vh">
        <q-card-section class="row items-center">
          <!-- <span class="q-ml-sm">{{props.name}}</span> -->
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input
            dense="dense"
            v-model="postData.description"
            type="textarea"
            style="min-width: 500px; height: 100% !important"
            outlined="true"
          />
        </q-card-section>


        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn
            flat
            label="Update"
            color="primary"
            @click="emit('on-update', postData)"
            v-close-popup="cancelEnabled"
          />
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
import { computed, ref, onMounted, reactive } from 'vue';

interface IProps {
  post: string;
}
const props = defineProps<IProps>();

const postDescription = computed(() => {
  return props.post.description;
});

const dialog = ref(false);
const cancelEnabled = ref(true);
const postData = reactive({
  name: '',
  description: '',
});

const emit = defineEmits<{ (e: 'on-update', postData: string): void }>();

onMounted(() => {
  postData.name = props.post.name;
  postData.description = postDescription.value;
});
</script>
