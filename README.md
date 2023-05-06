# Patient Centric Image Access Control Management Using Etherium 

## Developed by:
Team C15

<ol>
<li>347 Shankarling Halemani</li>
<li>349 Tafreen Hussain</li>
<li>351 Shravan Nayak</li>
<li>354 Fayaz Kuduremane</li>
<li>361 Sana Razeen</li>
</ol>
  

## Requirements

  

* Geth

* Node.js, npm and mongoDB (Database)

* Remix IDE

  

## Steps to start the project

  

1) Start a geth single node

  

```bash

geth --miner.gaslimit  1000000000  --http  --http.corsdomain  http://remix.ethereum.org  --allow-insecure-unlock  --http  --http.port  8545  --http.addr  127.0.0.1  --http.corsdomain  "*"  --http.api  "eth,net,web3,personal,miner"  --datadir  node1  --nodiscover  --networkid  4321  --port  30303  console  --rpc.enabledeprecatedpersonal

```

  

2) Create and unlock an account and start the mining.

  

2) Go to project directory

  

3) Deploy PCAM.sol using Remix IDE

  

4) Copy the contract address and abi in "action.js" file present in "Routes" folder

  

5)Install Dependencies using npm from "package.json" file

```bash

npm install

```

6) Let Geth run in the background and start the project using node

7)Open the root directoy of the Project in terminal or Git bash and run the below command

```bash

node index.js

```

8) Open http://localhost:8081 in your favorite browser
