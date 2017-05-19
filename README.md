#
# Welcome to Spool Node
## node-red-contrib-spool
A Node-RED node for storing and delivering the undelivered outbound messages from the serial devices to the broker.
#### Overview
The main objective of this node is to prevent the loss of any outbound messages during the brokers' downtime by storing it in the sqlite database and re sending the messages to the broker once it is active or reconnected.
It is relatively easy to install on different operating system such as Linux, Windows and MacOS.

#### Installation
Install node-red-contrib-spool by following the instructions 

> cd $HOME/.node-red

> npm install node-red-contrib-spool

Or
You can follow the adding nodes instructions from the [Node-RED Getting Started Documentation][1].

#### Usage
To implement this node, start or restart the Node-RED (See the [Documentation][2] for getting started).
The example flow for the spool node is illustrated below. You can also re-create this flow by copying the given [Example][3] (json format) and importing it in your Node-RED. 

![alt Spool Flow](https://github.com/mahjnalisha/node-red-contrib-spool/raw/master/examples/node-red-contrib-spool-example-flow.png)

#### TODO
Creation of database based on user input

Implementation of other messaging protocol such as UDP

#### Licence
Copyright (c) 2017 Alisha Maharjan, Anisha Shrestha and Nita Regmi

Licenced under the terms of the GPLv3
GPLv3

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



#### Contributors
Alisha Maharjan

Anisha Shrestha

Nita Regmi
    
#### Acknowledgements
We would like to acknowledge the contribution of Damien Clark who have guided us throughout this project.


  [1]: http://nodered.org/docs/getting-started/adding-nodes

  [2]: http://nodered.org/docs/getting-started/running.html
  [3]: https://github.com/mahjnalisha/node-red-contrib-spool/blob/master/examples/node-red-contrib-spool-example-flow.json



