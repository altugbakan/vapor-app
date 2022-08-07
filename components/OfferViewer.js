import React, { useContext } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useQuery, gql } from "@apollo/client";
import { WalletContext } from "../pages/_app";
import IERC721 from "../utils/IERC721.json";
import Vapor from "../utils/Vapor.json";
import { CONTRACT_ADDRESS } from "../utils/constants";

const ItemViewer = ({ item }) => {
    const QUERY = gql`
    query GetNFTData($address: String!, $id: String!) {
        token(token: {address: $address, tokenId: $id}) {
          token {
            name
            collectionName
          }
        }
      }
        
    `
    const { data, loading } = useQuery(QUERY, { variables: { address: item.token, id: item.value.toString() } });
    return (
        <>
            {
                loading ?
                    null
                    :
                    <div>
                        {
                            `${data.token.token.collectionName} - ${data.token.token.name}`
                        }
                    </div>
            }
        </>
    );
}

const OfferViewer = ({ offer, signature }) => {
    const { currentAccount } = useContext(WalletContext);
    const acceptOffer = async () => {
        const signer = (new ethers.providers.Web3Provider(ethereum)).getSigner();
        for (const token of offer.toReceive) {
            const nftContract = new ethers.Contract(token.token, IERC721.abi, signer);
            if (!await nftContract.isApprovedForAll(currentAccount, CONTRACT_ADDRESS)) {
                await nftContract.setApprovalForAll(CONTRACT_ADDRESS, true);
            }
        };
        const vaporContract = new ethers.Contract(CONTRACT_ADDRESS, Vapor.abi, signer);
        const r = "0x" + signature.substring(2, 66);
        const s = "0x" + signature.substring(66, 130);
        const v = parseInt(signature.substring(130, 132), 16);
        try {
            await vaporContract.acceptOffer(offer, v, r, s);
        } catch (err) {
            console.log(offer)
            console.log(err);
            toast.error("Offer is cancelled.");
            return;
        }
        toast.success("Offer accepted!");
    }

    return (
        <div className="flex-column">
            <h2>{offer.from} &rarr; {offer.to}</h2>
            <div className="flex-row">
                {
                    offer.toSend.map((item) => {
                        return (<ItemViewer item={item} key={item.value} />)
                    })
                }
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                    &rarr;
                </div>
                {
                    offer.toReceive.map((item) => {
                        return (<ItemViewer item={item} key={item.value} />)
                    })
                }
            </div>
            <button className="button" onClick={acceptOffer} style={{ marginTop: "10px" }}>Accept Offer</button>
        </div>
    );
}

export default OfferViewer;