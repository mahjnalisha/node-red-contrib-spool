module.exports = function(RED) {
    var fs=require('fs');
    function SpoolNode(n) {
        RED.nodes.createNode(this,n);
        this.filename = n.filename || "";
        this.loadedScript = '';
        this.loadedFilename = '';
        this.loadedbrokerstatus = '';

        var node = this;
        // Read and file when node is initialized,

        if (this.filename !== '') {
            node.loadedFilename = this.filename;


            fs.readFile(this.filename, {encoding: 'utf-8'}, function (err, fileContent) {
                if (err) {
                    if (err.code === 'ENOENT') {
                        node.warn('Could not find file "' + err.path + '". Hint: File path is relative to "' + process.env.PWD + '"');
                    } else {
                        node.warn(err);
                    }
                } else {
                    node.loadedScript = fileContent;
                }
            });
        }


        this.on('input', function(msg) {
            fs.appendFileSync(this.filename,msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("spool",SpoolNode);
    RED.library.register("functions");
}