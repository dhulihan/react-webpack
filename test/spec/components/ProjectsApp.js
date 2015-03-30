'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ProjectsApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ProjectsApp = require('components/ProjectsApp.js');
    component = React.createElement(ProjectsApp);
  });

  it('should create a new instance of ProjectsApp', function () {
    expect(component).toBeDefined();
  });
});
