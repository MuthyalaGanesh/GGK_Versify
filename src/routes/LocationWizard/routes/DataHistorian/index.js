import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'dataHistorian',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const DataHistorian = require('./container/DataHistorianContainer').default
      const reducer = require('./module/dataHistorian').default
      injectReducer(store, { key: 'dataHistorian', reducer })  
      cb(null, DataHistorian)
    }, 'dataHistorian')
  }
})