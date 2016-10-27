import { reduxForm } from 'redux-form'
import BasicInfo from '../component/BasicInfo'
import validate from '../validations/basicInfoValidation'


export default reduxForm({
    form: 'BasicInfoForm',  //Form name is first form
    destroyOnUnmount: false,
    validate
})(BasicInfo)