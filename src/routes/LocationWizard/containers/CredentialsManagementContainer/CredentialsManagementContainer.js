import { reduxForm } from 'redux-form'
import {
    connect
} from 'react-redux'
import CredentialsManagement from '../../components/CredentialsManagement'

const mapDispatchToProps = {
 
}

const mapStateToProps = (state) => ({
    marketDrivenMappings: state.basic.CredetialBasicData
})



export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'CredentialsManagementForm', 
    destroyOnUnmount: false,    
})(CredentialsManagement));
