import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap/lib'
import 'styles/unitCharacteristicsStyles.scss'
import 'styles/widgetStyle.scss'
import DatePickerField from '../../../../../components/DatePicker/DatePickerField'
import InputField from '../../../../../components/InputField/InputField'
import TextAreaField from '../../../../../components/TextAreaField/TextAreaField'
import AddModal from './AddModalComponent'

export const UnitCharacteristics = (props) => {
    const unitCharacteristicsData = props.unitCharacteristics;
    return (
        <div>

            <Panel header=
                {
                    <div>
                        <label>Unit Characteristics</label>
                        <OverlayTrigger placement="top" overlay={
                            <Tooltip id="tooltip">
                                <strong>Add Unit Charateristic</strong>
                            </Tooltip>}>
                            <span className="fa fa-plus-circle fa-2x" onClick={props.togglingAddModal}>
                            </span>
                        </OverlayTrigger>
                    </div>
                }
                >

                <div className={unitCharacteristicsData.selectedunitCharacteristics && unitCharacteristicsData.selectedunitCharacteristics.length > 0 ? "show" : "hide"}>
                    <Table id="results" striped bordered condensed hover responsive>
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
                                unitCharacteristicsData.selectedunitCharacteristics.map((uc, index) =>
                                    (<tr key={uc.Name}>
                                        <td className="text-align-col">{uc.Name}</td>
                                        <td className="text-align-col">{uc.DisplayName}</td>
                                        <td>{uc.Description}</td>
                                        <td>{uc.Value}</td>
                                        <td className="text-align-col">{uc.UCM}</td>
                                        <td>{uc.EffectiveStartDate}</td>
                                        <td>{uc.EffectiveEndDate}</td>
                                        <td className="text-align-col">
                                            <OverlayTrigger placement="left" overlay={
                                                <Tooltip id="tooltip">
                                                    <strong>Edit {uc.Name}</strong>
                                                </Tooltip>}>
                                                <i className="fa fa-edit fa-2x" onClick={() => { props.makeEditable(index) } }></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip">
                                                    <strong>Delete {uc.Name}</strong>
                                                </Tooltip>}>
                                                <i className="fa fa-trash-o fa-2x" onClick={() => { props.deleteConfirmation(index) } }></i>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>))
                            }
                        </tbody>
                    </Table>
                </div>
            </Panel>

            <Modal show={props.unitCharacteristics.showEditModal}>
                <form>
                    <Modal.Header>
                        <Modal.Title>Edit </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <div className="row">
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Unit Characteristic Name</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="charateristicName"
                                        defaultvalue={props.unitCharacteristics.editableUnitCharacter.Name}>
                                    </Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Display name</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="displayNameLabel"
                                        defaultvalue={props.unitCharacteristics.editableUnitCharacter.DisplayName}>
                                    </Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Description</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={TextAreaField} readOnly={true}
                                        className="form-control" name="descriptionLabel" readOnly={true}
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.Description} rows="4">
                                    </Field>
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
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="UCMLabel"
                                        defaultvalue={props.unitCharacteristics.editableUnitCharacter.UCM}>
                                    </Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Effective start date</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DatePickerField} name="effectiveStartDate"
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.EffectiveStartDate}></Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Effective end date</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DatePickerField} name="effectiveEndDate"
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.EffectiveEndDate}></Field>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="btn btn-warning" type="button"  onClick={props.makeEditable}>Close</Button>
                        <Button className="btn btn-success" type="button" onClick={props.updateRow}>Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>
   
            <AddModal 
                    unitCharacteristicsData={unitCharacteristicsData}
                    showModal={props.unitCharacteristics.showModal} 
                    onchange={props.characteristicNameSelected} 
                    togglingAddModal={props.togglingAddModal} 
                    AddUnitCharateristic={props.AddUnitCharateristic}/>
   
                    <Modal show={props.unitCharacteristics.showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure, want to delete this unit charateristic?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-warning" type="button"  onClick={props.deleteConfirmation}>Close</Button>
                    <Button className="btn btn-danger" type="button"  onClick={props.DeleteUnitCharateristic}>Delete</Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}
export default UnitCharacteristics