'use strict';

var ProjectsApp = require('./app');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

require("bootstrap-webpack");
// require("bootstrap-webpack!../../../bootstrap.config.js");

require("../../styles/bootstrap-theme.scss");

var content = document.getElementById('content');

var Routes = (
  <Route handler={ProjectsApp}>
    <Route name="/" handler={ProjectsApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
