import {ethers} from "ethers";
import ABI from '../contracts/Market.json'
let provider=new ethers.BrowserProvider(window.ethereum);
const contractAddress="0xf8e81D47203A594245E36C48e151709F0C19fBe8";
const contract=new ethers.Contract(contractAddress,ABI,await provider.getSigner());
export async function buy(tokenId){
    const result=await contract.buy(tokenId);
    console.log('buy',result.hash);
}
export async function changePrice(tokenId){
    const result=await contract.changePrice(tokenId);
    console.log('change price',result.hash);
}
export async function cancelOrder(tokenId){
    const result=await contract.cancelOrder(tokenId);
    console.log('cancle order',result.hash);
}
export async function getAllNFTs(){
    const result=await contract.getAllNFTs();
    console.log(result);
}
export async function getMyNFTs(){
    const result=await contract.getMyNFTs();
    console.log(result);
}
export async function getOrder(tokenId){
    const result=await contract.orderOfId(tokenId);
    return{
        seller:result[0],
        tokenId:Number(result[1]),
        price:Number(result[2])/1e18,
    }
}

