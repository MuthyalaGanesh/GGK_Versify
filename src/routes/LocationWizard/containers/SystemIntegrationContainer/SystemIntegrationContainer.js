import { reduxForm } from 'redux-form'
import {connect, dispatch} from 'react-redux'
import SystemIntegration from '../../components/SystemIntegration'
import {
    SystemIntegrationModal,
    BindSystemIntegrationTypes,
    SelectedSystemIntegrationType,
    AddSystemIntegration,
    deleteSystemIntegration,
    showNoResults,
    toggleTypeahead} from '../../modules/systemIntegration'

const mapDispatchToProps = {
    SystemIntegrationModal,
    BindSystemIntegrationTypes,
    AddSystemIntegration,
    SelectedSystemIntegrationType,
    deleteSystemIntegration,
    showNoResults,
    toggleTypeahead
}

const mapStateToProps = (state) => ({
    systemIntegration: state.systemIntegration,
    formdata: state.form
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'SystemIntegrationForm',  //Form name is first form
    destroyOnUnmount: false,
})(SystemIntegration))
