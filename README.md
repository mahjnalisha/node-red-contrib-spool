#
# Welcome to Spool Node
##node-red-contrib-spool
A Node-RED node for storing and delivering the undelivered outbound messages from the serial devices to the broker.
####Overview
The main objective of this node is to prevent the loss of any outbound messages during the brokers' downtime by storing it in the sqlite database and re sending the messages to the broker once it is active or reconnected.
It is relatively easy to install on different operating system such as Linux, Windows and MacOS.

####Installation
Install node-red-contrib-spool by following the instructions 
> cd $HOME/.node-red
> npm install node-red-contrib-spool

Or
You can follow the adding nodes instructions from the [Node-RED Getting Started Documentation][1].
####Usage
To implement this node, start or restart the Node-RED (See the [Documentation][2] for getting started).
The example flow for the spool node is illustrated below. You can also re-create this flow by copying the given [Example][3] (json format) and importing it in your Node-RED. 

![alt Spool Flow](https://github.com/mahjnalisha/node-red-contrib-spool/raw/master/examples/node-red-contrib-spool-example-flow.png)

####TODO


####Licence


####Contributors
Alisha Maharjan
Anisha Shrestha
Nita Regmi
    
####Acknowledgements
We would like to acknowledge the contribution of Damien Clark who have guided us throughout this project, without whom this node-red spool node project would not have been possible. 




  [1]: http://nodered.org/docs/getting-started/adding-nodes

  [2]: http://nodered.org/docs/getting-started/running.html
  [3]: https://github.com/mahjnalisha/node-red-contrib-spool/blob/master/examples/node-red-contrib-spool-example-flow.json



