// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import LocationLayout from '../layouts/LocationLayout/LocationLayout'

import Home from '../routes/Home'
import LocationWizardRoute from '../routes/LocationWizard'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ([{
	path: '/home',
	component: CoreLayout,
	indexRoute: Home(store),
	childRoutes: []
}, {
	path: '/',
	component: LocationLayout,
	indexRoute: LocationWizardRoute(store),
	childRoutes: []
}])


export default createRoutes