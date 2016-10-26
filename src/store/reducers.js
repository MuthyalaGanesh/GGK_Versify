import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: reduxFormReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
