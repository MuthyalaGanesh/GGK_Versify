import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'gateways',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Gateway = require('./container/GatewayContainer').default
      const reducer = require('./module/gateway').default
      injectReducer(store, { key: 'gateways', reducer })  
      cb(null, Gateway)
    }, 'gateways')
  }
})