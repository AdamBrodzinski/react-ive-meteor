/*global ParamsExample, renderComponent */

// note, see ../spec_helper.js for renderWithProps

describe("ParamsExample Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    defProps = {
      label: 'Check me',
    };

    renderWithProps = function(props) {
      component = renderComponent(ParamsExample, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it("should be mounted in DOM", function() {
    renderWithProps(defProps);
    expect($el.length).toEqual(1);
  });

  it("should have Step markup", function() {
    renderWithProps(defProps);
    expect($el.find('b').text()).toBe('Step:');
  });

  it("should display step number", function() {
    spyOn(FeedDomain, 'getStepParam').and.returnValue(44);
    renderWithProps(); // render after spying
    expect($el.find('.step-container').text()).toContain('Step: 44');
  });

  it("should increment if inc button is clicked", function() {
    spyOn(FeedActions, 'incrementStepParam');
    renderWithProps({});
    // see spec_helper for Simulate helpers
    simulateClickOn($el.find('button'));
    expect(FeedActions.incrementStepParam).toHaveBeenCalled();
  });
});
