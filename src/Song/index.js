import React, { Component } from 'react';
import Header from '../Header';
import isAuthorized from '../isAuthorized';
import DeleteModule from './DeleteModule';

import './style.css';

import $ from 'jquery';

const Song = React.createClass({
  componentDidMount() {
    isAuthorized(this);
    this.loadSong();
  },
  openDeleteModule() {
    this.setState({deleteModuleVisibility: 'visible'});
  },
  closeDeleteModule() {
    this.setState({deleteModuleVisibility: 'hidden'});
  },
  getInitialState() {
    return {
      id: 0,
      album: '',
      name: '',
      artist: '',
      year: '',
      url: '',
      img: '',
      deleteModuleVisibility: 'hidden'
    }
  },
  loadSong() {
    $.get(
      '/getsong?id=' + this.props.params.id,
      (data) => {
        this.setState({
          id: data.id,
          album: data.album,
          name: data.name,
          artist: data.artist,
          year: data.year,
          url: data.url,
          img: data.img
        });
      }
    );
  },
  render() {
    if (this.state.isAuthorized) {
      return (
        <div>
          <Header />
          <div className="container" id="main-content">
            <div className="row song-record">
                <div className="col-md-5">
                  <a href={this.state.url}>
                    <img className="song-img" src={this.state.img} />
                  </a>
                </div>
                <div className="col-md-7 song-description">
                    <h1><b>{this.state.name}</b></h1>
                    <h3>{this.state.artist}</h3>
                    <h3>Album: {this.state.album}</h3>
                    <h3>Year: {this.state.year}</h3>
                </div>
                <button onClick={e => this.openDeleteModule(e)}>Delete</button>
                <DeleteModule visibility={this.state.deleteModuleVisibility}
                              closeDeleteModule={this.closeDeleteModule}
                              song_id={this.props.params.id}/>
            </div>
            <div className='row' id="lyrics">

            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className="container" id="main-content">
              <p>You are not authorized</p>
          </div>
        </div>
      );
    }
  }
});

export default Song;
