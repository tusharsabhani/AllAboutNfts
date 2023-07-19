import { Alchemy, Network } from "alchemy-sdk";
import { NextPage } from "next";
import { useAccount } from "wagmi";

const TokenGating: NextPage = () => {

  const { address } = useAccount();

  async function checkTokenGating(network: Network,contractAddress: string[]){
    const config = {
      apiKey: "SgFPh5gQUCimLa1Vam8ZocKrmMwd3_V-",
      network: network,
    };
    const alchemy = new Alchemy(config);

    if(address != null){
      let response = await alchemy.core.getTokenBalances(address, contractAddress);
      console.log(response);
      if(!response.tokenBalances[0].tokenBalance)
        return;
      
      if(parseInt(response.tokenBalances[0].tokenBalance) > 0){
        console.log("PASSED TOKEN GATING!")
      }else{
        console.log("FAILED TOKEN GATING!")
      }
    }
  }

  async function checkMaticMumbai(){
      checkTokenGating(Network.MATIC_MUMBAI,["0x0000000000000000000000000000000000001010"]);
  }

  async function checkEthGoerli(){
    checkTokenGating(Network.ETH_GOERLI,["0xdD69DB25F6D620A7baD3023c5d32761D353D3De9"]);
  }

  return(
    <div>
      <button onClick={checkEthGoerli}>CHECK TOKEN GATING GOERLI</button>
      <button onClick={checkMaticMumbai}>CHECK TOKEN GATING MUMBAI</button>
    </div>)
}

export default TokenGating;