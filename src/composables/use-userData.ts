import { computed } from 'vue';
import { useStore } from 'src/store';


const store = useStore();

export const useUserData = () =>{
  const currentUserData = computed(() => store.state.auth.currentUserData);

  return {
    currentUserData
  }
}
