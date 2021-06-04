<template lang="pug">
.device-connect-button
    button.button.connect(:class="{disabled: !device.connection_options}" type="button" @click="handleConnectClick" title="Подключиться к устройству")
        img.icon(:src="connectIcon")
        | {{ currentOption ? currentOption.name : 'Подключение недоступно' }}
    button.button.choose(:class="{disabled: !device.connection_options}" type="button" title="Подключиться к устройству" @click.stop="toggleDropdown")
        img.icon(:src="dropdownIcon")
    .dropdown(:class="{active: dropdownActive}" v-if="device.connection_options")
        ul.option-list
            li.option(v-for="option in device.connection_options" :key="option.proto" @click="handleOptionClick(option)") {{ option.name }}
</template>

<script>
import connectIcon from '@/assets/img/mini/connect_white.png';
import arrowDownIcon from '@/assets/img/mini/arrow_down_white.png';
import Credentials from '@/components/dashboard/Credentials.vue';

export default {
    props: ['device'],
    data () {
        return {
            dropdownActive: false,
            currentOption: null,
            connectIcon,
            dropdownIcon: arrowDownIcon,
        }
    },
    methods: {
        connect () {
            if (['http', 'https'].includes(this.currentOption.proto)) {
                window.open(`${this.currentOption.proto}://${this.device.address}`, '_blank');
                return;
            }
            this.$store.dispatch('updateTerminalWindowState', {device: this.device, method: this.currentOption});
            this.$store.dispatch('setActiveModalComponent', Credentials);
        },
        toggleDropdown () {
            this.dropdownActive = !this.dropdownActive;
        },
        handleConnectClick () {
            if (this.currentOption) {
                this.connect();
            }
        },
        handleOptionClick (option) {
            this.currentOption = option;
            this.toggleDropdown();
        }
    },
    beforeMount () {
        this.currentOption = this.device.connection_options[0] || null;
    }
}
</script>

<style lang="scss">
.device-connect-button {
    display: inline-block;
    position: relative;
    box-sizing: border-box;

    .button {
        padding: 6px 8px;
        border: none;
        outline: none;
        color: white;
        background: #3183e6;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
            background: #2072d5;
        }

        &:active {
            background: #1f61c4;
        }

        &.connect {
            padding: 6px 12px;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;

            &.disabled, &.disabled:hover, &.disabled:active {
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                background: #79a5db;
                cursor: not-allowed;
            }
        }

        &.choose {
            border-left: 1px solid #1f61c4;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;

            &.disabled, &.disabled:hover, &.disabled:active {
                display: none;
            }
        }
    }

    .icon {
        vertical-align: middle;
    }

    .dropdown {
        display: none;
        position: absolute;
        top: 105%;
        right: 0;
        border: 1px solid #ececec;
        border-radius: 3px;
        box-shadow: 0 3px 2px 0 #c3c3c3;
        color: #2c2c2c;
        background: white;

        &.active {
            display: initial;
        }

        .option-list {
            margin: 0;
            padding: 4px 0;
            list-style: none;

            .option {
                padding: 6px 24px;
                cursor: pointer;

                &:hover {
                    background: #ececec;
                }
            }
        }
    }
}
</style>