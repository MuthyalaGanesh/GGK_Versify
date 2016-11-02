import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import Users from '../component/Users'
import { bindUserInfo} from '../module/user';


const mapStateToProps = (state) => ({
  contacts : state.contacts,
  roles : state.roles
})

const mapDispatchToProps = {
	bindUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'UsersForm',  //Form name is first form
    destroyOnUnmount: false,
})(Users));

