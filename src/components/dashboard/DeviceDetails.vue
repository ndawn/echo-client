<template lang="pug">
.device-details(v-if="device")
    .upper-block
        img.device-icon(:src="deviceIcon")
        button.edit-button(type="button" @click="edit")
            img.edit-icon(:src="editIcon")
            | Редактировать
    .main-info
        .titles
            h2.title {{ device.name || 'Без названия' }}
            h4.sub-title {{ device.type.verboseName }}
        .connect-button
            device-connect-button(:device="device" :key="device.pk")
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
import EditDevice from '@/components/dashboard/EditDevice.vue';
import editIcon from '@/assets/img/mini/edit.png';

export default {
    data () {
        return {
            editIcon,
            noDeviceIconSize: 192,
            ...mapState({activeDevice: 'device'})
        }
    },
    methods: {
        edit () {
            this.$store.dispatch('setActiveModalComponent', EditDevice);
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
        DeviceConnectButton,
        EditDevice
    }
}
</script>

<style lang="scss">
.device-details {
    .upper-block {
        .device-icon {
            display: inline-block;
            margin-top: 32px;
            padding: 0 24px;
            width: 100px;
            fill: #3183e6;
        }

        .edit-button {
            margin: 40px 0 0 48px;
            display: inline-block;
            vertical-align: top;
            font-family: 'Open Sans';
            font-size: 12px;
            border: none;
            outline: none;
            background: none;
            cursor: pointer;

            .edit-icon {
                padding-right: 4px;
                vertical-align: sub;
            }

            &:hover {
                text-decoration: underline;
            }
        }
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