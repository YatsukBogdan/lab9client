import React, { Component } from 'react';
import Header from '../Header';
import Song from './Song';
import isAuthorized from '../isAuthorized';
import DeleteModule from './DeleteModule';

import $ from 'jquery';

const Songs = React.createClass({
  componentDidMount() {
    isAuthorized(this);
    this.loadSongs();
    this.songsCount();
  },
  getInitialState() {
    return {
      songs_data: [],
      song_count: 0,
      deleteModuleVisibility: 'hidden'
    }
  },
  openDeleteModule() {
    this.setState({deleteModuleVisibility: 'visible'});
  },
  closeDeleteModule() {
    this.setState({deleteModuleVisibility: 'hidden'});
  },
  loadSongs() {
    $.get(
      '/getsongs?page=' + this.props.params.page + '&elements=' + this.props.params.elements,
      (data) => {
        this.setState({songs_data: data.songs});
      }
    );
  },
  songsCount() {
    $.get(
      '/songcount',
      (data) => {
        this.setState({song_count: data.count});
      }
    );
  },
  renderSongs() {
    var songs_render = [];
    for (var i = 0; i < this.state.songs_data.length; i++) {
      songs_render.push(<Song database_id={this.state.songs_data[i].id}
                              id={i}
                              url={this.state.songs_data[i].url}
                              img={this.state.songs_data[i].img}
                              artist={this.state.songs_data[i].artist}
                              name={this.state.songs_data[i].name}
                              year={this.state.songs_data[i].year}
                              openDeleteModule={this.openDeleteModule}/>);
    }
    return songs_render;
  },
  renderPageLinks() {
    var page_links = [];
    var pages = parseInt(this.state.song_count/this.props.params.elements) + 1;
    for (var i = 0; i < pages; i++) {
      var id = i + 1;
      page_links.push(<a href={'/songs/page/' + id + '/elements/' + this.props.params.elements}>{id}</a>);
    }
    return page_links;
  },
  render() {
    if (this.state.isAuthorized) {
      return (
        <div>
          <Header />
          <div className='container' id='main-content'>{this.renderSongs()}</div>
          {this.renderPageLinks()}
          <DeleteModule visibility={this.state.deleteModuleVisibility}
                        closeDeleteModule={this.closeDeleteModule}/>
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

export default Songs;
