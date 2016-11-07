import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import Gateway from '../component/Gateway'
import { getGateways,AddGatewayModalToggle,AddGateway,EditGateway,UpdateGateway,DeleteGateway} from '../module/gateway';

const mapStateToProps = (state) => ({
  gateways : state.gateways,
  formdata : state.form
})


const mapDispatchToProps = {
	getGateways,
	AddGatewayModalToggle,
	AddGateway,
	EditGateway,
	UpdateGateway,
	DeleteGateway
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'GatewayForm',
    destroyOnUnmount: true

    
})(Gateway));





