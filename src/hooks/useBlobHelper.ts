const useBlobHelper = () => {
  const dataUriToBlobUri = (dataURI: string) => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }

    const dataView = new DataView(arrayBuffer);
    const blob = new Blob([dataView], { type: mimeString });

    return URL.createObjectURL(blob);
  };

  return {
    dataUriToBlobUri,
  };
};

export default useBlobHelper;
