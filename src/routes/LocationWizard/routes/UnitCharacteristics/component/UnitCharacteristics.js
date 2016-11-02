import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal} from 'react-bootstrap/lib'
// import 'react-widgets/dist/css/react-widgets.css'
import 'styles/unitCharacteristicsStyles.scss'
import 'public/assets/vendors/bootstrap/css/bootstrap.min.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import moment from 'moment';
import DatePicker from 'react-datepicker'
import DateInput from '../../CommonUtil/DatePicker/DateInput'
import FormField from '../../CommonUtil/DatePicker/FormField'

momentLocalizer(moment);

export const UnitCharacteristics = (props) => {
    const unitCharacteristicsData = props.unitCharacteristics;
    function getModalHeader(editableUnit) {
        if(editableUnit)
            return editableUnit.Name
        return "No header"    
    }
    function zeroTime(date) {
  date.setHours(0, 0, 0, 0)
  return date
}
const TODAY = moment();

    return (
        <div>
       
            <Panel header=
                {
                    <div>
                        <label>Unit Characteristics</label>
                        <span className="fa fa-plus-circle fa-2x"  onClick={props.togglingAddModal}></span>
                    </div>
                }
                >
                <Table id="results" striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Display name</th>
                            <th>Description</th>
                            <th>Value</th>
                            <th>UCM</th>
                            <th>Effective Start Date</th>
                            <th>Effective End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                  {    
                    unitCharacteristicsData.unitCharacteristics.map((uc,index) =>
                        (<tr key={uc.Name}>
                            <td className="text-align-col">{uc.Name}</td>
                            <td className="text-align-col">{uc.DisplayName}</td>
                            <td>{uc.Description}</td>
                            <td>{uc.Value}</td>
                            <td className="text-align-col">{uc.UCM}</td>
                            <td>{uc.EffectiveStartDate}</td>
                            <td>{uc.EffectiveEndDate}</td>
                            <td className="text-align-col">
                                <i className="fa fa-edit fa-2x" onClick={()=>{props.makeEditable(index)}}></i> 
                                <i className="fa fa-trash-o fa-2x" onClick={()=>{props.deleteConfirmation(index)}}></i>
                            </td>
                        </tr>))
                  }
                    </tbody>
                </Table>
            </Panel>
            
            <Modal show={props.unitCharacteristics.showEditModal}>
                <form onSubmit={props.updateRow}>
                        <Modal.Header>
                            <Modal.Title>Edit {getModalHeader(props.unitCharacteristics.editableUnitCharacter)}</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>

                             <div className="row">
                                    <div className="col-xs-12 form-group">
                                            <div className="col-xs-6">
                                                <label>Unit Characteristic Name</label>
                                            </div>
                                        <div className="col-xs-6">
                                            <input className="form-control" readOnly={true} value={props.unitCharacteristics.editableUnitCharacter.Name}/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Display name</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <input className="form-control" readOnly={true} value={props.unitCharacteristics.editableUnitCharacter.DisplayName}/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Description</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <textarea rows="4" className="form-control" readOnly={true}>{props.unitCharacteristics.editableUnitCharacter.Description}</textarea>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Value</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <Field component="input" value={props.unitCharacteristics.editableUnitCharacter.Value}
                                                     name="ucvalue" className="form-control">
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>UCM</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <input className="form-control" readOnly={true} value={props.unitCharacteristics.editableUnitCharacter.UCM}/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Effective start date</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <DateInput value={props.unitCharacteristics.startDate} field={props.fields}/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Effective end date</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <DateInput value={props.unitCharacteristics.startDate} field={props.fields}/>
                                        </div>
                                    </div>
                            </div>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button className="btn btn-warning" onClick={()=>{props.makeEditable()}}>Close</Button>
                            <Button className="btn btn-success" type="submit">Update</Button>
                        </Modal.Footer>
                </form>
            </Modal>
            <Modal show={props.unitCharacteristics.showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Are you sure, want to delete this unit charateristic?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-warning" onClick={props.deleteConfirmation}>Close</Button>
                    <Button className="btn btn-danger" onClick={props.DeleteUnitCharateristic}>Delete</Button>
                </Modal.Footer>
            </Modal>
              <Modal show={props.unitCharacteristics.showModal}>
                    <form onSubmit={props.AddUnitCharateristic}>
                        <Modal.Header>
                            <Modal.Title>New Unit characteristic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                    <div className="col-xs-12 form-group">
                                            <div className="col-xs-6">
                                                <label>Unit Characteristic Name</label>
                                            </div>
                                        <div className="col-xs-6">
                                            <Field component="select" name="charateristicName"  className="form-control" onChange={props.characteristicNameSelected}>
                                            <option value="">Select Unit Character Name</option>

                                            {
                                                unitCharacteristicsData.unitCharacteristics.map((uc,index)=>
                                                                (<option value={uc.Name} key={uc.index}>{uc.Name}</option>))
                                            }
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Display name</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <input readOnly={true} name="displayNameLabel" className="form-control" value={props.unitCharacteristics.displayNameLabel}/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Description</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <textarea rows="4" component="label" type="label" name="descriptionLabel" className="form-control">
                                                {props.unitCharacteristics.descriptionLabel}
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Value</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <Field component="input" type="text" name="ucvalue" className="form-control"></Field>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>UCM</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <input readOnly={true} name="UCMLabel" className="form-control" value={props.unitCharacteristics.UCMLabel}/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Effective start date</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <DateInput value={props.unitCharacteristics.startDate} field={props.fields} name="effectiveStartDate"/>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">
                                            <label>Effective end date</label>
                                        </div>
                                        <div className="col-xs-6">
                                            <DateInput value={props.unitCharacteristics.startDate} field={props.fields} name="effectiveEndDate"/>
                                        </div>
                                    </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-warning" onClick={props.togglingAddModal}>Cancel</button>
                            <button className="btn btn-success" type="submit">Add</button>
                        </Modal.Footer>
                    </form>
            </Modal>
        </div>
    )
}
export default UnitCharacteristics