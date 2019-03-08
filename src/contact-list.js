import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addContact, receiveContactList } from './actions/contactActions.js';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { Field, reduxForm, reset, change as changeFieldValue} from 'redux-form';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import React from 'react';
import * as FormHelper from './utils/FormHelper';
import * as FormValidator from './utils/FormValidator';

class ContactList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = ()=> { 
        
    }

    render=()=> {
        const {
            handleSubmit, pristine, invalid, errors, submitted, submitting, successful, record, fieldDisabled
        } = this.props;
        return (
            <div className="">
                <div className="container-fluid">
                    <Row>
                        <Col sm={6} className="contact-list">
                            {this.props.contacts.length  > 0 ?
                                    this.renderData(this.props.contacts)
                                :
                                    <div className="">
                                        No Data
                                    </div>
                            }
                        </Col>
                        <Col sm={6}>
                            <div className="add-contact-form">
                                <form id="addContactInfoForm" onSubmit={handleSubmit(this.submitContactDetails)}>
                                    <Row>
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Enter Name"
                                            component={FormHelper.renderTextField}
                                            isRequired={true}
                                            label="Name"
                                            validate={[FormValidator.required]}
                                            fieldDisabled={false}
                                            columnClass="6"
                                        />
                                        <Field
                                            name="mobile"
                                            type="text"
                                            placeholder="Enter Mobile Number"
                                            component={FormHelper.renderTextField}
                                            isRequired={true}
                                            label="Mobile"
                                            validate={[FormValidator.required, FormValidator.phoneNumber]}
                                            fieldDisabled={false}
                                            columnClass="6"
                                        />
                                        <Field
                                            name="email"
                                            type="text"
                                            placeholder="Enter Email Address"
                                            component={FormHelper.renderTextField}
                                            isRequired={true}
                                            label="Email"
                                            validate={[FormValidator.required, FormValidator.email]}
                                            fieldDisabled={false}
                                            columnClass="6"
                                        />
                                        
                                        <Field
                                            name="address"
                                            type="textarea"
                                            placeholder="Address"
                                            component={FormHelper.renderTextAreaField}
                                            label="Address"
                                            fieldDisabled={false}
                                            columnClass="8"
                                        />
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button className="btn-secondary" onClick={this.resetForm} type="button" >
                                                    Cancel
                                                </Button>
                                                <Button className="btn-primary" type="submit" >
                                                    Submit
                                                </Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Col>
                        
                    </Row>
                </div>
            </div>
        );
    }

    renderData=(contacts)=> {
        let contactArr = sortBy(contacts, contact => contact.name);
        console.log(contactArr)
        return contactArr.map((contact, index)=>{
            return <div className="contact" key={index}>
                  <strong>{contact.name}</strong>
                  <small>{contact.mobile}</small>
                  <small>{contact.email}</small>
                  <p>{contact.address}</p>
              </div>
          })
    }

    submitContactDetails=(details)=>{
        this.props.addContact(details);
        this.resetForm();
    }

    /**
     * Handle to reset current form, should be invoked
     * once project details have been successfully submitted.
     */
    resetForm = ()=>{
        this.props.reset('addDeviceDetailsInfoForm');
    }


}

ContactList.propTypes = {
    contactActions: PropTypes.object,
    contacts: PropTypes.array,
    receiveContactList: PropTypes.func,
    addContact: PropTypes.func,
    reset: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        contacts: state.contact.contact.list.sort()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ receiveContactList, addContact}, dispatch)
}

const addContactInfoForm = reduxForm({
    form: 'addImageDetailsInfoForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
    keepDirtyOnReinitialize: true,

})(ContactList)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(addContactInfoForm);