import {bindUserInformation} from './module/user'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'users',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Users = require('./container/UsersContainer').default
      const reducer = require('./module/user').default
      injectReducer(store, { key: 'users', reducer })  
      cb(null, Users)
    }, 'users')
  }
})

