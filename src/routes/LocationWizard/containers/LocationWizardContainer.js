import { connect } from 'react-redux'

import LocationWizard from '../components/LocationWizard'
import { showResults } from '../modules/locationWizard';

const mapDispatchToProps = {
  showResults
 }

const mapStateToProps = (state) => ({
  page:state.location.page
  })

export default connect(mapStateToProps, mapDispatchToProps)(LocationWizard)
