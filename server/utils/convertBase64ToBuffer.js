function base64Decoder(base64) {
  return Buffer.from(base64, "base64");
}

module.exports = base64Decoder;
