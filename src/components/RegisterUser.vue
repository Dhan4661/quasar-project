<template>
<div>
  Register User
</div>
<input type="text" placeholder="UserName" name="userName" :value="userName">
<br>
<label for="gender">Gender</label>
<input type="radio" class="male" data-testid="male" id="gender" placeholder="Gender" name="male" :value="male">
<input type="radio" data-testid="female" id="gender" placeholder="Gender" name="male" :value="female">



</template>

<script setup lang="ts">
import {  ref } from 'vue';

const userName = ref(null)
// export default defineComponent({
//   name: 'RegisterUser',
//   components: {
//     //VForm: Form,
//   },

//   setup() {
//     const name = ref(null);

//     return {
//       name,
//     };
//   },
// });
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
