export const CHAIN_NAME = "Mainnet";
export const CHAIN_ID = "0x1";
export const NETWORK_PARAMS = {
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
    nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"]
}

export const CONTRACT_ADDRESS = "0xa4AF3969722f7813eeD450ba0AeE53ED1Fd82f08";

export const MESSAGE_PARAMS = {
    domain: {
        chainId: 1,
        name: "Vapor",
        verifyingContract: CONTRACT_ADDRESS,
        version: "1",
    },
    message: {
        toSend: [],
        toReceive: [],
        from: "",
        to: "",
        deadline: 0,
    },
    primaryType: "Offer",
    types: {
        EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
        ],
        Item: [
            { name: "token", type: "address" },
            { name: "itemType", type: "uint8" },
            { name: "value", type: "uint256" },
        ],
        Offer: [
            { name: "toSend", type: "Item[]" },
            { name: "toReceive", type: "Item[]" },
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "deadline", type: "uint256" },
        ],
    },
};