import React, { Component } from 'react';
import DiskData from './data/data.json';

import Folder from './components/Folder';
import File from './components/File';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expandedFolders: ['/Common7/IDE', '/VC/atlmfc'],
      mattchedFiles: [],
      searchValue: '',
    }
  }

  inputHandle = searchValue => {
    this.setState({ searchValue });
  }

  searchHandle = () => {
    this.setState({
      expandedFolders: [],
      mattchedFiles: []
    }, () => this.state.searchValue.length && this.searchFile(DiskData, '/'));
  }

  clearHandle = () => {
    this.setState({
      expandedFolders: [],
      mattchedFiles: [],
      searchValue: ''
    });
  }

  searchFile = (element, path) => {
    let mattchedFiles = [];

    element.map(target => {
      if (target.type === 'FILE' && target.name.toLowerCase().includes(this.state.searchValue)) {
        mattchedFiles.push(path + target.name);
      } else {
        target.children
          && target.children.length
          && this.searchFile(target.children, path + target.name + '/');
      }
    })
    mattchedFiles.length &&
      this.setState({ mattchedFiles: [...this.state.mattchedFiles, ...mattchedFiles] });
  }


  render() {
    return (
      <div className="container">
        <div className="input-group my-3">
          <div className="input-group-prepend">
            <button
              onClick={this.searchHandle}
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon1">Search</button>
          </div>
          <div className="input-group-prepend">
            <button
              onClick={this.clearHandle}
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon1">Clear</button>
          </div>
          <input
            value={this.state.searchValue}
            onChange={e => this.inputHandle(e.target.value)}
            type="text"
            className="form-control"
            placeholder="File name"
            aria-label="File name"
            aria-describedby="basic-addon1" />
        </div>
        {DiskData.map((data, id) => {
          return (
            <Folder
              expandedFolders={this.state.expandedFolders}
              mattchedFiles={this.state.mattchedFiles}
              key={data.name}
              data={data} />
          )
        }
        )}
      </div>
    );
  }
}