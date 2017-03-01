import React from 'react';
import reactGA from 'react-ga';
import submit from '../lib/submit';

var NOT_SUBMITTING = 0;
var PETITION_SUBMITTING = 2;

var PetitionMixin = {
  contextTypes: {
    intl: React.PropTypes.object
  },
  doPetitionSuccess: function(result, location) {
    reactGA.event({
      category: "Petition",
      action: "Submitted the form",
      label: "open-data-day"
    });
    var page = '/' + this.context.intl.locale + location;
    window.location = page;
  },
  petitionError: function(result) {
    this.setState({
      submitting: NOT_SUBMITTING,
      petitionError: this.context.intl.formatMessage({id: 'try_again_later'})
    });
  },
  doPetition: function(url, props, success, error) {
    this.setState({
      submitting: PETITION_SUBMITTING,
      petitionError: ""
    });
    props.locale = this.context.intl.locale;
    submit(url, props, success, error);
  }
};

module.exports = PetitionMixin;
