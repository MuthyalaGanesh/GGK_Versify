import {
	reduxForm
} from 'redux-form'
import {
	connect
} from 'react-redux'
import Gateways from '../../components/Gateways'
import {
	getGateways,
	AddGatewayModalToggle,
	AddGateway,
	EditGateway,
	UpdateGateway,
	DeleteGateway,
	ConfirmGatewayDelete,
	CloseGatewayConfirmation
} from '../../modules/gateways';

const mapStateToProps = (state) => ({
	gateways: state.gateways,
	formdata: state.form
})


const mapDispatchToProps = {
	getGateways,
	AddGatewayModalToggle,
	AddGateway,
	EditGateway,
	UpdateGateway,
	DeleteGateway,
	ConfirmGatewayDelete,
	CloseGatewayConfirmation
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'GatewayForm',
	destroyOnUnmount: false
})(Gateways));