import React from "react";
import Select from "react-select"
import { useQuery, gql } from "@apollo/client";

const OrderSelector = ({ account, getValues }) => {
    const QUERY = gql`
    query GetNFTs($address: String!) {
      tokens(where: {ownerAddresses: [$address]}) {
        nodes {
          token {
            collectionName
            collectionAddress
            name
            tokenId
          }
        }
      }
    }    
    `
    const { data, loading } = useQuery(QUERY, { variables: { address: account } });

    return (
        <div className="selector">
            {
                loading ?
                    <h2>Loading NFTs...</h2>
                    :
                    <Select options={data.tokens.nodes.map(t => ({ value: t.token, label: `${t.token.collectionName} - ${t.token.name}` }))}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={getValues} />
            }
        </div>
    );
}

export default OrderSelector;