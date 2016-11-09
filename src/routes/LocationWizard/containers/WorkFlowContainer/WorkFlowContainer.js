import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import WorkFlow from '../../components/WorkFlow'
import { bindWorkflowItems } from '../../modules/workFlow';

const mapStateToProps = (state) => ({
  workFlow : state.workFlows
})

const mapDispatchToProps = {
	bindWorkflowItems
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'WorkFlowForm',  //Form name is first form
    destroyOnUnmount: false,
})(WorkFlow));