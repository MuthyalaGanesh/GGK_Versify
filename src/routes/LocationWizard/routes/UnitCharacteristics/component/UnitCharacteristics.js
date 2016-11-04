import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Popover, Button, Modal} from 'react-bootstrap/lib'
import 'styles/unitCharacteristicsStyles.scss'
import 'styles/widgetStyle.scss'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import DatePickerField from './DatePickerField'
import InputField from './InputField'
import TextAreaField from './TextAreaField'

export const UnitCharacteristics = (props) => {
    const unitCharacteristicsData = props.unitCharacteristics;
    return (
        <div>

            <Panel header=
                {
                    <div>
                        <label>Unit Characteristics</label>
                        <span className="fa fa-plus-circle fa-2x" onClick={props.togglingAddModal}></span>
                    </div>
                }
                >
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
                                        <i className="fa fa-edit fa-2x" onClick={() => { props.makeEditable(index) } }></i>
                                        <i className="fa fa-trash-o fa-2x" onClick={() => { props.deleteConfirmation(index) } }></i>
                                    </td>
                                </tr>))
                        }
                    </tbody>
                </Table>

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
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.Name}>
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
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.DisplayName}>
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
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.UCM}>
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
            <Modal show={props.unitCharacteristics.showModal}>
                <form onChange={(event) => { props.characteristicNameSelected(event) } }>
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
                                    <Field component="select" name="charateristicName" className="form-control">
                                        <option value="">Select Unit Charateristic</option>

                                        {
                                            unitCharacteristicsData.unSelectedUnitCharacteristics.map((uc, index) =>
                                                (<option value={uc.Name} key={index}>{uc.Name}</option>))
                                        }
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
                                        defaultValue={props.unitCharacteristics.displayNameLabel}>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Description</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={TextAreaField} readOnly={true}
                                        className="form-control" name="descriptionLabel"
                                        defaultValue={props.unitCharacteristics.descriptionLabel} rows="4">
                                    </Field>
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
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="UCMLabel"
                                        defaultValue={props.unitCharacteristics.UCMLabel}>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Effective start date</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DatePickerField} name="effectiveStartDate"></Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Effective end date</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DatePickerField} name="effectiveEndDate"></Field>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-warning" type="button" onClick={props.togglingAddModal}>Cancel</button>
                        <button className="btn btn-success" type="button" onClick={props.AddUnitCharateristic}>Add</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}
export default UnitCharacteristics