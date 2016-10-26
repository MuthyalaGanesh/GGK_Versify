import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'
import {actions} from  './modules/basicInfo'

export default (store) => ({
  path : 'location',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LocationWizard = require('./containers/LocationWizardContainer').default
     const locationWizardReducer = require('./modules/locationWizard').default
     const basicInfoReducer = require('./modules/basicInfo').default
     const reducer =  combineReducers({
   locationWizardReducer,
   basicInfoReducer
  });
  store.dispatch(actions.bindLocationTypes());
      /*  Add the reducer to the store on key 'BasicInfo'  */
     injectReducer(store, { key: 'location',reducer })
      /*  Return getComponent   */
      cb(null, LocationWizard)

    /* Webpack named bundle   */
    }, 'location')
  }
})
