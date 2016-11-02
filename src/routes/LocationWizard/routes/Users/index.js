
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'users',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Users = require('./container/UsersContainer').default
      /*  Add the reducer to the store on key 'counter'  */      
      cb(null, Users)
    
    /* Webpack named bundle   */
    }, 'users')
  }
})