import { reduxForm } from 'redux-form'
import {
    connect
} from 'react-redux'
import CredentialsManagement from '../../components/CredentialsManagement'
import { onCredentialDropdownChangeEvent } from '../../modules/basicInfo';

const mapDispatchToProps = {
 onCredentialDropdownChangeEvent :onCredentialDropdownChangeEvent
}

const mapStateToProps = (state) => ({
    basic: state.basic,
    formdata:state.form,
    initialValues: state.basic.CredentialInitialValues
})



export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'CredentialsManagementForm', 
    destroyOnUnmount: false,    
})(CredentialsManagement));
