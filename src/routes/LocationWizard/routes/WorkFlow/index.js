import {bindWorkflowItems} from './module/workFlow'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'workFlows',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const WorkFlows = require('./container/WorkFlowContainer').default
      /*  Add the reducer to the store on key 'counter'  */      
      const reducer = require('./module/workFlow').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'workFlows', reducer })
      cb(null, WorkFlows)
    
    /* Webpack named bundle   */
    }, 'workFlows')
  }
})