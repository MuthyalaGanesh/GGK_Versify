import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import { Checkbox, RadioButtonGroup, SelectField, TextField, Toggle } from 'redux-form-material-ui'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export class CredentialsManagement extends React.Component {
    constructor(props) {
        super(props)
    }
    logresults(values) {
        console.log("Values:", values);
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) }
    }
    render() {
        return (
            <div>
                <Panel header={<ControlLabel>Credentials and Identifiers</ControlLabel>}>
                    <div className="row">
                        <form onSubmit={this.props.handleSubmit(this.logresults) }>
                            <div className="col-sm-12 form-group">
                                <div className="col-sm-8">
                                    <Field name="utility"
                                        component={TextField} value={this.props.utility}
                                        hintText="Utility" floatingLabelText="GADS Utility"/>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="col-sm-8">
                                    <Field name="unitId"
                                        component={TextField} value={this.props.unitId}
                                        hintText="Unit ID" floatingLabelText="GADS Unit ID"/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </Panel>
            </div>

        )
    }
}

CredentialsManagement.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'LocationWizard',  //Form name is first form
    destroyOnUnmount: false,
    //   validate
})(CredentialsManagement)



