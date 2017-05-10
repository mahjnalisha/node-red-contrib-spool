module.exports = function(RED) {
    var fs=require('fs');


    function SpoolNode(n) {
        RED.nodes.createNode(this,n);
        this.filename = n.filename || "";
        this.loadedScript = '';
        this.loadedFilename = '';
        this.loadedbrokerstatus = '';
        var context = this.context();
        var node = this;
        var lineArr=[];
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

        // node.on('close', function (done) {
        //     node.status({});
        //     done();
        // });
//input function

        this.on('input', function(msg) {

            var count =  0;
            context.stat=SpoolNode.stat||msg.status;
            if(SpoolNode.stat!==msg.status && msg.status!=undefined)
            {
                context.stat=msg.status;
            }

            context.msg=context.msg||"";
            context.msg = msg.payload;
            console.log("status1:"+context.stat.text);
            //context.stat=msg.status;
            SpoolNode.stat=context.stat;
            var statusCheck=SpoolNode.stat;

            console.log("status2:"+context.stat.text);
            if(context.stat !== undefined && context.stat.text==="node-red:common.status.connected")
            {     var lineRemove='';
                  var lcnt=0;
                var wholeFile= fs.readFileSync(node.loadedFilename, 'utf8');
                var arrFile=wholeFile.split("\n");
                //prepare file for reading only if file has contents
                var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream(this.filename)

                });
                lineReader.on('line', function (line) {
                    if(line!="") {
                        lcnt++;
                        console.log('Line from file:', line);

                        node.send({payload: line});

                        //if(lcnt<3)
                       //{
                            lineRemove+= line.substring(line.indexOf("\n") + 1)+"\n";
                            if(lineRemove!="") {
                                arrFile.splice(0, 1);
                                deleteSelectedLine(arrFile);
                            }

                        //}
                    }

                }).on('close', function() {

                });

                function deleteSelectedLine(arrfile)
                {
                    //console.log(arrFile[]);
                    var strFile= arrFile.join("\n");
                    fs.writeFileSync(node.loadedFilename, strFile+'\n');

                }
            }
            else if(context.msg!=undefined)
            {
                console.log(count);
                if(count===0) {
                    console.log("no write");
                    fs.appendFileSync(this.filename, msg.payload+'\n');
                }


                count += 1;
                context.set('count',count);
            }


            context.set('context.stat',SpoolNode.stat);
            node.send(msg);
        });
    }

    RED.nodes.registerType("spool",SpoolNode);
    RED.library.register("functions");
}
