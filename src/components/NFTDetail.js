import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {getMetadata} from '../utils/nft';
import {getOrder,buy} from '../utils/market';
import {getAllowance,approve} from '../utils/usdt';
import '../App.css';
import {all} from "axios";
const NFTDetail=()=>{
    const {tokenId}=useState();
    const [metadata,setMetadata]=useState('');
    const [order,setOrder]=useState('');
    const [allowance,setAllowance]=useState(0);
    const getWalletAddress=async ()=>{
        if(window.ethereum){
            try{
                const accounts=await window.ethereum.request({method:'eth_requestAccounts'});
                return accounts[0];

            }catch (error){
                console.error('error connecting to wallet');
            }
        }
    };
    const handleBuyClick=async() => {
        if(allowance===0){
            await approve("","");
        }else {
            await buy(tokenId);
        }
    };
    useEffect(()=>{
        const getInfo=async ()=>{
            const address = await getWalletAddress();
            const metadata=await getMetadata(tokenId);
            const order=await getOrder(tokenId);
            const allowance=await getAllowance(address,"");
            setMetadata(metadata);
            setOrder(order);
            setAllowance(allowance);
        }
        getInfo();
    },[allowance]);
    return(
        <div className="nft-detail">
            <div className="nft-image">
                <img src={metadata.imageURL} alt={metadata.title}/>
            </div>
            <div className="nft-info">
                <h3>{metadata.title}</h3>
                <p>{metadata.description}</p>
                <p>Seller:{order.seller}</p>
                <p>Price:{order.price}</p>
                <p>TokenId:{order.tokenId}</p>
                <button onClick={handleBuyClick}>Buy</button>
            </div>
        </div>
    );
}
export default NFTDetail;