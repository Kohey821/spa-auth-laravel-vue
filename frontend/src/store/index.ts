import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
} from 'vuex';
import axios from 'axios';

export type User = {
  /* eslint-disable camelcase */
  created_at: string
  email: string
  email_verified_at: string | null
  id: number,
  name: string,
  updated_at: string,
  /* eslint-enable camelcase */
};

export interface State {
  currentUser: null | User;
}

export const key: InjectionKey<Store<State>> = Symbol('store');

export function useStore(): Store<State> {
  return baseUseStore(key);
}

export const store = createStore<State>({
  state: {
    currentUser: null,
  },

  getters: {
    verifiedEmailUserOrGest(state) {
      if (state.currentUser) {
        return state.currentUser.email_verified_at;
      }

      return true;
    },
  },

  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
  },

  actions: {
    async setCurrentUser({ commit }) {
      const { dir, log } = console;

      try {
        const { data } = await axios({
          method: 'GET',
          url: '/api/current-user',
        });

        commit('setCurrentUser', data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          log('axios error');
          dir(error);
        } else {
          log('general error');
          dir(error);
        }

        commit('setCurrentUser', null);
      }
    },
  },
});
