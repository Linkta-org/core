import { replaceTscAliasPaths } from 'tsc-alias';

/**
 * on build command, replace absolute paths with relative paths
 */
const replacerConfig = {
  resolveFullPaths: true,
  resolveFullExtension: '.js',
  verbose: true,
};

replaceTscAliasPaths(replacerConfig)
  .then(() => console.log(JSON.stringify(replacerConfig)))
  .catch((err) => console.log(err));
