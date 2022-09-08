<template>
  <div>Register User</div>
  <label for="UserName">UserName</label>
  <input
    type="text"
    placeholder="UserName"
    id="UserName"
    name="UserName"
    :value="UserName"
    data-testId="UserName"
  />
  <br />

  <label for="Email">Email</label>
  <input type="text" id="Email" name="Email" :value="Email" />
  <br />

  <label for="Password">Password</label>
  <input type="text" id="Password" name="Password" :value="Password" />
  <br />

  <!-- <label for="gender">Gender</label>
  <input
    type="radio"
    class="male"
    data-testid="male"
    id="gender"
    placeholder="Gender"
    name="male"
    :value="male"
  />
  <input
    type="radio"
    data-testid="female"
    id="gender"
    placeholder="Gender"
    name="male"
    :value="female"
  /> -->
  <q-card style="margin: 100px" class="p10">
    <q-input
      type="text"
      placeholder="Test"
      v-model="model.test"
      data-testId="test"
      class="p10"
    >
    </q-input>
    <q-select
      v-model="model.selectTest"
      :options="testOptions"
      data-testId="selectTest"
      class="p10"
    >
    </q-select>

    <q-toggle
      v-model="model.accept"
      @update:modelValue="disableSubmitButton(model.accept)"
      label="I accept the terms and conditions"
      data-testId="accept"
      class="p10"
    />
    <q-btn
      label="SignUp"
      :disabled="buttondisabled"
      type="submit"
      @click="onSubmit()"
      data-testId="signup"
      class="p10"
    />
  </q-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';

const UserName = ref(null);
const Email = ref(null);
const Password = ref(null);
const model = reactive({
  test: null,
  selectTest: 'Google',
  accept: false,
});
let buttondisabled = ref(true);
const testOptions = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']);

const disableSubmitButton = (accept: boolean): void => {
  if (accept == true) {
    buttondisabled.value = false;
  } else {
    buttondisabled.value = true;
  }
};

// /* For making API request */
// const onSubmit = (): void => {
//   debugger;
//   /* dummy data for test purposes */
//   /*
//   model.test = 'Hello World!',
//   model.selectTest = 'Google';
//   model.accept = true;
//   console.log('submit');
//   */
//   axios.post('/api/1.0/users', {
//     test: model.test,
//     selectTest: model.selectTest,
//     accept: model.accept,
//   });
// };

/* For mocking */
const onSubmit = (): void => {
  debugger;
  /* dummy data for test purposes */

  (model.test = 'Hello World!'), (model.selectTest = 'Google');
  model.accept = true;

  fetch('/api/1,0/users', {
    method: 'POST',
    body: JSON.stringify(model),
    headers: { 'Content-Type': 'application/json' },
  });
};
</script>

<style>
.registerTitle {
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.00735em;
  text-align: center;
  padding-top: 10px;
}
.p10 {
  padding: 10px;
}
</style>
