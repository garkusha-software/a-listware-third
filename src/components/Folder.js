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
            isFolderShow: true,
            openedFiles: [],
        }
    }

    componentDidMount() {
        const { expandedFolders, mattchedFiles } = this.props;

        this.folderShowHandle(expandedFolders);
        this.folderShowHandle(mattchedFiles);
    }

    folderToggle = () => {
        this.setState({ isFolderOpen: !this.state.isFolderOpen });
    }

    componentDidUpdate(prevProps) {
        const { mattchedFiles } = this.props;
        if (mattchedFiles && mattchedFiles.length
            !== prevProps.mattchedFiles.length) {
            this.setState({
                isFolderOpen: false,
                isFolderShow: true
            }, () => this.folderShowHandle(this.props.mattchedFiles))
        }
    }

    folderShowHandle = (folders = []) => {
        const { expandedFolders = [] } = this.props;
        folders.map(folderPath => {
            [this.props.data].map(target => {
                if (folderPath.includes(target.name)) {
                    this.setState({ isFolderOpen: true });
                } else {
                    !expandedFolders.length
                        && this.setState({ isFolderShow: false })
                }
            });
        })
    }

    render() {
        const { name, children } = this.props.data;
        const { expandedFolders, mattchedFiles } = this.props;

        return this.state.isFolderShow ? (
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
                                    mattchedFiles={mattchedFiles}
                                    key={child.name}
                                    data={child}
                                /> :
                                <File
                                    key={child.name}
                                    file={child}
                                    files={mattchedFiles}
                                />
                        }
                        )}
                    </div>
                )}
            </div>
        ) : null;
    }
}
