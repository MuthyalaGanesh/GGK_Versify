// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from '../routes/Home'
import LocationWizardRoute from '../routes/LocationWizard'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
   path        : '/',
   component   : CoreLayout,
   indexRoute	:Home(store),
  //LocationWizardRoute,
   childRoutes : [
    //LocationWizardRoute(store)
     Home(store),
     LocationWizardRoute(store)
  ]
})


export default createRoutes
