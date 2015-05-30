/*global FlowRouter, FlowLayout */

// Flow Router handles rendering out our page views (Blaze templates)
// these views can then call the router API to get reactive updates on
// state in the URL. This can then be passed down into children if needed


FlowRouter.route('/', { name: 'Home', action: renderView });
FlowRouter.route('/about', { name: 'About', action: renderView });


// helper to layout the parent page view and log debug data
function renderView() {
  renderMainLayoutWith(this.name);
  console.log("Running page:", this.name, this._params);
}

function renderMainLayoutWith(view) {
  FlowLayout.render('mainLayout', {
    top: "Header",
    main: view,
    bottom: "Footer"
  });
}

