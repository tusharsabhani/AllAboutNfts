import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { Alchemy, GetBaseNftsForOwnerOptions, Network, OwnedNftsResponse } from 'alchemy-sdk';
import React from "react";

const Home: NextPage = () => {

  const { address } = useAccount();
  const [enterAddress, setEnterAddress] = useState("");
  const [nftDetails, setNftDetails] = useState<OwnedNftsResponse>();
  const [noOfNftsFetched, setNoOfNftsFetched] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  const config = {
    apiKey: "SgFPh5gQUCimLa1Vam8ZocKrmMwd3_V-",
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  async function fetchNfts() {
    let owner = "idrt.eth";
    // let options : GetBaseNftsForOwnerOptions = {
    //   pageSize: 10,
    //   omitMetadata: true
    // };
    let response = await alchemy.nft.getNftsForOwner(enterAddress); //"idrt.eth"
    setNftDetails(response);
    setDataFetched(true);
    setNoOfNftsFetched(response.totalCount);
    console.log("RESPONSE" + response);
  };


  // async function fetchData() {
  //   try {
  //     if (enterAddress != null) {
  //       const networkInfo = {
  //         network: ZDKNetwork.Ethereum,
  //         chain: ZDKChain.Mainnet,
  //       }

  //       const API_ENDPOINT = "https://api.zora.co/graphql";
  //       const zdk = new ZDK({ endpoint: API_ENDPOINT });

  //       // for specific NFT
  //       // const args = {
  //       //   token: {
  //       //     // networks:[networkInfo],
  //       //     address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
  //       //     tokenId: "101"
  //       //   },
  //       //   includeFullDetails: false 
  //       // }0xA858DDc0445d8131daC4d1DE01f834ffcbA52Ef1

  //       const args = {
  //         where: {
  //           ownerAddresses: [enterAddress] //0xA858DDc0445d8131daC4d1DE01f834ffcbA52Ef1 
  //         },
  //         pagination: { limit: 10 },
  //       };

  //       const response = await zdk.tokens(args);
  //       //array containing info about the nfts

  //       setNftDetails(response);
  //       if (response.tokens.nodes != null) {
  //         setDataFetched(true);
  //       }

  //       if (nftDetails != null) {
  //         nftDetails.tokens.nodes.map((element) => {
  //           console.log(element.token.tokenContract?.name?.toString());
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Exception {}", error);
  //   }
  // }

  function showNfts() {

    if (dataFetched) {
      if (noOfNftsFetched > 0 && nftDetails != null) {
        return (
          <div className="grid grid-cols-4">
            {
              nftDetails.ownedNfts.map((element) => {
                if (element.title.length > 0) {
                  return (
                    <div className="flex-col items-center justify-center mx-10 my-10 text-lg box-border max-w-sm rounded overflow-hidden shadow-lg">
                      <img className="w-full h-60" src={element.media.at(0)?.gateway} alt="displaying the nft" />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{element.title}</div>
                      </div>
                    </div>
                  )
                }

              })
            }
          </div>
        )
      }
      else {
        return (
          <div>
            <p>Sorry there are no NFTs owned by this address currently, in the meantime have a look at our minions NFT</p>
            <div className="grid grid-cols-4">
              <div className="flex-col items-center justify-center mx-10 my-10 text-lg box-border max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full h-60" src="https://cdn.wallpapersafari.com/54/55/fTKnpB.jpg" alt="displaying the nft" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Minions</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  const myRefButton = React.useRef<HTMLDivElement>(null);
  const myButton = myRefButton.current;
  const searchRefButton = React.useRef<HTMLDivElement>(null);
  const searchButton = searchRefButton.current;

  const myRefDiv = React.useRef<HTMLDivElement>(null);
  const myAddresss = myRefDiv.current;
  const searchRefDiv = React.useRef<HTMLDivElement>(null);
  const searchAddresss = searchRefDiv.current;

  function myAddress() {
    myAddresss?.classList.remove("hidden");
    searchAddresss?.classList.add("hidden");
    myButton?.classList.add("bg-blue-600");
    myButton?.classList.add("text-white");
    searchButton?.classList.remove("bg-blue-600");
    searchButton?.classList.remove("text-white");
  }

  function searchAddress() {
    myAddresss?.classList.add("hidden");
    searchAddresss?.classList.remove("hidden");
    myButton?.classList.remove("bg-blue-600");
    myButton?.classList.remove("text-white");
    searchButton?.classList.add("bg-blue-600");
    searchButton?.classList.add("text-white");
  }

  return (
    <div>
      <Head>
        <title>All About NFTs</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="All About NFTs"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <nav className="px-4 py-3 bg-black text-white flex justify-end fixed w-full top-0 h-[10vh]">
          <ul className="pl-28 py-1 flex space-x-11">
            <ConnectButton accountStatus={"avatar"} showBalance={false} chainStatus={"none"} />
          </ul>
        </nav>
      </main>

      <div className='pt-[12.5vh] mx-3 h-[85vh]'>

        {/* <div className='flex justify-center mb-10'>
          <label className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800">
            <input type="checkbox" className="hidden peer" />
            <span className="px-4 py-2 rounded-l-md dark:bg-violet-400 peer-checked:dark:bg-gray-300" onChange={myAddress}>My Address</span>
            <span className="px-4 py-2 rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-violet-400" onChange={searchAddress}>Search Address</span>
          </label>
        </div> */}

        <div className='flex justify-center'>
          <div className='flex flex-row border-4 border-blue-100 rounded-md bg-blue-100 mt-4 p-0.5'>
            <div ref={myRefButton} className='cursor-pointer p-2 bg-blue-600 text-white rounded-md' onClick={myAddress}>
              My Address
            </div>
            <div ref={searchRefButton} className='cursor-pointer p-2 rounded-md' onClick={searchAddress}>
              Search Address
            </div>
          </div>
        </div>

        <div ref={myRefDiv} className='flex justify-center space-x-5 mt-10'>
          <input className='border-2 border-red-500 px-2 cursor-not-allowed' placeholder='Your address' onChange={(e) => setEnterAddress(e.target.value)} disabled/>
          <button className='p-3 rounded-2xl bg-green-500' onClick={fetchNfts}>FETCH</button>
        </div>

        <div ref={searchRefDiv} className='flex justify-center space-x-5 hidden mt-10'>
          <input className='border-2 border-blue-500 px-2' placeholder='Enter address' onChange={(e) => setEnterAddress(e.target.value)} />
          <button className='p-3 rounded-2xl bg-yellow-500' onClick={fetchNfts}>FETCH</button>
        </div>

      </div>

      {showNfts()}

      <div>
        <footer className={styles.footer}>
          <a>
            Made by Sabhani Bros.
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;

