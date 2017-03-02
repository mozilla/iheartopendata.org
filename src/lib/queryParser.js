function isNumber(item) {
  return !isNaN(parseInt(item, 10));
}

module.exports = function(queryString, locale) {
  queryString = queryString || {};
  var test = queryString.test;
  var subscribed = false;

  if (queryString.subscribed === "1") {
    subscribed = true;
  }

  if (test && toString.call(test) === "[object Array]") {
    test = test.join(" ");
  }

  return {
    initialState: {
      firstName: queryString.firstName || "",
      lastName: queryString.lastName || "",
      email: queryString.email || ""
    },
    values: {
      test: test,
      subscribed: subscribed
    }
  };
};
