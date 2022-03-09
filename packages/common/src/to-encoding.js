const { curry } = require('ramda');

/** @: toEncoding :: Encoding -> Buffer -> Data Type Based On Encoding */
const toEncoding = curry((encoding, buffer) => buffer.toString(encoding));

module.exports = toEncoding;
