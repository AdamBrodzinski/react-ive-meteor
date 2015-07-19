TestUtils = React.addons.TestUtils;
Simulate = TestUtils.Simulate;

renderComponent = function (comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
};

simulateClickOn = function($el) {
  React.addons.TestUtils.Simulate.click($el[0]);
};
