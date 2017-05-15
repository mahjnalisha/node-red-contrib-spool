module.exports = function(RED) {
    var fs=require('fs');


    function SpoolNode(n) {
        RED.nodes.createNode(this, n);
        this.filename = n.filename || "";
        this.loadedScript = '';
        this.loadedFilename = '';
        SpoolNode.stat = '';
        var context = this.context();
        var node = this;
        var sqlite3 = require('sqlite3');
        var db = new sqlite3.Database('./SpoolDB.db');


        db.run("CREATE TABLE if not exists spool_messages (id integer primary key autoincrement,message_id text,message TEXT, topic text)");



        this.on('input', function ( msg) {
            var brokerStatus = "";
            context.stat = SpoolNode.stat || msg.status;
            console.log("spool node connection:" + SpoolNode.stat.text);
            //console.log("msg status connection"+msg.status.text);
            if (SpoolNode.stat !== msg.status && msg.status != undefined) {
                context.stat = msg.status;
            }
            else
                context.stat = SpoolNode.stat;
            if (msg.status !== undefined) {

            }

            else {
                context.data = msg;
                console.log("data context from" + JSON.stringify(context.data) + '\n');
            }
            console.log("context status" + context.stat.text + '\n');


            if (context.stat != undefined) {

                switch (context.stat.text) {
                    case "node-red:common.status.connected": {
                        brokerStatus = 'online';
                        SpoolNode.stat = context.stat;
                        break;
                    }
                    case "common.status.connected": {
                        brokerStatus = 'online';
                        SpoolNode.stat = context.stat;
                        break;

                    }
                    default: {
                        brokerStatus = "offline";
                        SpoolNode.stat = context.stat;

                        break;
                    }

                }
            } else {
                //console.log("disconnected");
                brokerStatus = 'offline';
                SpoolNode.stat = context.stat;


            }


            console.log("status od broker" + brokerStatus);


            if (brokerStatus == 'online') {
                console.log("select from dtatabase and send data to the mqtt");
                select();
                function select(callback) {
                    var query = "SELECT * from spool_messages LIMIT 1";

                    db.all(query, function (err, rows) {
                        console.log(rows.length);
                        if (rows.length > 0) {
                            rows.forEach(function (row) {
                                if (err) {
                                    console.log("Error");
                                }
                                else {
                                    console.log("this is message");
                                    console.log(row.id, row.message);
                                    context.data = "";

                                   // context.data = row.message;
                                    var message=row.message;
                                    console.log(message);
                                    var msg = {payload: message};
                                    node.send(msg);
                                    deleteMessage(row);
                                }
                            });
                            return callback()

                        }
                    });


                    function callback() {
                        setTimeout(function () {
                            console.log("in callback");


                            select(callback);
                        }, 1000);
                    }


                    if (context.data !== undefined) {
                        console.log("if context .data is defined, write in the mqtt" + JSON.stringify(context.data));
                        var msg = {payload: context.data.payload};
                        node.send(msg);
                        context.data = "";
                    }
                }
            }

            else if (brokerStatus == 'offline') {
                if (context.data != "" && context.data != undefined) {


                    console.log("if connecting store in database");
                    console.log("while not connecting");
                    console.log(JSON.stringify(context.data.payload));

                    var stmt = db.prepare("INSERT INTO spool_messages (topic,message,message_id) VALUES (?,?,?)");
                    stmt.run(JSON.stringify(context.data.topic), JSON.stringify(context.data.payload), JSON.stringify(context.data._msgid));

                    stmt.finalize();
                    context.data = undefined;
                }
            }
            context.set('context.stat', SpoolNode.stat);
            // node.send(msg);
        });
        function deleteMessage(message) {
            db.run("DELETE FROM spool_messages WHERE id=(?)", message.id, function (err) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(" delete Successful");
                    context.data=undefined;
                }
            });
        }
    }

    RED.nodes.registerType("spool",SpoolNode);
    RED.library.register("functions");
}
