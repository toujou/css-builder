#!/usr/bin/env node

const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const glob = require('glob');

const defaultOutputExtension = '.css';
const defaultOriginFolder = './Scss/';
const defaultOutputFolder = './build/Stylesheets/'
let originFolder = null;
let outputFolder = null;

const colorRed = '\x1b[31m';
const colorGreen = '\x1b[32m';
const colorReset = '\x1b[0m';

const args = process.argv.slice(2, process.argv.length);

/**
 * Check for correct number of arguments,
 * set original and output folder variables,
 * show start message and call build init function or show error
 */
if (args.length === 0) {
  originFolder = defaultOriginFolder;
  outputFolder = defaultOutputFolder;
  console.log(colorGreen, `🚀 Building toujou css from / to default folders${colorReset}`);
  initToujouCssBuild();
} else if (args.length === 2) {
  originFolder = args[0];
  outputFolder = args[1];
  console.log(colorGreen, `🚀 Building toujou css from ${originFolder} to ${outputFolder}${colorReset}`);
  initToujouCssBuild();
} else {
  console.log(colorRed, `🚧 Error. The toujou-build-css expected 0 or 2 arguments but got ${args.length}${colorReset}`);
  process.exit(1);
}

/**
 * Init build process of toujou's css
 *     - get all css files on the origin folder
 *     - call build function for each css file
 */
function initToujouCssBuild() {
  let originCssFiles = null;

  // Check if origin folder exists
  if (!fs.existsSync(originFolder)) {
    console.log(colorRed, `🚧 Error! Could not find the origin folder: ${originFolder}${colorReset}`);
    process.exit(1);
  }

  // Go through all files (.css and .scss) in origin folder
  glob(`${originFolder}*.*css`, {}, async (error, files) => {
    if (error) {
      console.log(colorRed, `Error: ${error}${colorReset}`);
      process.exit(1);
    } else if (files.length === 0) {
      console.log(colorRed, `🚧 Error. Could not find any CSS files on the ${originFolder} folder${colorReset}`);
      process.exit(1);
    } else if (files.length) {
      originCssFiles = files;
      files.forEach((file) => buildToujouCssFile(file));
    }
  });
}

/**
 * Build a single css file and save it to output folder
 *
 * @param originFile
 */
function buildToujouCssFile(originFile) {
  const fileName = originFile.split('/').pop();
  const fileNameWithoutExtension = fileName.split('.')[0];
  const outputFile = `${outputFolder}${fileNameWithoutExtension}${defaultOutputExtension}`;
  const postcssOptions = {
    from: originFile,
    to: outputFile
  };

  // Create output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Process css file
  fs.readFile(originFile, (err, css) => {
    postcss([autoprefixer , cssnano, postcssImport])
      .process(css, postcssOptions)
      .then(result => {
        fs.writeFile(outputFile, result.css, () => true);
      });
  });
}
