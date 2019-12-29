import React, { Component } from 'react';
import DiskData from './data/data.json';

import Folder from './components/Folder';
import File from './components/File';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expandedFolders: ['/Common7/IDE', '/VC'],
    }
  }

  render() {
    return (
      <div className="container">
        {DiskData.map((data, id) => {
          return (
            <Folder
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