import React, { Component } from 'react';
import './style.css';
import $ from 'jquery';

const DeleteModule = React.createClass({
  deleteSong() {
    $.post(
      '/deletesong',
      {
        database_id: this.props.song_id
      },
      (data) => {
        location.reload();
      }
    );
  },
  render() {
    return (
      <div style={{visibility: this.props.visibility}} className="delete-module-container">
        <div className="delete-module">
          <div id="question">
            <p>Are you sure you want delete this song?</p>
          </div>
          <div id="buttons">
            <button onClick={e => this.deleteSong(e)} className="button" id="yes-button">Yes</button>
            <button onClick={this.props.closeDeleteModule} className="button" id="no-button">No</button>
          </div>
        </div>
      </div>
    );
  }
});

export default DeleteModule;
