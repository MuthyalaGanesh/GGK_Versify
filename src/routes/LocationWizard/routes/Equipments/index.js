import { injectReducer } from '../../../../store/reducers'
export default (store) => ({
  path : 'equipments',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SystemIntegration = require('./container/EquipmentsContainer').default
      
        const reducer = require('./module/equipments').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'equipments', reducer })
      cb(null, SystemIntegration)
    /* Webpack named bundle   */
    }, 'equipments')
  }
})