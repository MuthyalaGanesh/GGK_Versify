import {bindUnitCharateristics} from './module/unitCharacteristics'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'unitcharacteristics',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UnitCharacteristics = require('./container/UnitCharacteristicsContainer').default
      
        const reducer = require('./module/unitCharacteristics').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'unitCharacteristics', reducer })
	    store.dispatch(bindUnitCharateristics());
      cb(null, UnitCharacteristics)
    /* Webpack named bundle   */
    }, 'unitcharacteristics')
  }
})