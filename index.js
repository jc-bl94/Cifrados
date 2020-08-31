const express = require('express');
const CryptoJS = require("crypto-js");
const colors = require('colors');
const app = express();
const NodeRSA = require('node-rsa');

const port = 3000;
const message = 'Este es el mensaje de cifrado';
const keyAES = 'jf49sls03qms';
const key = new NodeRSA({b: 512});
key.generateKeyPair();
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

/* app.get('/', function (req, res) {
    res.send('<h1>No se creó una vista para este proyecto</h1>');
}); */

app.listen(port, () => {
    console.log(colors.green(`Servidor en el puerto: ${port}`));
    console.log(`Mi mensaje es: ${colors.yellow(message)}\n`);
    encodingAES();
    encodingRSA();
});

// Cifrado y Descifrado de AES
function encodingAES(){
    const aesEncrypt = CryptoJS.AES.encrypt(message, keyAES).toString();
    const aesDecrypt  = CryptoJS.AES.decrypt(aesEncrypt, keyAES).toString(CryptoJS.enc.Utf8);
    console.log(colors.green('AES'));
    console.log(`Mi mensaje cifrado con AES es: ${colors.yellow(aesEncrypt)}`);
    console.log(`Mi mensaje descifrado con AES es: ${colors.yellow(aesDecrypt)}\n`);
}

// Cifrado y Descifrado de RSA
function encodingRSA(){
    const rsaEncrypt = key.encrypt(message, 'base64');
    const rsaDecrypt = key.decrypt(rsaEncrypt, 'utf8');
    console.log(colors.green('RSA'));
    console.log(`Mi mensaje cifrado con RSA es: ${colors.yellow(rsaEncrypt)}`);
    console.log(`Mi mensaje descifrado con RSA es: ${colors.yellow(rsaDecrypt)}`);
}