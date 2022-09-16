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
          <q-card-section>
            <v-form
              @submit="onSubmit"
              class="q-gutter-md"
              :validation-schema="signupSchema"
            >
              <q-input-with-validation
                label="Your name *"
                name="name"
                dense
                data-testId="name"
              />
              <q-input-with-validation
                type="email"
                name="email"
                dense
                label="Your Email Address*"
                data-testId="email"
              />
              <q-input-with-validation
                type="number"
                name="phoneNumber"
                dense
                label="Your Contact Number *"
                data-testId="number"
              />

              <q-input-with-validation
                type="number"
                name="age"
                dense
                label="Your age *"
                data-testId="age"
              />

              <!-- <q-select
                :v-model="gender"
                label="Gender"
                data-testId="gender"
                :options="genderList"
                :option-label="name"
                :option-value="id"
              >
              </q-select> -->

              <q-toggle
                v-model="value"
                name="accept"
                checked-icon="check"
                unchecked-icon="clear"
                label="I accept the terms and conditions"
                data-testId="accept"
                :error="errorMessage"
              />
              <div style="color: red">{{ errorMessage }}</div>

              <div>
                <q-btn type="submit" color="primary">Submit</q-btn>
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

import { useQuasar } from 'quasar';
import * as yup from 'yup';
import { Form as VForm, useField } from 'vee-validate';
import QInputWithValidation from '../components/QInputWithValidation.vue';

export default defineComponent({
  name: 'SignUp',
  components: {
    QInputWithValidation,
    VForm,
  },

  setup() {
    const name = ref(null);
    const email = ref(null);
    const phoneNumber = ref(null);
    const age = ref(null);

    const accept = ref(false);
    const router = useRouter();
    const store = useStore();
    //const genderList = ref(['Male', 'Female', 'Other']);

    const signupSchema = yup.object({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address'),
      phoneNumber: yup.number().required('Phone number is required'),
      age: yup.string().required('Age is required'),
    });

    const q = useQuasar();

    const { errorMessage, value } = useField(
      'accept',
      yup
        .boolean()
        .test(
          'accept',
          'The terms and conditions must be accepted.',
          (value) => {
            if (value == true) {
              return true;
            }
            return false;
          }
        )
    );

    return {
      name,
      email,
      phoneNumber,
      age,
      q,
      errorMessage,
      accept,
      //genderList,
      signupSchema,
      value,
      //schema,
      onSubmit() {
        debugger;
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
