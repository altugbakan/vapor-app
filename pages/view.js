import { useEffect, useState, useContext } from "react";
import { WalletContext } from "./_app";
import OfferViewer from "../components/OfferViewer";

const Offers = () => {
    const [offers, setOffers] = useState();
    const { currentAccount } = useContext(WalletContext);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const getOffers = async () => {
                const offersForUser = [];
                const allOffers = await (await fetch("/api/view-offers")).json();
                for (const offer of allOffers) {
                    if (offer.offer.to === "0x0000000000000000000000000000000000000000" || offer.offer.to === currentAccount) {
                        offersForUser.push(offer);
                    }
                }
                setOffers(offersForUser);
            }
            getOffers();
        }
    }, [currentAccount]);

    return (
        <div className="container">
            <main className="main">
                <h1 className="title" style={{ marginBottom: "20px" }}>
                    View Offers
                </h1>
                {
                    offers === undefined ?
                        <h2>Loading offers...</h2>
                        :
                        offers.length === 0 ?
                            <h2>There are no offers that you can accept!</h2>
                            :
                            <ul>
                                {
                                    offers.map((offer) => {
                                        return (
                                            <li key={offer.offer.deadline}>
                                                <OfferViewer offer={offer.offer} signature={offer.signature} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                }
            </main>
        </div>
    );
}

export default Offers;