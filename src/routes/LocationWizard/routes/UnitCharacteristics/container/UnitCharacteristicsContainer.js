import { reduxForm } from 'redux-form'
import UnitCharacteristics from '../component/UnitCharacteristics'
import {connect,dispatch} from 'react-redux'
import {
            bindUnitCharateristics,
            togglingAddModal,
            makeEditable,
            deleteConfirmation,
            DeleteUnitCharateristic,
            updateRow,
            AddUnitCharateristic } from '../module/unitCharacteristics';


const mapDispatchToProps= {
    bindUnitCharateristics,
    togglingAddModal,
    makeEditable,
    deleteConfirmation,
    DeleteUnitCharateristic,
    updateRow,
    AddUnitCharateristic
 }

const mapStateToProps = (state) => ({
  unitCharacteristics: state.unitCharacteristics
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'UnitCharacteristicsForm',  //Form name is first form
    touchOnChange: true,
    destroyOnUnmount: false,  

})(UnitCharacteristics))
