# Dashboard 2.0 Node: `ui-flowviewer`

This node allows you to render Node-RED `flow.json` files within [FlowFuse Dashboard](https://dashboard.flowfuse.com).

![ui-flowviewer](https://github.com/user-attachments/assets/01d6d165-f261-47f4-b22e-7a1f0379ec39)
_Screenshot showing the flow viewer in a Dashboard._

## Configuration

### Properties

- **size**: Width and height of the renderer in the context of the Dashboard layout. If you use _"auto"_ sizing, then the renderer will always display with a minimum height of "4" rows.
- **flow**: A valid Node-RED `flow.json`.

### Dynamic Configuration

You can inject `msg.ui_update.flow` messages to the node in order to override the rendered flow. See the "/examples" folder for a demo flow.
