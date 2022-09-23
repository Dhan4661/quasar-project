<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="color: aliceblue; text-decoration: none"
            :to="{ name: 'HomeOut' }"
          >
            FabBook
          </router-link>
        </q-toolbar-title>
        <div>
          <router-link
            data-testId="signUp"
            style="color: aliceblue; text-decoration: none"
            title="Register"
            to="/Register"
            >SignUp</router-link
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div style="padding: 100px">
        <q-card>
          <q-card-header>
            <div class="registerTitle">FABBOOK USER LOGIN HERE</div>
          </q-card-header>
          <q-divider></q-divider>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                filled
                v-model="email"
                label="Your Email*"
                hint="example@gmail.com"
                lazy-rules
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <!-- <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                /> -->
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
//import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { MutationTypes } from 'src/store/auth/mutation-types';

// const { commit } = useStore();

export default defineComponent({
  name: 'LogIn',

  setup() {
    const email = ref(null);
    const password = ref(null);
    //const $q = useQuasar();
    const router = useRouter();
    const store = useStore();

    return {
      email,
      password,
      onSubmit() {
        if (email.value == null || password.value == null) {
          window.alert('Please enter your details');
        } else {
          window.alert('Login sucessfully');
          let storeData = {
            name: 'Dhan Patel',
            email: email.value,
          };
          store.commit(`auth/${MutationTypes.SET_CURRENT_USERDATA}`, storeData);
          void router.push({ name: 'HomeIn' });
        }
      },
    };
  },
});
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
