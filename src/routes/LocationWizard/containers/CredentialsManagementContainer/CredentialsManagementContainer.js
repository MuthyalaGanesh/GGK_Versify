import { reduxForm } from 'redux-form'
import CredentialsManagement from '../../components/CredentialsManagement'


export default reduxForm({
    form: 'CredentialsManagementForm',  //Form name is first form
    destroyOnUnmount: false,    
})(CredentialsManagement)