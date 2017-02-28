import React from 'react';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="form-body-container">
        <div className="form-body">
          <div className="form-description">
            {this.context.intl.formatMessage({id: 'main_description'})}
          </div>
          <p>
            {this.context.intl.formatMessage({id: 'second_description'})}
          </p>
          <h4>
            {this.context.intl.formatMessage({id: 'question_1'})}
          </h4>
          <p>
            {this.context.intl.formatMessage({id: 'answer_1'})}
          </p>
          <h4>
            {this.context.intl.formatMessage({id: 'question_2'})}
          </h4>
          <p>
            {this.context.intl.formatMessage({id: 'answer_2'})}
          </p>
          <h4>
            {this.context.intl.formatMessage({id: 'question_3'})}
          </h4>
          <p>
            {this.context.intl.formatMessage({id: 'answer_3'})}
          </p>
        </div>
      </div>
    );
  }
});
