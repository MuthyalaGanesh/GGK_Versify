import {
	reduxForm
} from 'redux-form'
import {
	connect
} from 'react-redux'
import DataHistorian from '../../components/DataHistorian'
import {
	getGateways,
	getMetrics,
	getDataHistorians,
	AddDataHistorianModalToggle,
	ClickedIsDigitalTag,
	AddDataHistorian,
	UpdateAddDataHistorian,
	EditDataHistorian,
	DeleteDataHistorian,
	ConfirmDataDelete,
	CloseDataConfirmation
} from '../../modules/dataHistorian';


const mapStateToProps = (state) => ({
	dataHistorian: state.dataHistorian,
	formdata: state.form
})

const mapDispatchToProps = {
	getGateways,
	getMetrics,
	getDataHistorians,
	AddDataHistorianModalToggle,
	ClickedIsDigitalTag,
	AddDataHistorian,
	UpdateAddDataHistorian,
	EditDataHistorian,
	DeleteDataHistorian,
	ConfirmDataDelete,
	CloseDataConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'DataHistorianForm', //Form name is first form
	destroyOnUnmount: false,
})(DataHistorian));