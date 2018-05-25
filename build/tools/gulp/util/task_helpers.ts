import * as gulp from 'gulp';
import * as child_process from "child_process";
import * as path from "path";
import {join} from "path";

/* Those imports lack typings. */
const gulpRunSequence = require('run-sequence');

const _root = path.resolve(__dirname, '../../../..');

export function root(args= '') {
  // const currentDir = process.cwd();
  // const rootDir = join(currentDir, '../..');
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

/** Create a task that's a sequence of other tasks. */
export function sequenceTask(...args: any[]) {
  return (done: any) => {
    gulpRunSequence(
      ...args,
      done
    );
  };
}

/** Create a task that executes a binary as if from the command line. */
export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}) {
  return (done: (err?: string) => void) => {
    const childProcess = child_process.spawn(binPath, args, options);

    if (!options.silentStdout && !options.silent) {
      childProcess.stdout.on('data', (data: string) => process.stdout.write(data));
    }

    if (!options.silent) {
      childProcess.stderr.on('data', (data: string) => process.stderr.write(data));
    }

    childProcess.on('close', (code: number) => {
      if (code != 0) {
        if (options.errMessage === undefined) {
          done('Process failed with code ' + code);
        } else {
          done(options.errMessage);
        }
      } else {
        done();
      }
    });
  };
}

