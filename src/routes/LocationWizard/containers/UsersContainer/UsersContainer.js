import {
	reduxForm
} from 'redux-form'
import {
	connect
} from 'react-redux'
import Users from '../../components/Users'
import {
	bindUserInfo,
	bindContactToRole,
	bindRoleToContact,
	selectRole,
	selectContact,
	AddContactModalToggle,
	selectAllContacts,
	selectAllRoles,
	unSelectAllContacts,
	unSelectAllRoles,
	saveNewContact,
	validateContact,
	clearSuccess,
	clearFailure
} from '../../modules/user';


const mapStateToProps = (state) => ({
	userInfo: state.users
})

const mapDispatchToProps = {
	bindUserInfo,
	bindContactToRole,
	bindRoleToContact,
	selectRole,
	selectContact,
	AddContactModalToggle,
	selectAllContacts,
	selectAllRoles,
	unSelectAllContacts,
	unSelectAllRoles,
	saveNewContact,
	validateContact,
	clearSuccess,
	clearFailure
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'UsersForm',
	destroyOnUnmount: false,
})(Users));