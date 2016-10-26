import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const BodyLayout = require('./containers/BodyLayoutContainer').default
      cb(null, BodyLayout)
    }, 'bodyLayout')
  }
})
