module.exports = function(RED) {
    var fs=require('fs');
    var     readline = require('readline');

    var countline =0;
    const sqlite = require('sqlite3');

  //  var db = new sqlite.Database('./test.db');
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./spool.db');

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS spool_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, topic text, message TEXT, message_id TEXT)");


    });

    function SpoolNode(n) {
        RED.nodes.createNode(this,n);
        this.filename = n.filename || "";
        this.loadedScript = '';
        this.loadedFilename = '';
        this.loadedbrokerstatus = '';

        var node = this;
        var context=this.context();
        var rd="";

     //   var db = new sqlite.Database();

// open the database for reading if file exists
// create new database file if not


        this.on('input', function(msg) {
          var brokerstat="";
            node.loadedbrokerstatus =node.loadedbrokerstatus|| msg.status;

            if(node.loadedbrokerstatus!=undefined && node.loadedbrokerstatus!="disconnected" )
            {
                console.log(node.loadedbrokerstatus.text);
                switch(node.loadedbrokerstatus.text){
                    case "node-red:common.status.connected": {
                        brokerstat = 'online';
                        break;
                    }
                    case "common.status.connected": {
                        brokerstat = 'online';
                        break;

                    }
                    default: {
                        brokerstat = "offline";
                        break;
                    }

                }

                //node.loadedbrokerstatus="connected";
                console.log("connected"+brokerstat);

            }else{
                //console.log("disconnected");
               // brokerstat='offline';
                node.loadedbrokerstatus="disconnected";

            }
           // console.log(node.loadedbrokerstatus);
            if(msg.status!=undefined) {
              console.log("");
            }else {
                context.data =  msg;
            }
            console.log(context.data);
            if(context.data!="" && context.data!=undefined){
                if(brokerstat=='online'){
                    node.send(context.data);
                }else {
                    i = 0;
                    var obj = JSON.stringify(context.data);
                    var topic= JSON.stringify(context.data.topic);
                    var message_id=JSON.stringify(context.data._msgid);
                    var message=JSON.stringify(context.data.payload);
                    //console.log(message);
                   var stmt = db.prepare("INSERT INTO spool_messages(topic, message, message_id) VALUES (?,?,?)");
                    //for (var i = 0; i < 10; i++) {
                       stmt.run(JSON.stringify(context.data.topic),JSON.stringify(context.data.payload),JSON.stringify(context.data._msgid));
                   // }
                    stmt.finalize();

                   db.each("SELECT * from spool_messages", function(err, row) {
                       console.log(row);
                    });
                  //  fs.appendFileSync("test.txt", obj);
                }
            }

        });

    }





    RED.nodes.registerType("spool",SpoolNode);
    RED.library.register("functions");
}