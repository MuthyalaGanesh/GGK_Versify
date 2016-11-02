import { injectReducer } from '../../../../store/reducers'
import BindSystemIntegrationTypes from './module/systemIntegration'
export default (store) => ({
  path : 'systemintegration',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SystemIntegration = require('./container/SystemIntegrationContainer').default
      
        const reducer = require('./module/systemIntegration').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'systemIntegration', reducer })
      cb(null, SystemIntegration)
    /* Webpack named bundle   */
    }, 'systemintegration')
  }
})