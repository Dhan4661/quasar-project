<template>
  <div data-testId="login-page">
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
                  <q-btn data-testId="submit"  label="Submit" type="submit" color="primary" />

                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserData } from 'src/composables/use-userData';



export default defineComponent({
  name: 'LogIn',

  setup() {
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    const { currentUserData } = useUserData();

    return {
      email,
      password,
      onSubmit() {
        if (email.value == null || password.value == null) {
          window.alert('Please enter your details');
        } else {
          window.alert('Login sucessfully');
          void router.push({ name: 'HomePage' });
          if (currentUserData.value.email == email.value) {
            void router.push({ name: 'HomePage' });
          }
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
