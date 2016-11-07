
import {BindLocations} from './module/basicInfo'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'basic',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Basic = require('./container/BasicInfoContainer').default
       const reducer = require('./module/basicInfo').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'basic', reducer })
      cb(null, Basic)
        //store.dispatch(BindLocations());
    
    /* Webpack named bundle   */
    }, 'basic')
  }
})