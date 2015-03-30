'use strict';

var React = require('react/addons');

require('styles/Foo.scss');

var Foo = React.createClass({
  render: function () {
    return (
        <div>
          <p>Content for Foo</p>
        </div>
      );
  }
});

module.exports = Foo; 

