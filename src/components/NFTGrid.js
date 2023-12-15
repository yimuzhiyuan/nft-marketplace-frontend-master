import {useState,useEffect} from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import NFTCard from "./NFTCard";
import {balanceOf,tokenOfOwnerByIndex} from '../utils/nft';
import '../App.css';
const NFTGrid=()=>{
    const [nfts,setNFTs]=useState([]);
    const navigate=useNavigate();
    const handleCardClick=(tokenId)=>{
        navigate('/nft-detail/${tokenId}');
    };
    useEffect(()=>{
        const fetchNFTs=async() => {
            const length = await balanceOf("0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e");
            console.log('length',length);
            for (let i=0;i<length;i++){
                const tokenId=await tokenOfOwnerByIndex;
                setNFTs((prev)=>[...prev,tokenId]);
                setNFTs((prev)=>[...new Set(prev)])
            }
        };

    },[]);
    return(
        <div className="nft-grid">
            {nfts.map(nft=>(
                <NFTCard tokenId={nft} onClick={()=>handleCardClick(nft)}/>
            ))}
        </div>
    );
};
export default NFTCard;