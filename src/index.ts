#!/usr/bin/env node
import Api from './components/api';
import ColorParser from './components/color-parser/color-parser';
import Fs from './components/fs';
import * as process from 'process';
import { program } from 'commander';

program
  .option('-f, --file <type>', 'figma file key')
  .option('-n, --node <type>', 'figma node id')
  .option('-t, --token <type>', 'figma access token')
  .option('-p, --preprocessor <type>', 'css preprocessor output type')
  .parse(process.argv);

if (process.argv.length < 9) {
  program.outputHelp();
} else {
  const { file, node, token, preprocessor } = program;

  const figmaApi = new Api(file, node, token);

  const fs = new Fs('colors', preprocessor);

  figmaApi.getPageNodes().then((data) => {
    const colorsOutput = new ColorParser(data).parseColors();
    fs.writeFile(colorsOutput);
  });
}
