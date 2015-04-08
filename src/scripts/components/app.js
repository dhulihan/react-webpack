'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Foo = require('./Foo.js');
var $ = require('jquery');

// var Showdown = require('showdown');
// var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author}
        </h4>
        <div className="commentContent">
          {this.props.children.toString()}
          </div>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment){
      return(
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server

    // Call parent event
    this.props.onCommentSubmit({author: author, text: text});

    // Clear text fields
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },  
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" ref="author" placeholder="Your name" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" ref="text" placeholder="Say something..." />
        </div>
        <input className="btn btn-primary" type="submit" value="Post"  />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },  
  getInitialState: function() {
    return({data: []});
  }, 
  componentDidMount: function() {
    this.loadCommentsFromServer();

    // Put it on interval
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },  
  handleCommentSubmit: function(comment) {
    // Add comment "optimistically"
    var comments = this.state.data;
    comments.unshift(comment);
    this.setState({data: comments});    
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   type: 'POST',
    //   data: comment,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },  
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <div className="row">
          <div className="col-md-4">
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </div>
          <div className="col-md-8">
            <CommentList data={this.state.data} />
          </div>
        </div>      
      </div>
    );
  }
});

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var ProjectsApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
	    <Foo />
      <CommentBox url="comments.json" pollInterval={2000} />
      </div>
    );
  }
});

module.exports = ProjectsApp;
