import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import Users from '../../components/Users'
import { bindUserInfo} from '../../modules/user';


const mapStateToProps = (state) => ({
  userInfo : state.users
})

const mapDispatchToProps = {
	bindUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'UsersForm',  //Form name is first form
    destroyOnUnmount: false,
})(Users));

