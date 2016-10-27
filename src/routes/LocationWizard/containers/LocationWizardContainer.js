import { connect } from 'react-redux'

import LocationWizard from '../components/LocationWizard'
import { saveCompleteLocationWizard } from '../modules/locationWizard';

function submit (values){ 

 }
function onchange(e){ 
console.log(e.target.value,e.target.name)
}
const mapDispatchToProps = (dispatch)=>({
 submit:(values)=>{ alert(JSON.stringify(values)) },
 onchange:(e)=>{  console.log(e.target.value,e.target.name) }
 })

const mapStateToProps = (state) => ({
  location:state.location,
  //data :state.form.BasicInfoForm.values.parentLocation
  })

export default connect(mapStateToProps, mapDispatchToProps)(LocationWizard)
