import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import WorkFlow from '../component/WorkFlow'
import { bindWorkflowItems } from '../module/workFlow';

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