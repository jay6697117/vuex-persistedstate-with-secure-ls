import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    string: ""
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    myString: (state, value) =>
      value ? (state.string = value) : (state.string = "")
  }
});

new Vue({
  el: "#app",
  data() {
    return {
      string: ""
    };
  },
  computed: {
    count() {
      return store.state.count;
    },
    myString() {
      return store.state.string;
    }
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    },
    setString() {
      store.commit("myString", this.string);
    },
    deleteString() {
      store.commit("myString");
    }
  }
});
