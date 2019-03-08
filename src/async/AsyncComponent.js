import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../error';

/**
 * Common helper component that allows for asynchronous loading
 * of requested components.
 */
export default class AsyncComponent extends PureComponent {

  /**
   * Default constructor.
   * @param {Object} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    }
  }

  /**
   * Handle any component and/or data loading when mounting.
   * @override
   */
  componentWillMount() {
    if(!this.state.Component  && this.props.moduleProvider) {
      this.props.moduleProvider().then( ({Component}) => this.setState({ Component }));
    }
  }

  /**
   * Return Component content based on  Component
   * props value.
   * @override
   */
  getContent(){
    const { Component } = this.state;
    if (Component) {
      return <ErrorBoundary><Component {...this.props}/></ErrorBoundary>;
    } else {
      return <div className="bundle_loading">Loading...</div>;
    }
  }

  /**
   * Handle main rendering logic for the component.
   * @override
   */
  render() {
    return (
      <div className="async-wrapper">
        { this.getContent() }
      </div>
    );
  }
}

AsyncComponent.propTypes = {
  moduleProvider: PropTypes.func.isRequired
}