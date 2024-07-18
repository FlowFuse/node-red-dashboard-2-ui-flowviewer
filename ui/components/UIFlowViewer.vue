<template>
    <div class="nrdb-ui-flowviewer-container" :style="{'grid-template-rows': `repeat(${rows}, var(--widget-row-height))` }">
        <div ref="flow-viewer" :style="{'grid-row-end': `span ${rows}`}" />
    </div>
</template>

<script>
import FlowRenderer from '@flowfuse/flow-renderer'
import { mapState } from 'vuex'

export default {
    name: 'UIFlowViewer',
    inject: ['$socket'],
    props: {
        id: { type: String, required: true },
        props: { type: Object, default: () => ({}) },
        state: { type: Object, default: () => ({ enabled: false, visible: false }) }
    },
    data () {
        return {
            dynamic: {
                flow: null
            }
        }
    },
    computed: {
        ...mapState('data', ['messages']),
        flow: function () {
            return this.dynamic.flow || this.props.flow
        },
        rows: function () {
            return this.props.height || 4
        },
        msg: function () {
            return this.messages[this.id]
        }
    },
    watch: {
        msg: {
            deep: true,
            handler: function (msg) {
                if (msg?.ui_update.flow) {
                    // check type of incoming message flow
                    if (typeof msg.ui_update.flow === 'string') {
                        // if string, parse it
                        this.dynamic.flow = JSON.parse(msg.ui_update.flow)
                    } else {
                        // if object, use it as-is
                        this.dynamic.flow = msg.ui_update.flow
                    }
                }
            }
        },
        flow: {
            deep: true,
            handler: function (flow) {
                this.renderFlow()
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.renderFlow()
        })
        this.$socket.on('msg-input:' + this.id, (msg) => {
            // store the latest message in our client-side vuex store when we receive a new message
            this.$store.commit('data/bind', {
                widgetId: this.id,
                msg
            })
        })
    },
    unmounted () {
        this.$socket?.off('msg-input:' + this.id)
    },
    methods: {
        renderFlow () {
            const renderer = new FlowRenderer()
            const flow = this.flow
            renderer.renderFlows(flow, {
                container: this.$refs['flow-viewer']
            })
        }
    }
}
</script>

<style scoped>
@import "../stylesheets/ui-flowviewer.css";
</style>
