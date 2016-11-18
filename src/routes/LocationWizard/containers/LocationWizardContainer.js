import {
	connect
} from 'react-redux'

import LocationWizard from '../components/LocationWizard'
import {
	saveCompleteLocationWizard,
	leftMenuDropdownClickEvent,
	toggleMenuClick,
	toggleAlertPopup,
	LoadAndRefreshForms,
	toggleSaveResponsePopup 
} from '../modules/locationWizard';


const mapDispatchToProps = (dispatch) => ({
	toggleMenuClick :(e) => {
		dispatch(toggleMenuClick(e))
	},
	leftMenuDropdownClickEvent:(id, e) => {
		dispatch(leftMenuDropdownClickEvent(id, e))
	},
	saveCompleteLocationWizard: () => {
		dispatch(saveCompleteLocationWizard())
	},
	toggleAlertPopup :(e) => {
		dispatch(toggleAlertPopup(e))
	},
	LoadAndRefreshForms:(e)=>{
		dispatch(LoadAndRefreshForms(e))
	},
	toggleSaveResponsePopup:(e)=>{
		dispatch(toggleSaveResponsePopup(e))
	}
})

const mapStateToProps = (state, ownProps) => ({
	location: state.location,
})
export default connect(mapStateToProps, mapDispatchToProps)(LocationWizard)