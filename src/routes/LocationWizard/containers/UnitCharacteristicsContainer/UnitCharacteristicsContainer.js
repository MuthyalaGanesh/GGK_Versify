import { reduxForm } from 'redux-form'
import UnitCharacteristics from '../../components/UnitCharacteristics'
import { connect } from 'react-redux'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import moment from 'moment'
import {
    bindUnitCharateristics,
    deleteConfirmation,
    DeleteUnitCharateristic,
    updateRow,
    AddUnitCharateristic,
    characteristicNameSelected,
    removeEditableAttribute,
    ToggleAddEditModal,edit ,
  pushEditableAtribute} from '../../modules/unitCharacteristics'

const mapDispatchToProps = {
  bindUnitCharateristics,
  deleteConfirmation,
  DeleteUnitCharateristic,
  updateRow,
  AddUnitCharateristic,
  characteristicNameSelected,
  removeEditableAttribute,
  ToggleAddEditModal,edit,
  pushEditableAtribute
}

const mapStateToProps = (state) => ({
  unitCharacteristics: state.unitCharacteristics,
  formdata: state.form
})

/** moment localizer for datepicker **/
momentLocalizer(moment)
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'UnitCharacteristicsForm',  
  touchOnChange: true
})(UnitCharacteristics))
