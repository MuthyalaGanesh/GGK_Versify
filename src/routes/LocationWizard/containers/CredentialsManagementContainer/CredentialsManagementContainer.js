import { reduxForm } from 'redux-form'
import {
    connect
} from 'react-redux'
import CredentialsManagement from '../../components/CredentialsManagement'

const mapDispatchToProps = {
 
}

const mapStateToProps = (state) => ({
    basic: state.basic,
    formdata:state.form
})



export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'CredentialsManagementForm', 
    destroyOnUnmount: false,    
})(CredentialsManagement));
