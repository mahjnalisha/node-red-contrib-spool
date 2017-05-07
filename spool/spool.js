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

//input function
        this.on('input', function(msg) {

            var context = this.context();
            var count = context.get('count') || 0;
            context.stat=context.stat|| "";
            context.msg=context.msg||""
            // msg.status="no connection";

            //if(msg.topic==='testtopic22') {
            context.msg = msg.payload;
            //console.log("inside topic");

            //}


            context.stat=msg.status;
            if(context.stat != undefined && context.stat.text=="node-red:common.status.connected")
            {
                console.log("nn");
                node.send(msg);

            }
            else
            {
                console.log(count);
                if(count==0) {
                    console.log("no write");
                    fs.appendFileSync(this.filename, context.msg);
                    // console.log(context.stat.text);
                    // console.log(context.msg.id);

                    // console.log(context.stat);

                }


                count += 1;
                context.set('count',count);



            }



            node.send(msg);
        });
    }
    RED.nodes.registerType("spool",SpoolNode);
    RED.library.register("functions");
}
