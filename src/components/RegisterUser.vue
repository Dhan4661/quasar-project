<template>
  <div>Register User</div>
  <label for="UserName">UserName</label>
  <input
    type="text"
    placeholder="UserName"
    id="UserName"
    name="UserName"
    :value="UserName"
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
  {{ model }}
  <q-input
    type="text"
    placeholder="Test"
    v-model="model.test"
    data-testId="test"
  >
  </q-input>
  <q-toggle
    v-model="model.accept"
    @update:modelValue="disableSubmitButton(model.accept)"
    label="I accept the terms and conditions"
    data-testId="accept"
  />
  <q-btn
    label="SignUp"
    :disabled="buttondisabled"
    type="submit"
    @click="onSubmit()"
    data-testId="signup"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const UserName = ref(null);
const Email = ref(null);
const Password = ref(null);
const model = reactive({
  test: null,
  accept: false,
});
let buttondisabled = ref(true);

const disableSubmitButton = (accept: boolean): void => {
  if (accept == true) {
    buttondisabled.value = false;
  }else{
    buttondisabled.value = true;
  }
};

const onSubmit = (): void => {
  console.log('submit');
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
</style>
