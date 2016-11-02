import { reduxForm } from 'redux-form'
import {connect,dispatch} from 'react-redux'
import SystemIntegration from '../component/SystemIntegration'
import {SystemIntegrationModal,BindSystemIntegrationTypes,SelectedSystemIntegrationType,AddSystemIntegration} from '../module/systemIntegration'

const mapDispatchToProps= {
    SystemIntegrationModal,
    BindSystemIntegrationTypes,
    AddSystemIntegration,
    SelectedSystemIntegrationType
 }

const mapStateToProps = (state) => ({
  systemIntegration: state.systemIntegration
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'SystemIntegrationForm',  //Form name is first form
    destroyOnUnmount: false,    
})(SystemIntegration))
