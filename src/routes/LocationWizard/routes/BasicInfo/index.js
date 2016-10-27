
export default (store) => ({
  path : 'basic',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Basic = require('./container/BasicContainer').default
      cb(null, Basic)
//store.dispatch(bindLocationTypes());
    /* Webpack named bundle   */
    }, 'basic')
  }
})