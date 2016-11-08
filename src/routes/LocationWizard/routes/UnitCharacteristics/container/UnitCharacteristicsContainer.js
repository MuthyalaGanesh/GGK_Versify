import { reduxForm } from 'redux-form'
import UnitCharacteristics from '../component/UnitCharacteristics'
import {connect, dispatch} from 'react-redux'
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import moment from 'moment';
import {
    bindUnitCharateristics,
    togglingAddModal,
    makeEditable,
    deleteConfirmation,
    DeleteUnitCharateristic,
    updateRow,
    AddUnitCharateristic,
    characteristicNameSelected} from '../module/unitCharacteristics';


const mapDispatchToProps = {
    bindUnitCharateristics,
    togglingAddModal,
    makeEditable,
    deleteConfirmation,
    DeleteUnitCharateristic,
    updateRow,
    AddUnitCharateristic,
    characteristicNameSelected
}

const mapStateToProps = (state) => ({
    unitCharacteristics: state.unitCharacteristics
})

//moment localizer for datepicker
momentLocalizer(moment);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'UnitCharacteristicsForm',  //Form name is first form
    touchOnChange: true,
})(UnitCharacteristics))
