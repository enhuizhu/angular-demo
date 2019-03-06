const { exec } = require('child_process'); 
const path = require('path');
const des = 'C:/projects/GlencoreFrontendProd';
const source = path.resolve(`${__dirname}/../dist/`);

const sendmail = require('sendmail')();

const excuteCommand = function(command, callback) {
  console.log(`running command "${command}"`);

  exec(command, {maxBuffer: 1024 * 5000000}, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      return ;
    }
  
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    callback();
  });
}

const build = function(callback) {
  excuteCommand('npm run build', callback);
}

const removeAll = function(callback) {
  excuteCommand(`rm -rf ${des}/*`, callback);
}


const copy = function(callback) {
  excuteCommand(`cp -r ${source}/* ${des}`, callback);
}

build(() => {
  removeAll(() => {
    copy(() => {
      console.log('deploy doen!');
    })
  });
});
