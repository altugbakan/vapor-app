import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import OrderSelector from "../components/OfferSelector.js";
import IERC721 from "../utils/IERC721.json";
import { WalletContext } from "../pages/_app";
import { CONTRACT_ADDRESS, MESSAGE_PARAMS } from "../utils/constants.js";

const Create = () => {

    const [targetAccount, setTargetAccount] = useState("");
    const [sendValues, setSendValues] = useState([]);
    const [receiveValues, setReceiveValues] = useState([]);
    const { currentAccount } = useContext(WalletContext);

    const getSendValues = (values) => {
        setSendValues(values);
    }

    const getReceiveValues = (values) => {
        setReceiveValues(values);
    }

    const checkIfAddress = async (event) => {
        if (event.target.value.endsWith(".eth")) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const targetAccount = await provider.resolveName(event.target.value);
            if (targetAccount !== null) {
                setTargetAccount(targetAccount);
            }
            return;
        }
        try {
            ethers.utils.getAddress(event.target.value);
        } catch { return; }
        setTargetAccount(event.target.value);
    }

    const createOffer = async () => {
        const signer = (new ethers.providers.Web3Provider(ethereum)).getSigner();
        const messageParams = { ...MESSAGE_PARAMS };
        messageParams.message.toSend = [];
        messageParams.message.toReceive = [];
        for (const token of sendValues) {
            const nftContract = new ethers.Contract(token.value.collectionAddress, IERC721.abi, signer);
            if (!await nftContract.isApprovedForAll(currentAccount, CONTRACT_ADDRESS)) {
                await nftContract.setApprovalForAll(CONTRACT_ADDRESS, true);
            }
            messageParams.message.toSend.push({ token: token.value.collectionAddress, itemType: 1, value: parseInt(token.value.tokenId) });
        };
        receiveValues.forEach((token) => {
            messageParams.message.toReceive.push({ token: token.value.collectionAddress, itemType: 1, value: parseInt(token.value.tokenId) });
        })
        messageParams.message.from = currentAccount;
        messageParams.message.to = targetAccount;
        messageParams.message.deadline = Math.floor((new Date().getTime() + 60 * 60 * 24 * 1000) / 1000); // 1 day deadline in seconds
        const offer = { ...messageParams.message };
        let signature;
        try {
            signature = await ethereum.request({
                method: "eth_signTypedData_v4",
                params: [currentAccount, JSON.stringify(messageParams)],
            });
        } catch {
            toast.error("Failed to sign offer!");
            return;
        }
        const res = await fetch("/api/publish-offer", {
            method: "POST", body: JSON.stringify({ offer: offer, signature: signature }), headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            toast.success("Successfully created offer!");
        } else {
            toast.error("Failed to create offer.");
        }
    }

    return (
        <div className="container">
            <main className="main">
                <h1 className="title" style={{ marginBottom: "20px" }}>
                    Create Offer
                </h1>
                {
                    currentAccount === "" ?
                        <h2>Connect your wallet to create an offer.</h2>
                        :
                        <>
                            <div>
                                <p>To Send:</p>
                                {
                                    currentAccount === "" ? null : <OrderSelector account={currentAccount} getValues={getSendValues} />
                                }
                                <p>To Receive:</p>
                                <input className="input" placeholder="Please enter an Ethereum address:" onChange={checkIfAddress} />
                                {
                                    targetAccount === "" ? null : <OrderSelector account={targetAccount} getValues={getReceiveValues} />
                                }
                            </div>
                            {
                                sendValues.length > 0 && receiveValues.length > 0 ?
                                    <button className="button" onClick={createOffer}>Create Offer</button>
                                    :
                                    null
                            }
                        </>
                }
            </main>
        </div>
    )
}

export default Create;