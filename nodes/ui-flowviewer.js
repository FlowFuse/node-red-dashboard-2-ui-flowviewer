module.exports = function (RED) {
    function UIFlowViewerNode (config) {
        RED.nodes.createNode(this, config)

        const node = this

        // ensure we have JSON type
        if (typeof config.flow !== 'object') {
            config.flow = JSON.parse(config.flow)
        }

        // which group are we rendering this widget
        const group = RED.nodes.getNode(config.group)
        const base = group.getBase()

        const evts = {
            beforeSend: function (msg) {
                if (msg.ui_update) {
                    const update = msg.ui_update
                    if (update.flow) {
                        // dynamically set "options" property
                        base.stores.state.set(group.getBase(), node, msg, 'flow', update.flow)
                    }
                }
                return msg
            }
        }

        // inform the dashboard UI that we are adding this node
        if (group) {
            group.register(node, config, evts)
        } else {
            node.error('No group configured')
        }
    }

    RED.nodes.registerType('ui-flowviewer', UIFlowViewerNode)
}
