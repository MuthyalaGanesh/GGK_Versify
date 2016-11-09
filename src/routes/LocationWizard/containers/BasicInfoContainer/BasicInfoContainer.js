import {
    reduxForm
} from 'redux-form'
import {
    connect
} from 'react-redux'
import BasicInfo from '../../components/BasicInfo'
import validate from '../../validations/basicInfoValidation'

import {
    onParentLoCationSelect,BindLocations
} from '../../modules/basicInfo';


const mapDispatchToProps = {
    
    BindLocations
}

const mapStateToProps = (state) => ({
    location: state.location,
    basic: state.basic,
    formdata: state.form
})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'BasicInfoForm', //Form name is first form
    destroyOnUnmount: false,
    initialValues: { locationName: 'Test Lcoation' },
    validate
})(BasicInfo));