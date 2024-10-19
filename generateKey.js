const secureRandom = require('secure-random');

// Generar una clave de 256 bits
const signingKey = secureRandom(256, {type: 'Buffer'});

// Convertir la clave a base64
const base64SigningKey = signingKey.toString('base64');

// Imprimir la clave en consola
console.log('Generated Signing Key (Base64):', base64SigningKey);


