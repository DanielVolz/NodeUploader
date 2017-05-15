Dropzone.options.myDropzone = {

    init: function() {


        var self = this;
        // config
        self.options.addRemoveLinks = false;
        self.options.dictRemoveFile = "Delete";
        self.options.maxFilesize = "25";
        self.options.acceptedFiles = ".pptx, .ppt";
        self.options.renameFilename = function (file) {
            return file.renameFilename ="YourNewfileName.";
        };


        var fileList = new Array;
        var i =0;
        var filename = "fuckyou";

        self.on("success", function(file, serverFileName) {
            self.options.renameFilename = function(file){
                //keeping the file extension.
                var ext = file.name.split('.').pop();
                return file.name = filename + '.' + ext;
                //console.log(file.name);
            }
            fileList[i] = {"serverFileName" : serverFileName, "fileName" : file.name,"fileId" : i };
            //console.log(fileList);
            i++;

        });

        // load already saved files
        $.get('/upload', function(data) {
            var files = JSON.parse(data).files;
            for (var i = 0; i < files.length; i++) {

                var mockFile = {
                    name: files[i].name,
                    size: files[i].size,
                    type: 'image/jpeg'
                };

                self.options.addedfile.call(self, mockFile);
                //self.options.thumbnail.call(self, mockFile, files[i].url);

            };

        });

        self.on("complete", function(file) {
            //self.removeFile(file);
            //return file.renameFilename();
        });
        // bind events

        //New file added
        self.on("addedfile", function(file) {

            // };

            // return file.name = "nasd_";
            // console.log('new file added ', file.name);
        });

        // Send file starts
        self.on("sending", function(file) {
            file.name = 'nasd_' + file.name;
            console.log('upload started', file.name);
            console.log(file);
            $('.meter').show();
            self.options.renameFilename = function(file){
                //keeping the file extension.
                var ext = file.name.split('.').pop();
                return file.uploadName = filename;
                //console.log(file);
            }

        });

        // File upload Progress
        self.on("totaluploadprogress", function(progress) {
            console.log("progress ", progress);
            $('.roller').width(progress + '%');
        });

        self.on("queuecomplete", function(progress) {
            $('.meter').delay(999).slideUp(999);
        });

        // On removing file
        self.on("removedfile", function(file) {
            console.log(file);
            $.ajax({
                url: '/uploaded/files/' + file.name,
                type: 'DELETE',
                success: function(result) {
                    console.log(result);
                }
            });
        });

    }
};
