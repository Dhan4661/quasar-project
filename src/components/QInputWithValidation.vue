<template>
  <q-input
    :dense="dense"
    :borderless="borderless"
    v-model="value"
    :error="!!errorMessage"
    :type="type"
    :readonly="readonly"
    :disable="disable"
    :outlined="outlined"
    :no-error-icon="true"
    :hint="hint"
    :id="id"
    :data-testId="id"
    bottom-slots
  >
    <template v-slot:append>
      <slot name="q-append"></slot>
    </template>
    <template v-slot:prepend>
      <slot name="q-prepend"></slot>
    </template>
    <template v-slot:error>
      <div class="custom-hint" v-if="hint">{{ hint }}</div>
      <div>{{ errorMessage }}</div>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';

interface Props {
  name: string;
  dense: boolean;
  borderless?: boolean;
  readonly?: boolean;
  disable?: boolean;
  outlined?: boolean;
  hint?: string;
  id?: string;
  type?:
    | 'text'
    | 'password'
    | 'textarea'
    | 'email'
    | 'search'
    | 'tel'
    | 'file'
    | 'number'
    | 'url'
    | 'time'
    | 'date'
    | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  dense: true,
  type: 'text',
});

const { errorMessage, value } = useField<string>(props.name);
</script>
<style>
.custom-hint {
  color: rgba(0, 0, 0, 0.54);
}
</style>
