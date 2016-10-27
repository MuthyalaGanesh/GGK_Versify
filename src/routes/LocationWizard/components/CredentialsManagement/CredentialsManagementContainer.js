import BasicInfo from 'BasicInfo'
import validate from '../validations/basicInfoValidation'


export default reduxForm({
    form: 'CredentialsManagement',  //Form name is first form
    destroyOnUnmount: false,
    validate
})(BasicInfo)