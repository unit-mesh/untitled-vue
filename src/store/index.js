import { createStore } from 'vuex'
import errorLog from './modules/errorLog'

const store = createStore({
  modules: {
    errorLog,
  },
})

export default store
