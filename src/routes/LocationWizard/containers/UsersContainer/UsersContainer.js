import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import Users from '../../components/Users'
import { bindUserInfo,bindContactToRole,bindRoleToContact,selectRole,selectContact,AddContactModalToggle} from '../../modules/user';


const mapStateToProps = (state) => ({
  userInfo : state.users
})

const mapDispatchToProps = {
	bindUserInfo,
	bindContactToRole,
	bindRoleToContact,
	selectRole,
	selectContact,
	AddContactModalToggle
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'UsersForm',  //Form name is first form
    destroyOnUnmount: false,
})(Users));

