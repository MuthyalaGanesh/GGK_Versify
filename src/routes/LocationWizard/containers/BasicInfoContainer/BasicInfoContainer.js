import {
    reduxForm
} from 'redux-form'
import {
    connect
} from 'react-redux'
import BasicInfo from '../../components/BasicInfo'
import validate from '../../validations/basicInfoValidation'

import {
    onParentLoCationSelect,
    BindInitialValues
} from '../../modules/basicInfo';


const mapDispatchToProps = {
    BindInitialValues
}

const mapStateToProps = (state) => ({
    location: state.location,
    basic: state.basic,
    formdata: state.form,
    initialValues: state.basic.BasicInfo
})

function prePareDefult() {

}



export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'BasicInfoForm', //Form name is first form
    destroyOnUnmount: false,
    
    validate
})(BasicInfo));