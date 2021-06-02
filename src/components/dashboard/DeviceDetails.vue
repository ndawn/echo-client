<template lang="pug">
.device-details(v-if="device")
    img.device-icon(:src="deviceIcon")
    .main-info
        .titles
            h2.title {{ device.name }}
            h4.sub-title {{ device.type.verboseName }}
        .connect-button
            device-connect-button(:device="device" :key="device.id")
    .separator
    device-details-param(name="IP адрес" :value="device.address")
    device-details-param(name="MAC адрес" :value="device.mac.toUpperCase()")
.no-device(v-else)
    unicon(name="meh" fill="rgba(0, 0, 0, 0.2)" :width="noDeviceIconSize" :height="noDeviceIconSize")
    h4.title Ничего не выбрано
</template>

<script>
import { mapState } from 'vuex';
import DeviceDetailsParam from '@/components/dashboard/DeviceDetailsParam.vue';
import DeviceConnectButton from '@/components/dashboard/DeviceConnectButton.vue';

export default {
    data () {
        return {
            noDeviceIconSize: 192,
            ...mapState({activeDevice: 'device'})
        }
    },
    computed: {
        device () {
            return this.$store.state.devices.find(dvc => dvc.id === this.$store.state.activeDevice) || null;
        },
        deviceIcon () {
            return this.device && this.device.type.icon.blue || null;
        }
    },
    components: {
        DeviceDetailsParam,
        DeviceConnectButton
    }
}
</script>

<style lang="scss">
.device-details {
    .device-icon {
        margin-top: 32px;
        padding: 0 24px;
        width: 100px;
        fill: #3183e6;
    }

    .main-info {
        box-sizing: border-box;
        padding: 0 24px;

        .titles, .connect-button {
            display: inline-block;
        }

        .titles {
            box-sizing: border-box;
            padding-right: 16px;
            width: 50%;

            .title {
                margin-bottom: 4px;
                color: #3b3b3b;
            }

            .sub-title {
                margin: 4px 0 16px;
                color: #5e5e5e;
            }
        }

        .connect-button {
            width: 50%;
        }
    }

    .separator {
        margin: 16px 0;
        width: 100%;
        height: 1px;
        background: #dbdbdb;
    }
}

.no-device {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
        color: rgba(0, 0, 0, 0.5);
    }
}
</style>