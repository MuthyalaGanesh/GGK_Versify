import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../validations/basicInfoValidation'

export class BasicInfo extends React.Component {
  constructor(props) {
    super(props)    
  }
  logresults = function(values){
console.log("Values:",values);
  }
  render(){
      return(
<div className="box" style={{marginBottom:'20px'}}>
    <div className="box-header">
        <h3 className="box-title">Basic Inforamtion</h3>
        <div className="box-tools pull-right">
            &nbsp;
        </div>
    </div>
    <div className="box-body">
        <div className="margin-bottom-sm padding-top">
            <div className="row">
                <form onSubmit={this.props.handleSubmit(this.logresults)}>
                    <div className="col-sm-12 col-md-6 form-group">
                        <div className="col-sm-5 col-md-5">
                            <label className="control-label" for="Name"> Name </label>
                        </div>
                        <div className="col-sm-7 col-md-7">
                            <div className="col-sm-7 col-md-7">
                                <Field name="locationName"
                                       type="text" component="input" value={this.props.locationName} className="form-control"
                                       placeholder="Location Name" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 form-group">
                        <div className="col-sm-5 col-md-5">
                            <label className="control-label" for="AllowOutages"> AllowOutages </label>
                        </div>
                        <div className="col-sm-7 col-md-7">
                            <div className="col-sm-7 col-md-7">
                                <Field name="allowOutages" id="allowOutages" value={this.props.allowOutages} component="input" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 form-group">
                        <div className="col-sm-5 col-md-5">
                            <label className="control-label" for="Parent"> Parent </label>
                        </div>
                        <div className="col-sm-7 col-md-7">
                            <div className="col-sm-7 col-md-7">
                                <Field name="parentLocation"
                                       type="text" component="input" value={this.props.parentLocation} className="form-control"
                                       placeholder="Parent Location Name" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 form-group">
                        <div className="col-sm-5 col-md-5">
                            <label className="control-label" for="Type"> Type </label>
                        </div>
                        <div className="col-sm-7 col-md-7">
                            <div className="col-sm-7 col-md-7">
                              <Field name="type" value={this.props.type} component="select">
            <option></option>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
                                <Field name="type"
                                       type="text" component="input"  className="form-control"
                                       placeholder="Type Name" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 margin-bottom-lg">
                        <strong>Basic Info</strong> {this.props.name} -{this.props.allowOutages} -{this.props.parentLocation}
                        - {this.props.type}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
)}
}
export default reduxForm({
  form: 'LocationWizard',  //Form name is first form
  destroyOnUnmount: false,
  validate
})(BasicInfo)



