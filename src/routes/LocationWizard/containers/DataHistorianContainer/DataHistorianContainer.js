import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import DataHistorian from  '../../components/DataHistorian'
import {getGateways,getMetrics,getDataHistorians,AddDataHistorianModalToggle,AddDataHistorian,UpdateAddDataHistorian,EditDataHistorian,DeleteDataHistorian} from '../../modules/dataHistorian';


const mapStateToProps = (state) => ({
  dataHistorian : state.dataHistorian,
})

const mapDispatchToProps = {
	getGateways,
	getMetrics,
    getDataHistorians,
	AddDataHistorianModalToggle,
	AddDataHistorian,
	UpdateAddDataHistorian,
	EditDataHistorian,
	DeleteDataHistorian
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'DataHistorianForm',  //Form name is first form
    destroyOnUnmount: false,
})(DataHistorian));