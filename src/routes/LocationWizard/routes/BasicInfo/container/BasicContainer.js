import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import BasicInfo from '../component/BasicInfo'
import validate from '../validations/basicInfoValidation'
import {test} from '../module/basicInfo'
//import { bindLocationTypes } from '../module/basiInfo';


const mapDispatchToProps = (dispatch)=>({
 basicInfoSubmit:(values)=>{ debugger;console.log("basicInfoSubmit-",values);alert(JSON.stringify(values)) },
 onchange:(e)=>{
   
   console.log('fsdfdsf')
   
    dispatch(test()) }
 })

const mapStateToProps = (state) => ({
  location:state.location,

  data :2
  })

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'BasicInfoForm',  //Form name is first form
    destroyOnUnmount: false,
    validate
})(BasicInfo));