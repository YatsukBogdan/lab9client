import React, { Component } from 'react';
import $ from 'jquery';
import './style.css';
import DeleteModule from './DeleteModule';

const Song = React.createClass({
  getInitialState() {
    return {
      deleteModuleVisibility: 'hidden'
    }
  },
  openDeleteModule() {
    this.setState({deleteModuleVisibility: 'visible'});
  },
  closeDeleteModule() {
    this.setState({deleteModuleVisibility: 'hidden'});
  },
  render() {
    return (
      <div className="row song-record">
        <div className="col-md-5">
          <a href={this.props.url}>
            <img className="song-img" src={this.props.img} />
          </a>
        </div>
        <div className="col-md-7 song-description">
          <a className='page-link' href={'/song/' + this.props.database_id}>
            <h1><b>{this.props.name}</b></h1>
          </a>
          <h1><b>{this.props.artist}</b></h1>
          <button onClick={e => this.openDeleteModule(e)}>Delete</button>
          <DeleteModule visibility={this.state.deleteModuleVisibility}
                        closeDeleteModule={this.closeDeleteModule}
                        song_id={this.props.database_id}/>
        </div>
      </div>
    );
  }
});

export default Song;
