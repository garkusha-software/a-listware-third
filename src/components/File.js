import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';


fontawesome.library.add(faFile);

export default class File extends Component {
    render() {
        return (
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon="file" size="1x" />
                <div className="pl-1">
                    {this.props.file.name}
                </div>
            </div>
        )
    }
}