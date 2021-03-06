/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as path from 'path';
import { TreeNodeInfo } from './treeNodeInfo';
import { IConnectionProfile } from '../models/interfaces';
import Constants = require('../constants/constants');

export class ObjectExplorerUtils {

    public static readonly rootPath: string = path.join(__dirname, 'objectTypes');

    public static iconPath(label: string): string {
        if (label) {
            if (label === Constants.disconnectedServerLabel) {
                // if disconnected
                label = `${Constants.serverLabel}_red`;
            } else if (label === Constants.serverLabel) {
                // if connected
                label += '_green';
            }
            return path.join(ObjectExplorerUtils.rootPath, `${label}.svg`);
        }
    }

    public static getNodeUri(node: TreeNodeInfo): string {
        if (node.nodeType === Constants.disconnectedServerLabel) {
            return undefined;
        }
        while (node) {
            if (node.nodeType === Constants.serverLabel) {
                break;
            }
            node = node.parentNode;
        }
        const nodeUri = node.nodePath + '_' + node.label;
        return nodeUri;
    }

    public static getNodeUriFromProfile(profile: IConnectionProfile): string {
        const uri = profile.server + '_' + profile.profileName;
        return uri;
    }
}
