import {
  injectReducer
} from 'store/reducers'
import {
  combineReducers
} from 'redux'
import {
  bindLocationTypes
} from '../modules/locationWizard'
import BasicInfoRoute from './BasicInfo'
import CredentialsManagementRoute from './CredentialsManagement'
import UnitCharacteristicsRoute from './UnitCharacteristics'
import SystemIntegrationRoute from './SystemIntegration'
import WorkFlowRoute from './WorkFlow'

export default (store) => ({
  path: 'location',
  childRoutes: [
    BasicInfoRoute(store),
    CredentialsManagementRoute(store),
    UnitCharacteristicsRoute(store),
    SystemIntegrationRoute(store),
    WorkFlowRoute(store)
  ],
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LocationWizard = require('../containers/LocationWizardContainer').default
      const reducer = require('../modules/locationWizard').default


      //store.dispatch(bindLocationTypes());
      /*  Add the reducer to the store on key 'BasicInfo'  */
      injectReducer(store, {
          key: 'location',
          reducer
        })
        /*  Return getComponent   */
      cb(null, LocationWizard)

      /* Webpack named bundle   */
    }, 'location')
  }
})