import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
} from 'vuex';
import axios from 'axios';

export interface State {
  // TODO: Recordの型を定義する
  currentUser: null | Record<string, unknown>;
}

export const key: InjectionKey<Store<State>> = Symbol('store');

export function useStore(): Store<unknown> {
  return baseUseStore(key);
}

export const store = createStore<State>({
  state: {
    currentUser: null,
  },

  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
  },

  actions: {
    async getCurrentUser({ commit }) {
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
