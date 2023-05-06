const Web3         = require("web3");
const express      = require("express");
const jwt          = require("jsonwebtoken");
const Hash         = require("../Model/hash.model");
const User         = require("../Model/user.model");
const Request      = require("../Model/request.model");
const HashAccepted = require("../Model/authHash.model");
const isLoggedIn   = require("../middlewares/isLoggedIn");
const getUser      = require("../helper/getLoggedInUser");



const router     = express.Router();
var web3 = new Web3('http://localhost:8545');


const contractAddress = "0x7381d4d47Af00F067B84584eD14cEF9bD2F53Ad7";  // contract address of deployed smart Contract

// ABI of the Smart Contract
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "info",
				"type": "string"
			}
		],
		"name": "Requestaccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "info",
				"type": "string"
			}
		],
		"name": "Requestdenied",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "info",
				"type": "string"
			}
		],
		"name": "RequestedForApproval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "acceptRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "addHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "isHashTampered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "requestUser",
				"type": "address"
			}
		],
		"name": "rejectRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "request",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "requestAccess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "acceptedUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "acceptedUsersHashes",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "getHashCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "hashLimt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "isHashAvailable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "mapHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "mapUserHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "requestedUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; 

const contract = new web3.eth.Contract(abi, contractAddress);
// console.log(contract.methods)


router.get("/count",(req,res)=>{
    contract.methods.getHashCount("QmX7YWFYyDusRYJzc5hmbQ8rN3bvFmcqYPf43KvtxoFL9b").call()
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err)
        })
    res.send("<h1>Processing...</h1>")
})


// upload the hash in database and add it to collection in smart contract
router.route("/upload")
    .get(isLoggedIn,(req,res)=>{
        res.render("upload");
    })
    .post(async(req,res)=>{
        try{
            const { hash , description} = req.body;
            const newHash = new Hash;
            newHash.hash = hash;
            newHash.description = description;

            // find the author
            const { auth } = req.cookies;
            let payload = jwt.decode(auth);
            let { email } = payload;
            let user = await User.findOne({email});

            console.log(user);

            newHash.owner = user;
            await newHash.save();

            user.hashes.push(newHash);
            await user.save();

            console.log(newHash);


            // Add the hash into the blockchain using web3
            contract.methods.addHash(hash).send({from: user.address})
                .then((data)=>{
                    console.log(data);
                })
                .catch((err)=>{
                    console.log(err)
                })

            res.redirect("/");

        }
        catch(err)
        {
            console.log("Something went wrong !");
            console.log(err);
            // res.redirect("/");
        }
    })

router.route("/request/")
    .get(isLoggedIn,async(req,res)=>{
        const { auth } = req.cookies;
        const payload = jwt.decode(auth);
        let user = await User.findOne({email: payload.email});

        let hashes = await Hash.find({ owner: {$ne: user} }).populate("owner");
        console.log(hashes);

        res.render("request",{ hashes });
    })

router.route("/reason/:hashId/:ownId")
    .post(isLoggedIn,async(req,res)=>{
		try{
			const { reason } = req.body;
			const { hashId , ownId } = req.params;

			// get the user who is requesting
			const { auth } = req.cookies;
			const payload = jwt.decode(auth);

			const user = await User.findOne({ email: payload.email });
			const hash = await Hash.findById(hashId);
			
			let newReq = new Request;
			newReq.hash = hash.hash;
			newReq.reason = reason;
			newReq.requestUser = user;

			await newReq.save();

			let owner = await User.findById(ownId);
			owner.requests.push(newReq);
			await owner.save();

			// call requestAccess function from smart contract
			contract.methods.requestAccess(user.address,hash.hash).send({from: user.address})
				.then((data)=>{
					console.log("Smart Contract executed !");
					console.log(data);
				})
				.catch((err)=>{
					console.log("Something went wrong !");
					console.log(err);
				})

			res.status(200).send("Request has been sent");
		}
		catch(err)
		{
			console.log(err);
			res.send("Something went wrong!");
		}
    });

router.get("/accept/requests",isLoggedIn,async(req,res)=>{
	const { auth } = req.cookies;
	const payload  = jwt.decode(auth);
	console.log(payload)
	const user  = await User.findOne({email: payload.email}).populate({path:"requests",
	populate:{
		path:"requestUser"
	}});
	// console.log(user.requests);
	res.render("accept",{requests: user.requests});
});



router.post("/accept/:reqId",isLoggedIn,async(req,res)=>{
	try{
		const { reqId } = req.params;
		const request = await Request.findById(reqId).populate("requestUser");

		// find the owner
		const { auth } = req.cookies;
		const payload = jwt.decode(auth);
		const owner = await User.findOne({email: payload.email});
		const user = await User.findById(request.requestUser._id);
		const hash = await Hash.findOne({hash: request.hash});
		console.log(hash);
		
		const acceptHash = new HashAccepted;
		acceptHash.hash = request.hash;
		acceptHash.description = hash.description;
		acceptHash.user = user;
		acceptHash.owner = owner;

		await acceptHash.save();

		await Request.findByIdAndDelete(reqId);
		let newOwner = await User.findByIdAndUpdate(owner._id,{$pull:{requests: reqId}});
		await newOwner.save();

		user.access.push(acceptHash);
		await user.save();

		// run the acceptRequest function from the contract
		contract.methods.acceptRequest(user.address,hash.hash).send({from: owner.address})	
			.then((data)=>{
				console.log("Accept request function has been executed");
				console.log(data);
			})
			.catch((err)=>{
				console.log("Something went wrong !");
				console.log(err);
			})

		res.send("Transaction Executed");

	}
	catch(err)
	{
		console.log("Something went Wrong!");
	}
})


router.post("/reject/:reqId",isLoggedIn,async(req,res)=>{
	try{
		const { reqId } = req.params;
		const request = await Request.findById(reqId).populate("requestUser");

		// find the owner
		const { auth } = req.cookies;
		const payload = jwt.decode(auth);
		const owner = await User.findOne({email: payload.email});
		const user = await User.findById(request.requestUser._id);

		let ownUser = await User.findByIdAndUpdate(owner._id,{$pull:{requests: reqId}});
		ownUser.save();

		// call rejectRequest function from contract
		contract.methods.rejectRequest(user.address).send({from: owner.address})
			.then((data)=>{
				console.log("Reject function has been exected !");
				console.log(data);
			})
			.catch((err)=>{
				console.log(err)
			})
		await Request.findByIdAndDelete(reqId);
		res.send("Request has been Deleted");
	}
	catch(err)
	{
		console.log("Something went wrong!");
		console.log(err);
	}
})


router.get("/access/provided",isLoggedIn,async(req,res)=>{
	const { auth } = req.cookies;
	const payload = jwt.decode(auth);
	const user = await User.findOne({email: payload.email}).populate({path:"access",populate:{
		path:"owner"
	}});
	console.log(user);
	res.render("display_provided",{access: user.access});
});


router.post("/validate/hash/:id",async(req,res)=>{
	console.log(req.params);
	const hash = await HashAccepted.findById(req.params.id);

	// get the user 
	const { auth } = req.cookies;
	const payload = jwt.decode(auth);
	
	const user = await User.findOne({email: payload.email});
	
	
	contract.methods.isHashTampered(user.address,hash.hash).call()
		.then((data)=>{
			console.log(data)
			res.status(200).send({
				message: data
			});
		})
		.catch((err)=>{
			console.log(err)
			res.status(400).send({
				message:err
			})
		})

})


module.exports = router;