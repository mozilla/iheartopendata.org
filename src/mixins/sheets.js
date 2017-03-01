var BasketMixin = {
  mixins: [require('./petition.js')],
  petitionSuccess: function(result) {
    this.doPetitionSuccess(result, '/share/');
  },
  sheets: function(props) {
    this.doPetition("/api/petition/sheets", props, this.petitionSuccess, this.petitionError);
  }
};

module.exports = BasketMixin;

