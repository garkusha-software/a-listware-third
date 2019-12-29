import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import File from './File';

fontawesome.library.add(faFolder, faFolderOpen);

export default class Folder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFolderOpen: false,
        }
    }

    componentDidMount() {
        this.expandedFoldersHandle(this.props.expandedFolders);
    }

    folderToggle = () => {
        this.setState({ isFolderOpen: !this.state.isFolderOpen });
    }

    expandedFoldersHandle = (paths = []) => {
        const { expandedFolders = [], data, nestingIndex } = this.props;
        paths.map(folderPath => {
            const pathCharacters = folderPath.split('/');
            data.name === pathCharacters[nestingIndex] &&
                this.setState({ isFolderOpen: true });
        })
    }

    render() {
        const { name, children } = this.props.data;
        const { expandedFolders, nestingIndex } = this.props;

        return (
            <div style={{ maxWidth: 'fit-content' }}>
                <div
                    onClick={this.folderToggle}
                    className="d-flex align-items-center"
                    style={{ cursor: 'pointer' }}>
                    {this.state.isFolderOpen ?
                        <FontAwesomeIcon icon="folder-open" size="1x" /> :
                        <FontAwesomeIcon icon="folder" size="1x" />
                    }
                    <div className="pl-1">
                        {name}
                    </div>
                </div>
                {this.state.isFolderOpen && (
                    <div className="ml-3">
                        {children.map(child => {
                            return child.type === 'FOLDER' ?
                                <Folder
                                    expandedFolders={expandedFolders}
                                    key={child.name}
                                    data={child}
                                    nestingIndex={nestingIndex + 1}
                                /> :
                                <File
                                    key={child.name}
                                    file={child}
                                />
                        }
                        )}
                    </div>
                )}
            </div>
        )
    }
}
