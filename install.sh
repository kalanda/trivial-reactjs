#!/bin/sh

echo "--- Clean any previous install"
rm -rf node_modules dist .tmp .sass_cache
npm cache clean
bower cache clean

echo "--- Install bower and npm packages"
bower install
npm install
