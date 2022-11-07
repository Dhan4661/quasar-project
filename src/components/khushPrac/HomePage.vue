<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div
            style="color: aliceblue; text-decoration: none"
            @click="router.push('/')"
          >
            Home
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Welcome to Home Page</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-tabs v-model="tab" class="text-teal">
          <q-tab label="Login" name="one" />
          <q-tab label="Register" name="two" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <div>
              <q-card style="background-color: azure">
                <q-card-header>
                  <div class="registerTitle text-center text-h6">LOGIN</div>
                </q-card-header>
                <q-divider></q-divider>
                <q-card-section>
                  <q-form @submit="onSubmit" class="q-gutter-md">
                    <q-input
                      filled
                      v-model="email"
                      label="Email*"
                      hint="khushi@gmail.com"
                      lazy-rules
                    />

                    <q-input
                      filled
                      type="password"
                      v-model="password"
                      label="Password*"
                      lazy-rules
                    />

                    <div>
                      <q-btn label="Login" type="submit" color="primary" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="two">
            <div>
              <q-card style="background-color: azure">
                <q-card-header>
                  <div class="registerTitle text-center text-h6">SIGN UP</div>
                </q-card-header>
                <q-divider></q-divider>
                <q-card-section>
                  <q-form @submit="onRegister" class="q-gutter-md">
                    <q-input
                      filled
                      v-model="fname"
                      label="First Name*"
                      lazy-rules
                    />
                    <q-input
                      filled
                      v-model="lname"
                      label="Last Name*"
                      lazy-rules
                    />
                    <q-input
                      filled
                      v-model="uname"
                      label="Username*"
                      hint="khushi@gmail.com"
                      lazy-rules
                    />
                    <q-input
                      filled
                      type="password"
                      v-model="password"
                      label="Password*"
                      lazy-rules
                    />

                    <div>
                      <q-btn label="Register" type="submit" color="primary" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
//   import HomepageImage from '../components/HomepageImage.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserData } from 'src/composables/use-userData';

export default {
  setup() {
    const tab = ref('one');
    const email = ref(null);
    const password = ref(null);

    const fname = ref(null);
    const lname = ref(null);
    const uname = ref(null);

    const router = useRouter();
    const { currentUserData } = useUserData();

    return {
      tab: ref('one'),
      email,
      password,
      fname,
      lname,
      uname,
      onSubmit() {
        if (!email.value || !password.value) {
          window.alert('Please fill the details !!');
        } else {
          window.alert('Login sucessfully');
          if (currentUserData.value.email == email.value) {
            void router.push({ name: 'HomePage' });
          }
          email.value = null;
          password.value = null;
        }
      },
      onRegister() {
        if (!fname.value || !lname.value || !uname.value || !password.value) {
          window.alert('Please fill the details !!');
        } else {
          tab.value = 'one';
          window.alert('Registered Sucessfully');
          void router.push({ name: 'HomePage' });
          fetch('http://localhost:3000/users', {
               method: 'POST',
               headers: {'Content-type': 'application/json'},
               body: JSON.stringify({ 
                  fname: fname.value,
                  lname: lname.value,
                  uname:uname.value,
                })
           });
          // if (currentUserData.value.email == email.value) {
          //   void router.push({ name: 'HomePage' });
          // }
        }
      },
    };
  },
};

// const router = useRouter();
</script>

<style lang="scss">
.router-link {
  cursor: pointer;
  color: aliceblue;
  text-decoration: none;
}
.myy-card {
  width: 100%;
  max-width: 250px;
}
</style>
