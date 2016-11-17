import {
	connect
} from 'react-redux'

import LocationWizard from '../components/LocationWizard'
import {
	saveCompleteLocationWizard,
	leftMenuDropdownClickEvent,
	toggleMenuClick
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
	}
})

const mapStateToProps = (state, ownProps) => ({
	location: state.location,
})
export default connect(mapStateToProps, mapDispatchToProps)(LocationWizard)