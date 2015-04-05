'use strict';

var App = require('./app');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

require("bootstrap-webpack");
// require("bootstrap-webpack!../../../bootstrap.config.js");

require("../../styles/bootstrap-theme.scss");

var content = document.getElementById('content');

var Routes = (
  <Route handler={App}>
    <Route name="/" handler={App}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
