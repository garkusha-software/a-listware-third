import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';


fontawesome.library.add(faFile);

export default class File extends Component {
    constructor(props) {
        super(props);
    }

    renderFile = component => {
        const { files, file: { name } } = this.props;

        return files.length ?
            files.filter(file => file.includes(name)).length
                ? component : null
            : component;
    }

    render() {
        return this.renderFile(
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon="file" size="1x" />
                <div className="pl-1">
                    {this.props.file.name}
                </div>
            </div>
        )
    }
}