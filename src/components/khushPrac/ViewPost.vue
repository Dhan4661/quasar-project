<template>
  <div class="q-pa-md">
    <q-btn
      label="View Post"
      style="margin-right: 0px"
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


//Type for prop:post
interface IProps {
  post: string;
}
const props = defineProps<IProps>();

const snippet = computed(() => {
  // return props.post.desc.substring(0, 10000) + '....';
  return props.post.desc;
});

const dialog = ref(false);
const cancelEnabled = ref(true);
</script>
