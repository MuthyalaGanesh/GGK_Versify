import {
	reduxForm
} from 'redux-form'
import {
	connect
} from 'react-redux'
import BasicInfo from '../component/BasicInfo'
import validate from '../validations/basicInfoValidation'
import {
	test
} from '../module/basicInfo'
import {
	bindLocationTypes
} from '../module/basicInfo';


const mapDispatchToProps = (dispatch) => ({
	basicInfoSubmit: (values) => {
		console.log("basicInfoSubmit-", values);
		alert(JSON.stringify(values))
	},
	onchange: (e) => {
		dispatch(test())
	},
	bindLocationTypes
})

const mapStateToProps = (state) => ({
	location: state.location,
	basic: state.basic
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'BasicInfoForm', //Form name is first form
	destroyOnUnmount: false,
	validate
})(BasicInfo));