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
	onParentLoCationSelect
} from '../module/basicInfo';


const mapDispatchToProps = (dispatch) => ({
	onParentLoCationSelect : onParentLoCationSelect
})

const mapStateToProps = (state) => ({
	location: state.location,
	basic: state.basic,
	formdata: state.form 
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'BasicInfoForm', //Form name is first form
	destroyOnUnmount: false,
	validate
})(BasicInfo));