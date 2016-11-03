import {
	connect
} from 'react-redux'

import LocationWizard from '../components/LocationWizard'
import {
	saveCompleteLocationWizard,onLocationItemClick,leftMenuDropdownClickEvent
} from '../modules/locationWizard';

function submit(values) {

}

function onchange(e) {
	console.log(e.target.value, e.target.name)
}
const mapDispatchToProps = (dispatch) => ({
	onLocationItemClick: onLocationItemClick,
	submit: (values) => {
		alert(JSON.stringify(values))
	},
	onchange: (e) => {
		console.log(e.target.value, e.target.name)
	},
	leftMenuDropdownClickEvent:leftMenuDropdownClickEvent,
	
})

const mapStateToProps = (state, ownProps) => ({
	location: state.location,
})
export default connect(mapStateToProps, mapDispatchToProps)(LocationWizard)