#!/bin/sh

echo "--- Clean any previous install"
rm -rf node_modules dist .tmp .sass_cache npm-debug.log
npm cache clean
