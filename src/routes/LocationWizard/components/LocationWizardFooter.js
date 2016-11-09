import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button} from 'react-bootstrap/lib'

export const LocationWizardFooter = (props) => {
    return(
			<div id="content_footer" className="content-footer" style={{'width':'83%'}}>
				<div className='col-md-12'>
					<div className="pull-right">
						<Button bsStyle="primary" onClick={props.saveCompleteLocationWizard}>Save</Button>
					</div>
				</div>
			</div>
    )
}
export default LocationWizardFooter
