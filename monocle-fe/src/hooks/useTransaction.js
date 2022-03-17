// Utils
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  createAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Program config
import { IDL, PROGRAM_ID } from "program/monocle_program_v2";

// Hooks
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export function useTransaction() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallet = useAnchorWallet();
  const connection = new anchor.web3.Connection(endpoint, "confirmed");

  const provider = new anchor.Provider(connection, wallet, {
    preflightCommitment: "confirmed",
  });
  const programId = new anchor.web3.PublicKey(PROGRAM_ID);
  const program = new anchor.Program(IDL, programId, provider);

  async function handleTransaction({ title, likes }) {
    // Korisnik koji placa transakcije
    const payer = anchor.web3.Keypair.generate();

    // Kreiranje instrukcije za airdropovanje
    const airdrop_tx = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      2000000000
    );

    // Airdropovanje tokena korisniku koji placa transakcije
    await program.provider.connection.confirmTransaction(airdrop_tx);

    // Kreiranje token sablona koji ce predstavljati NFT
    const token = await createMint(
      program.provider.connection,
      payer,
      payer.publicKey,
      null,
      0
    );

    // Kreiranje account-a koji ce drzati token - NFT
    const tokenAccount = await createAssociatedTokenAccount(
      program.provider.connection,
      payer,
      token,
      wallet.publicKey
    );

    // Kreiranje nove instance tokena baziranog na token sablonu
    // i prebacivanje na prethodno kreiran account
    await mintTo(
      program.provider.connection,
      payer,
      token,
      tokenAccount,
      payer,
      1
    );

    // Pronalazenje adrese za metadata o NFT-ju
    const [metadataAccountPda, metaBump] = await PublicKey.findProgramAddress(
      [Buffer.from("monocle"), token.toBuffer()],
      program.programId
    );

    // Pronalazenje adrese za Monocle metadata o NFT-ju
    const [monocleMetadataAccountPda, monoBump] =
      await PublicKey.findProgramAddress(
        [
          Buffer.from("monocle"),
          token.toBuffer(),
          Buffer.from("monocle-metadata"),
        ],
        program.programId
      );

    // Izvrsavanje transakcije "BuyNFT"
    const buyTx = await program.rpc.buyNft(
      new anchor.BN(metaBump), // random bump za adresu za metapodatke
      new anchor.BN(monoBump), // random bump za adresu za Monocle metapodatke
      title, // naziv NFTja - naziv posta
      "MONO", // Simbol NFTja - ostaje isti za sve
      "https://monocle.io/post/IDPosta", // Putanja ka postu
      new anchor.BN(likes), // Broj lajkova
      {
        accounts: {
          metadataAccount: metadataAccountPda,
          monocleMetadata: monocleMetadataAccountPda,
          nftMint: token,
          mintAuthority: payer.publicKey,
          payer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      }
    );

    return { buyTx, token };
  }

  return { handleTransaction };
}
