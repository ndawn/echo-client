import config from '@/config';


export default {
    type (typeName) {
        return config.types.find(x => x.name === typeName) || config.defaultType;
    },
    connectionOptions (deviceOptions) {
        return deviceOptions.map(option => ({proto: option[0], name: config.connectionOptionsVerbose[option[0]] || option[0], port: option[1]}));
    },
    injectMapping (device) {
        return {
            ...device,
            id: device.pk,
            type: this.type(device.type),
            connection_options: this.connectionOptions(device.connection_options)
        }
    }
}
