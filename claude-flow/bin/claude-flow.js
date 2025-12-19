#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');

// Import command modules
const autoAgentCommand = require('../lib/commands/auto-agent');

program
  .name('claude-flow')
  .description('Automatically spawn and manage agents based on task requirements')
  .version('1.0.0');

// Auto agent command
program
  .command('auto')
  .alias('a')
  .description('Auto-spawn agents based on task analysis')
  .addCommand(autoAgentCommand);

program.parse(process.argv);

