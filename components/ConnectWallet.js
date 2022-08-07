import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { WalletContext } from "../pages/_app";
import { CHAIN_ID, CHAIN_NAME, NETWORK_PARAMS } from "../utils/constants";

const ConnectWallet = () => {
    const { currentAccount, setCurrentAccount } = useContext(WalletContext);
    const [chainId, setChainId] = useState("");

    // Check if wallet is connected
    useEffect(() => {
        const checkWalletConnected = async () => {
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) { // Already connected
                setCurrentAccount(ethers.utils.getAddress(accounts[0]));
                toast.success("Connected Wallet!");
                setChainId(await ethereum.request({ method: "eth_chainId" }));
            }
        }
        if (typeof window.ethereum !== "undefined") {
            const { ethereum } = window;
            checkWalletConnected();
            ethereum.on("accountsChanged", checkWalletConnected);
            ethereum.on("chainChanged", (_chainId) => window.location.reload());
        }
    }, [setCurrentAccount]);

    const connectWallet = async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setChainId(await ethereum.request({ method: "eth_chainId" }));

        if (chainId !== CHAIN_ID) {
            try {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: CHAIN_ID }],
                });
                window.location.reload();
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902 || switchError?.data?.orginalError?.code === 4902) {
                    try {
                        await ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [NETWORK_PARAMS],
                        });
                    } catch {
                        return;
                    }
                }
            }
        }
        setCurrentAccount(ethers.utils.getAddress(accounts[0]));
        toast.success("Connected Wallet!");
        setChainId(await ethereum.request({ method: "eth_chainId" }));
    }

    switch (chainId) {
        case CHAIN_ID:
            return (
                <div className="card-small">
                    {`${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`}
                </div>
            );

        default:
            return (
                <>
                    <a href="" onClick={connectWallet} className="card-small">
                        {
                            currentAccount === "" ? "Connect Wallet" : `Switch to ${CHAIN_NAME}`
                        }
                    </a>
                </>
            );
    }
}

export default ConnectWallet;