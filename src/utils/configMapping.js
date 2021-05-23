import config from '@/config';


export default {
    type (typeName) {
        return config.types.find(x => x.name === typeName) || config.defaultType;
    },
    connectOptions (optionNames) {
        return config.connectOptions.filter(x => optionNames.includes(x.name));
    },
    injectMapping (device) {
        return {
            ...device,
            type: this.type(device.type),
            connectOptions: this.connectOptions(device.connectOptions)
        }
    }
}
