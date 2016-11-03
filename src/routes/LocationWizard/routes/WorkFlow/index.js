import {bindWorkflowItems} from './module/workFlow'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'workFlows',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const WorkFlows = require('./container/WorkFlowContainer').default
      const reducer = require('./module/workFlow').default
      injectReducer(store, { key: 'workFlows', reducer })
      cb(null, WorkFlows)
    }, 'workFlows')
  }
})