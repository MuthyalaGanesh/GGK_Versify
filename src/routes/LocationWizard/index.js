import {
  injectReducer
} from 'store/reducers'
import {
  combineReducers
} from 'redux'
import {
  bindLocationTypes
} from './modules/locationWizard'

export default (store) => ({
  path: 'location',  
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LocationWizard = require('./containers/LocationWizardContainer').default
      const reducer = require('./modules/locationWizard').default
      const basicInfoReducer = require('./modules/basicInfo').default
      const dataHistorianReducer = require('./modules/dataHistorian').default
      const equipmentsReducer = require('./modules/equipments').default
      const gatewaysReducer = require('./modules/gateways').default
      const systemIntegrationReducer = require('./modules/systemIntegration').default
      const unitCharacteristicsReducer = require('./modules/unitCharacteristics').default
      const userReducer = require('./modules/user').default
      const workflowReducer = require('./modules/workFlow').default
      


      /*  Add the reducer to the store on key 'location'  */
      injectReducer(store, { key: 'location', reducer })
      injectReducer(store, { key: 'basic', reducer: basicInfoReducer })
      injectReducer(store, { key: 'dataHistorian', reducer: dataHistorianReducer })
      injectReducer(store, { key: 'equipments', reducer: equipmentsReducer })
      injectReducer(store, { key: 'gateways', reducer: gatewaysReducer })
      injectReducer(store, { key: 'systemIntegration', reducer: systemIntegrationReducer })
      injectReducer(store, { key: 'unitCharacteristics', reducer: unitCharacteristicsReducer })
      injectReducer(store, { key: 'users', reducer: userReducer })
      injectReducer(store, { key: 'workFlows', reducer: workflowReducer })
      
        /*  Return getComponent   */
      cb(null, LocationWizard)

      /* Webpack named bundle   */
    }, 'location')
  }
})