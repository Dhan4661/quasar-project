/* eslint-disable @typescript-eslint/no-explicit-any */
import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
//import { IRootState } from 'src/store';
import { MutationTypes } from 'src/store/auth/mutation-types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const configURLs = [
  'login',
  'forgotten',
  'reset-password',
  'register',
  'registerStaff',
];
const api = axios.create({
  baseURL: 'https://testapi.servicefoodsonline.co.nz/web/',
});

api.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
api.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
api.defaults.headers.common['Authorizationtoken'] = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiIyNTA3MDljMS0zZjlmLTRjODEtOWE4Zi03NWNiZGZjZTlmOTMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoicUxWU1BoQVN1NVRUN0JSTU00dDVMNHRoRkRKRjlYdzBlaGswellxaGV3c3g4Wm15b3BPZlQ5UkVEYTVUWHplcWNNY0RneE1taXlIOVlNRXFzOTlXd0tKUGhCMzV2WDNsdzlCWVpmNFNIMnd1Wk05RlBHeDN0c1RuaGFQN2IzeFZ1YzFpcXFNX3ZGUSIsImV4cCI6MTY2OTg0NjI5NCwiaXNzIjoiaHR0cHM6Ly90ZXN0YXBpLnNlcnZpY2Vmb29kc29ubGluZS5jby5ueiIsImF1ZCI6Imh0dHBzOi8vdGVzdGFwaS5zZXJ2aWNlZm9vZHNvbmxpbmUuY28ubnoifQ.EcWlsYrSDrhmxZ0l6WnWesd7gRUSvM8DpcI99f7JRMA';
// api.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
// api.defaults.withCredentials = true;

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.request.use(
    (config) => {
      debugger;
      if (configURLs.some((r) => config.url?.includes(r))) {
        return config;
      }
      const authorizationtoken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDEvYXBpL3N1cHBsaWVyX3NpZ25pbiIsImlhdCI6MTY2OTc5MTcwNywiZXhwIjoxNjY5ODYzNzA3LCJuYmYiOjE2Njk3OTE3MDcsImp0aSI6ImpVUXl5aUFUSWJzQktHRGUiLCJzdWIiOiIxODEiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.QxwyWuGFPMMHVrnzsJPeOvjMyb1iHjEqmQyC8QmzdCk';


      if (!authorizationtoken) {
        if (config.params && config.params.noAuth) {
          return config;
        }
        void router.push('/');
      } else {
        config.headers.common.Authorization = `${authorizationtoken}`;
        return config;
      }
    },
    (error) => Promise.reject(error)
  );

  /* This interceptor is used to handle the response from the server. */
  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => Promise.reject(error)
  // );

  let isRefreshing = false;
  let failedQueue: any = [];
  const processQueue = (error: AxiosError | any, token = null) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    failedQueue.forEach(
      (prom: {
        reject: (arg0: AxiosError<any>) => void;
        resolve: (arg0: null) => void;
      }) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      }
    );
    failedQueue = [];
  };

  api.interceptors.response.use(
    (response) => {

    debugger;
      return response;
    },

    async function (error: AxiosError) {
      const originalRequest: AxiosRequestConfig = error.config;
      //const authState = (<IRootState>store.state).auth;
      let retried = false;

      if (
        error.response?.status === 422 &&
        originalRequest?.url?.includes(
          'auth/v1/refreshToken'
        )
      ) {
        store.commit(`auth/${MutationTypes.SET_CURRENT_USERDATA}`, {});
        void router.push('/');
        return Promise.reject(error);
      }
      const refreshToken = 'FtRoTOCrQy77+CTZXqUdZNRcQwFgq5CcgzEZE1VkqWuGjxyZV6kVVaGYDmoNB65/oFrCtwiAQAIQCY/tIq67OdGiya4qHeoDde99jid/tM3QNXfZAS3G4RRPUNaiPGQsDjfkIpELqDa+kq6JMZv5W83v4oaifjHUTxfOx3Qc9zk=';

      if (error.response?.status === 401 && !retried) {

        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              originalRequest.headers.Authorization = token;
              //originalRequest.headers['Authorization'] = `Bearer  + ${token}`;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;
        retried = true;
        if (refreshToken) {
          return new Promise(function (resolve, reject) {
            void api
             .post('auth/v1/refreshToken', {
               refreshToken: 'FtRoTOCrQy77+CTZXqUdZNRcQwFgq5CcgzEZE1VkqWuGjxyZV6kVVaGYDmoNB65/oFrCtwiAQAIQCY/tIq67OdGiya4qHeoDde99jid/tM3QNXfZAS3G4RRPUNaiPGQsDjfkIpELqDa+kq6JMZv5W83v4oaifjHUTxfOx3Qc9zk=',
               appKey: 'DebugMode',
               appVersion: '1.0',
             })
             .then((res) => {
               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
               originalRequest.headers.Authorization =res.data.data.accessToken;

               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
               api.defaults.headers.common['Authorization']=res.data.data.accessToken;

               store.commit(
                 `auth/${MutationTypes.SET_ACCESS_TOKEN}`,
                 res.data.data.accessToken
               );
               store.commit(
                 `auth/${MutationTypes.SET_REFRESH_TOKEN}`,
                 res.data.data.refreshToken
               );

               processQueue(null, res.data.data.accessToken);
               resolve(api(originalRequest));
             })
             .catch((err) => {
               processQueue(err, null);
               reject(err);
             })
             .then(() => {
               isRefreshing = false;
             });
         });

        }

      }
      return Promise.reject(error)
    }
  );
});

export { api };
