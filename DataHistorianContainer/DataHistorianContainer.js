import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import {DataHistorian,AddDataHistorianModalToggle} from '../../component/DataHistorian'

const mapStateToProps = (state) => ({
  dataHistorian : {}
})

const mapDispatchToProps = {
	AddDataHistorianModalToggle
}


export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'DataHistorianForm',  //Form name is first form
    destroyOnUnmount: false,
})(DataHistorian));