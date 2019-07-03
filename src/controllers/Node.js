const core = require('gls-core-service');
const BasicController = core.controllers.Basic;

class Node extends BasicController {
    async sync() {
        // TODO -

        return { nodes: [] };
    }

    async add() {
        // TODO -

        return false;
    }

    async remove() {
        // TODO -
    }

    async addDefault() {
        // TODO -
    }

    async addKnown() {
        // TODO -
    }

    async removeKnown() {
        // TODO -
    }
}

module.exports = Node;
