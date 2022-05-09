// this makes a live contribution! be careful :D

const fs = require('fs');
const path = require('path');
const Arweave = require('arweave');
const { SmartWeaveNodeFactory, LoggerFactory } = require("redstone-smartweave");

const contractTxId = "6-tVIaRu5wJa0gWRF4Bhont5EWbhkK8AhJ3Ki3yDK5I";

async function archivePoolClient(wallet) {
        const arweave = Arweave.init({
                host: "arweave.net",
                port: 443,
                protocol: "https",
                timeout: 20000,
                logging: false,
        });

	const smartweave = SmartWeaveNodeFactory.memCached(arweave);
	const contract = smartweave.contract(contractTxId).connect(wallet);
	
	// state before 
	console.log("state before 'contribute' txn");
	const { state, validity } = await contract.readState();
        console.log(JSON.stringify(state));

	// send contribution
	console.log("sending 'contribute' txn");
	const interactionTx = await contract.writeInteraction({
                function: "contribute"
        }, [], {
                target: 'bPVcHEkxWOVTknAK3HQtaE6qW3jzK-zpgxMi4bFmydI',
		// .000001 AR
                winstonQty: '1000000'
        });
	console.log(`interaction sent! id: ${interactionTx}`);
}

const wallet = JSON.parse(fs.readFileSync("wallet.json").toString());
archivePoolClient(wallet).catch((e) => console.log(e));
