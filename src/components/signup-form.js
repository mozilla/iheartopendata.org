import React from 'react';
import { FormattedMessage } from 'react-intl';
import { setEmailError, setEmail, setFirstName, setLastName } from '../actions';
import { connect } from 'react-redux';
import classnames from "classnames";
import ga from 'react-ga';

var NOT_SUBMITTING = 0;
var PETITION_SUBMITTING = 2;

var Signup = React.createClass({
  mixins: [require('../mixins/sheets.js')],
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      petitionError: "",
      submitting: NOT_SUBMITTING
    };
  },
  firstNameChange: function(e) {
    this.props.setFirstName(e.target.value);
  },
  lastNameChange: function(e) {
    this.props.setLastName(e.target.value);
  },
  emailChange: function(e) {
    this.props.setEmail(e.target.value);
  },
  onSubmit: function() {
    var valid = true;

    if (this.state.submitting !== NOT_SUBMITTING) {
      return;
    }

    if (!this.props.email.trim()) {
      valid = false;
      this.props.setEmailError(this.context.intl.formatMessage({id: "please_complete"}));
    } else if (!this.emailInput.validity.valid) {
      valid = false;
      this.props.setEmailError(this.context.intl.formatMessage({id: "email_invalid"}));
    }

    if (valid) {
      this.sheets({
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName
      });
      this.basket({
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName
      });
      ga.event({
        category: "Signup",
        action: "Submitted the form",
        label: "OpenData"
      }); 
    }
  },
  render: function() {
    var emailClassName = classnames({
      "invalid": !!this.props.emailError
    });
    var buttonClassName = classnames(`button`, {
      "submitting": this.state.submitting === PETITION_SUBMITTING,
      "arrow": this.state.submitting === NOT_SUBMITTING
    });
    var buttonText = this.context.intl.formatMessage({id: 'sign_up_button'});
    if (this.state.submitting) {
      buttonText = ``;
    }

    return (
      <div className="signup-form-container">
        <div id="get-involved" className="nav-anchor nav-offset"></div>
        <div className="signup-form">
          <h3>
            {this.context.intl.formatMessage({id: 'take_action_headline2'})}
          </h3>
          <p>
            {this.context.intl.formatMessage({id: 'take_action_description'})}
          </p>
          <p>
            {this.context.intl.formatMessage({id: 'take_action_description_next'})}
          </p>
          <input autoComplete="off" type='text' value={this.props.firstName} onChange={this.firstNameChange} placeholder={this.context.intl.formatMessage({id: 'first_name'})}/>
          <input autoComplete="off" type='text' value={this.props.lastName} onChange={this.lastNameChange} placeholder={this.context.intl.formatMessage({id: 'last_name'})}/>
          <input autoComplete="off" ref={(input) => { this.emailInput = input; }} type='email' className={emailClassName} value={this.props.email} onChange={this.emailChange} required placeholder={this.context.intl.formatMessage({id: 'email'})}/>
          <p className="error-message">{this.props.emailError}</p>
          <p className="error-message">{this.state.petitionError}</p>
          <p className="privacy-policy">
            <FormattedMessage
              id='sign_up_notice'
              values={{
                linkTerms: (<a href="https://www.mozilla.org/about/legal/terms/mozilla/">{this.context.intl.formatMessage({id: 'link_tos'})}</a>),
                linkPrivacyPolicy: (<a href="https://www.mozilla.org/privacy/">{this.context.intl.formatMessage({id: 'link_pp'})}</a>)
              }}
            />
          </p>
          <button onClick={this.onSubmit} className={buttonClassName}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
});

module.exports = connect(
function(state) {
  return {
    email: state.signupForm.email,
    emailError: state.signupForm.emailError,
    firstName: state.signupForm.firstName,
    lastName: state.signupForm.lastName
  };
},
function(dispatch) {
  return {
    setEmailError: function(data) {
      dispatch(setEmailError(data));
    },
    setEmail: function(data) {
      dispatch(setEmail(data));
    },
    setFirstName: function(data) {
      dispatch(setFirstName(data));
    },
    setLastName: function(data) {
      dispatch(setLastName(data));
    }
  };
})(Signup);
