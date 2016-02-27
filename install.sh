#!/bin/sh

echo "--- Clean any previous install"
rm -rf node_modules dist .tmp .sass_cache
npm cache clean

echo "--- Install dependencies"
npm install
