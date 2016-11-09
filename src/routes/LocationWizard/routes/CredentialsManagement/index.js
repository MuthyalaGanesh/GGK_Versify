
export default (store) => ({
  path : 'credential',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Credential = require('./container/CredentialsManagementContainer').default
      cb(null, Credential)

    /* Webpack named bundle   */
    }, 'credential')
  }
})