var options = {
  tmpDir: __dirname + '/../public/uploaded/tmp',
  uploadDir: __dirname + '/../public/uploaded/files',
  uploadUrl: '/uploaded/files/',
  storage: {
    type: 'local'
  }
};




var uploader = require('blueimp-file-upload-expressjs')(options);
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
var spawn = require('child_process').spawn;

module.exports = function(router) {
  router.get('/upload', function(req, res) {
    uploader.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/upload', function(req, res) {




      //res.files.name = "ads";

      //ls = spawn('cmd.exe', ['/c', 'start pptview /S /F C:\\Users\\danielvolz\\Documents\\dropzone-express-fileupload\\asd\\Test_2.pptx']);

      //ls = spawn('cmd.exe', ['/c', 'run.bat']);
      //console.log(res.files.name);


// const child = execFile('"C:\\Users\\danielvolz\\Documents\\dropzone-express-fileupload\\bin\\run.bat"',  (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });

// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });


//       const child = exec('"C:\\Program Files (x86)\\Microsoft Office\\Office14\\PPTVIEW.EXE" /S /F "C:\\Users\\danielvolz\\Documents\\dropzone-express-fileupload\\public\\uploaded\\files\\Test_2.pptx"',
//         (error, stdout, stderr) => {
//           console.log(`stdout: ${stdout}`);
//             console.log(`stderr: ${stderr}`);
//           if (error !== null) {
//               console.log(`exec error: ${error}`);
//           }
//
// });
    uploader.post(req, res, function(obj) {


      res.send(JSON.stringify(obj));
      console.log(obj.files[0].name);
      name = obj.files[0].name;
      path = 'start pptview /S /F "C:\\Users\\danielvolz\\Documents\\dropzone-express-fileupload\\public\\uploaded\\files\\' + name + '"'
      console.log(path);
      ls = spawn(path, { shell: true });
      ls.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
      });

      ls.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
      });

      ls.on('exit', function (code) {
      console.log('child process exited with code ' + code);
      });

    });
  });

  router.delete('/uploaded/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {

      res.send(JSON.stringify(obj));
    });
  });
  return router;
};
