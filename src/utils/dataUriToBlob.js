export default (data) => {
    let [mimeType, dataBytes] = data.split(',');

    mimeType = mimeType.split(':')[1].split(';')[0];
    dataBytes = atob(dataBytes);

    const arrayBuffer = new ArrayBuffer(dataBytes.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < dataBytes.length; i++) {
        intArray[i] = dataBytes.charCodeAt(i);
    }

    return new Blob([arrayBuffer], {type: mimeType});
}
