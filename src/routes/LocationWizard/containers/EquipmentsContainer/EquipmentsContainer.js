import { reduxForm } from 'redux-form'
import {connect, dispatch} from 'react-redux'
import Equipments from '../../components/Equipments'
import {
    AddEquipment
    , ApplyEditEquipment
    , EditEquipment
    , DeleteEquipment} from '../../modules/equipments'

const mapDispatchToProps = {
    AddEquipment,
    ApplyEditEquipment,
    EditEquipment,
    DeleteEquipment
}

const mapStateToProps = (state) => ({
    equipments: state.equipments,
    formdata: state.form
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EquipmentsForm',  //Form name is first form
    destroyOnUnmount: false,
})(Equipments))
