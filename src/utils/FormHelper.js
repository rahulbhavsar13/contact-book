import React from 'react';
import { Col, FormGroup, FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';
// import ReactTelInput from 'react-telephone-input';
// import Typeahead from '../components/common/typeahead/Typeahead';
// import JSONEditor from '../components/common/editors/json';
// import * as FormValidator from './FormValidator';
// import Icon from '../assets/icons';
// import Flags from '../assets/images/flags.png';


/**
 * Helper to build a dropdown form component.
 */
export const renderDropdown = ({ input, isRequired, options, type, label, placeholder, fieldDisabled, columnClass,
    onChange, meta: { handleChange, touched, error } }) => (
        <Col sm={Number(columnClass)}>
            <FormGroup >
                {label &&
                    <label className={isRequired && !fieldDisabled ? "required" : ''}>{label} </label>
                }
                {
                    input.value || !fieldDisabled ?
                        <FormControl
                            disabled={fieldDisabled}
                            type={type}
                            onChange={(selection) => {
                                if (onChange) {
                                    onChange(selection);
                                }
                                if (handleChange) {
                                    handleChange();
                                }
                            }}
                            componentClass="select"
                            className={!fieldDisabled && touched && error ? 'error' : ''}
                            {...input}>
                            {placeholder ? <option value="">{fieldDisabled ? input.value && options && options.length > 0 && options.find((option) => option.value === input.value) ? input.value : 'Not Available' : placeholder}</option> : ''}
                            {options.map((option, index) => (

                                <option value={option.value} key={option.value+"_"+index} selected={option.default ? 'selected' : ''}>
                                    {option.display}
                                </option>
                            ))}
                        </FormControl>
                        : <span className="not-available">"Not Available"</span>
                }
            </FormGroup>
        </Col>
    );

/**
 * Helper to build a dropdown form component.
 */
export const renderDefaultDropdown = ({ input, isRequired, options, type, label, placeholder, fieldDisabled, columnClass,
    onChange, meta: { handleChange, touched, error } }) => (
        <Col sm={Number(columnClass)}>
            <FormGroup >
                {label &&
                    <label className={isRequired && !fieldDisabled ? "required" : ''}>{label} </label>
                }
                
                <FormControl
                    disabled={fieldDisabled}
                    type={type}
                    placeholder={fieldDisabled ? input.value === "" ? 'Not Available' : input.value : placeholder || label}
                    onChange={(selection) => {
                        if (onChange) {
                            onChange(selection);
                        }
                        if (handleChange) {
                            handleChange();
                        }
                    }}
                    componentClass="select"
                    className={!fieldDisabled && touched && error ? 'error' : ''}
                    {...input}>
                    {placeholder ? <option value="">{placeholder}</option> : ''}
                    {options.map(option => (

                        <option value={option.value} key={option.value} selected={option.default ? 'selected' : ''}>
                            {option.display}
                        </option>
                    ))}
                </FormControl>
            
            </FormGroup>
        </Col>
    );

/**
 * Helper to build a dropdown form component with i18n supported contents.
 */
export const renderFormattedDropdown = ({ input, isRequired, options, type, label, placeholder, fieldDisabled, columnClass,
    onChange, meta: { handleChange, touched, error } }) => (
        <Col sm={Number(columnClass)}>
            <FormGroup >
                <label className={isRequired && !fieldDisabled ? "required" : ''}>{label} </label>

                {
                    fieldDisabled && input.value === "" ? 
                        <span className="not-available">Not Available</span>
                    : 
                    <FormControl
                        disabled={fieldDisabled}
                        type={type}
                        placeholder={placeholder}
                        onChange={(selection) => {
                            if (onChange) {
                                onChange(selection);
                            }
                            handleChange();
                        }}
                        componentClass="select"
                        className={!fieldDisabled && touched && error ? 'error' : ''}
                        {...input}>
                        {
                            placeholder ? <option value="">{placeholder}</option> : ""
                        }
                        {
                            options.map((option, index) => (
                                <option id={option.display} key={option.value + '-' + index} value={option.value} />
                            ))
                        }
                    </FormControl>
                }
                
            </FormGroup>
        </Col>
    );

/**
 * Helper to build a text component.
 */
export const renderTextField = ({ input, isRequired, defaultValue, label, type, placeholder, fieldDisabled, columnClass, meta: { handleChange, handleBlur, touched, error } }) => (
    <Col sm={Number(columnClass)}>
        <FormGroup >
            {label &&
                <label className={isRequired && !fieldDisabled ? "required" : ''}>{label}</label>
            }
            {
                input.value !== "" || !fieldDisabled ?
                    <FormControl
                        readOnly={fieldDisabled}
                        type={type}
                        defaultValue={input && input.value || defaultValue}
                        placeholder={fieldDisabled ? input.value === "" ? 'Not Available' : input.value : placeholder || label}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={!fieldDisabled && touched && error ? 'error' : ''}
                        {...input}
                    />
                :
                <span className="not-available">Not Available</span>
            }
            
        </FormGroup>
    </Col>
);

/**
 * Helper to build a text area component.
 */
export const renderTextAreaField = ({ input, isRequired, label, type, placeholder, fieldDisabled, informationIcon, columnClass, rows, meta: { handleChange, touched, error } }) => (
    <Col sm={Number(columnClass)}>
        <FormGroup >
            <label className={[(isRequired && !fieldDisabled ? "required " : ' '), (informationIcon ? ' icon-label' : '')]}>{label}</label>
            {informationIcon || ''}
            {
                input.value !== "" || !fieldDisabled ?
                    <FormControl
                        componentClass={type}
                        readOnly={fieldDisabled}
                        placeholder={fieldDisabled ? input.value === "" ? 'Not Available' : input.value : placeholder || label}
                        onChange={handleChange}
                        className={!fieldDisabled && touched && error ? 'error' : ''}
                        rows={rows}
                        as={type}
                        {...input}
                    />
                :
                <span className="not-available">Not Available</span>
            }
            
        </FormGroup>
    </Col>
);


/**
 * Helper to build radio buttons component.
 */
export const renderToggleRadioButtons = ({ input, isRequired, options, label, type, fieldDisabled, className, columnClass,
    onRadioChange, meta: { touched, error } }) => {

    return (
        <Col className="radio-group" sm={Number(columnClass)}>
            <FormGroup >

                <label className={isRequired && !fieldDisabled ? "required" : ''}>{label}</label>

                <FormGroup
                    readOnly={fieldDisabled}
                    key={input.name + "-" + type}
                    type={type}
                    className={className}>
                    <span className="radio-group-horizontal">
                        {
                            options.map((option, index) => (
                                <span key={index} className="radio-option">
                                    <Field name={input.name} component="input" type={type} value={option.value} disabled={fieldDisabled}
                                        onChange={onRadioChange} />
                                    &nbsp;<span>{option.display}</span>
                                </span>
                            ))
                        }
                    </span>
                </FormGroup>

            </FormGroup>
        </Col>
    )
};


/**
 * Helper to build radio buttons.
 */
export const renderRadioButtons = ({ input, isRequired, options, label, type, fieldDisabled, className, columnClass,
    onRadioChange, meta: { touched, error } }) => {

    return (

        <Col sm={Number(columnClass)}>
            <FormGroup >

                <label className={isRequired && !fieldDisabled ? "required" : ''}>{label}</label>

                <FormGroup
                    readOnly={fieldDisabled}
                    key={input.name + "-" + type}
                    type={type}
                    className={className}>
                    <span className="radio-field-groups">
                        {
                            options.map((option, index) => (
                                <label key={index} className="radio" >
                                    <span>{option.display}</span>
                                    <Field name={input.name} component="input" type={type} value={option.value} disabled={fieldDisabled} onChange={onRadioChange} />
                                    <span className="checkround"></span>
                                </label>
                            ))
                        }
                    </span>
                </FormGroup>

            </FormGroup>
        </Col>
    )
};

