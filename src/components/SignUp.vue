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
          <a style="color: aliceblue; text-decoration: none" href="#/Login">
            Login
          </a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div style="padding: 100px">
        <q-card>
          <q-card-header>
            <div class="registerTitle">
              <span> NEW TO FABBOOK REGISTER HERE</span>
            </div>
          </q-card-header>
          <q-divider></q-divider>
          <q-card-section>
            <v-form @submit="onSubmit" class="q-gutter-md">
              <q-input-with-validation
                label="Your name *"
                hint="Name and surname"
                data-testId="name"
              />
              <q-input-with-validation
                type="email"
                label="Your Email Address*"
                hint="example@gmail.com"
                data-testId="email"
              />
              <q-input-with-validation
                type="number"
                label="Your Contact Number *"
                data-testId="number"
              />

              <q-input-with-validation
                type="number"
                label="Your age *"
                data-testId="age"
              />

              <q-select
                :v-model="gender"
                label="Gender"
                data-testId="gender"
                :options="genderList"
                :option-label="name"
                :option-value="id"
              >
              </q-select>

              <q-toggle
                v-model="accept"
                label="I accept the terms and conditions"
                data-testId="accept"
              />

              <div>
                <q-btn @click="onSubmit" type="submit" color="primary"
                  >Submit</q-btn
                >
                <!-- <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                /> -->
              </div>
            </v-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

//import { useQuasar } from 'quasar';
//import * as yup from 'yup';
//import { Form } from 'vee-validate';
import QInputWithValidation from '../components/QInputWithValidation.vue';

export default defineComponent({
  name: 'SignUp',
  components: {
    QInputWithValidation,
    //VForm: Form,
  },

  setup() {
    const name = ref(null);
    const email = ref(null);
    const phoneNumber = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const router = useRouter();
    const store = useStore();
    //const $q = useQuasar();
    // const schema = yup.object({
    //   password: yup.string().required('Please enter your password'),
    //   emailAddress: yup
    //     .string()
    //     .required('Please enter your email address')
    //     .email('Please enter a valid email address'),
    // });

    return {
      name,
      email,
      phoneNumber,
      age,
      accept,
      //schema,
      onSubmit() {
        debugger;
        if (accept.value !== true) {
          //window.alert('You need to accept the license and terms first');
        } else {
          //window.alert('Submitted sucessfully');
          void router.push({ name: 'Login' });

          // store
          store.dispatch('auth/REGISTER', name).then(
            () => {
              window.alert('Submitted sucessfully');

              void router.push({ name: 'Login' });
            },
            (error) => {
              console.log(error);
              window.alert('You need to accept the license and terms first');
            }
          );
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
