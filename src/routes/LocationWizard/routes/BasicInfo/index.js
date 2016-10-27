
export default (store) => ({
  path : 'basic',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Basic = require('./container/BasicContainer').default
      cb(null, Basic)

    /* Webpack named bundle   */
    }, 'basic')
  }
})