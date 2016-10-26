import React from 'react'
import BasicInfo from '../../LocationWizard/components/BasicInfo'

export class BodyLayout extends React.Component {

	render() {
	        var timezones = [
	            { code: "AST", value: "Atlantic Standard Time" },
	            { code: "EST", value: "Eastern Standard Time" }
	        ]

	        var types = [
	            { typeId: 1, type: "Aggregate" },
	            { typeId: 2, type: "Control Area" },
	            { typeId: 3, type: "Circuit breaker" },
	            { typeId: 4, type: "Configuration" },
	            { typeId: 5, type: "Fleet" }
	        ]
	        var locations = [
	            { code: "UPL", locationName: "Uppal" },
	            { code: "WR", locationName: "Waverock" }
	        ]

	        return (
	        		<div className="row" style={{paddingTop:'50px'}}>
	    				<div className="col-md-2">
	    					LeftMenu Space.
	    				</div>
	    				<div className="col-md-8">
	    	  				<BasicInfo timezones={timezones} types={types} locations={locations}/>
	    				</div>
	    				<div className="col-md-2">
	    					Right side gap
	    				</div>
	  				</div>
	        )
	    }
}

export default BodyLayout
