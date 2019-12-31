import React, { Component } from 'react';
import DiskData from './data/data.json';

import Folder from './components/Folder';
import File from './components/File';

const loadData = () => JSON.parse(JSON.stringify(DiskData));

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      expandedFolders: [],
      searchValue: '',
      isSearched: false,
    }
  }

  componentDidMount() {
    this.setState({ data: loadData() })
  }

  inputHandle = searchValue => {
    this.setState({ searchValue });
    if (!searchValue.length) {
      this.clearHandle();
    }
  }

  clearHandle = () => {
    this.setState({
      data: [...loadData()],
      isSearched: false,
      searchValue: '',
    })
  }

  searchHandle = () => {
    this.state.searchValue.length &&
      this.setState({ data: [...loadData()].filter(this.filterFile), isSearched: true });
  }

  filterFile = target => {
    if (target.name.toLowerCase().includes(this.state.searchValue.toLowerCase())) return true;

    if (target.children) {
      return (target.children = target.children.filter(this.filterFile)).length
    }
  }

  render() {
    return (
      <div className="container">
        <div className="input-group my-3">
          <div className="input-group-prepend">
            <button
              onClick={() => this.searchHandle()}
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon1">Search</button>
          </div>
          <div className="input-group-prepend">
            <button
              onClick={() => this.clearHandle()}
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon1">Clear</button>
          </div>
          <input
            value={this.state.searchValue}
            onChange={e => this.inputHandle(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && this.searchHandle()}
            type="text"
            className="form-control"
            placeholder="File name"
            aria-label="File name"
            aria-describedby="basic-addon1" />
        </div>
        {this.state.data.map((data, id) => {
          return (
            <Folder
              searchedFile={this.state.searchValue}
              isSearched={this.state.isSearched}
              expandedFolders={this.state.expandedFolders}
              key={data.name}
              data={data}
              nestingIndex={1} />
          )
        }
        )}
      </div>
    );
  }
}