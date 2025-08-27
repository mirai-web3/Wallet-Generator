import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import BaseWalletGenerator from "../core/baseWallet.js";

class SolanaWalletGenerator extends BaseWalletGenerator {
  async generateWallet() {
    try {
      const bip39Passphrase = process.env.WALLET_BIP39_PASSPHRASE || undefined;
const mnemonic = bip39.generateMnemonic(256);
const seed = await bip39.mnemonicToSeed(mnemonic, bip39Passphrase);
const path = "m/44'/501'/0'/0'";
const { key } = derivePath(path, seed.toString("hex"));
const kp = nacl.sign.keyPair.fromSeed(key);
const keypair = Keypair.fromSecretKey(Buffer.from(kp.secretKey));

      return { address: keypair.publicKey.toString(),
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
        mnemonic,
        bip39Passphrase: bip39Passphrase || null,
        derivationPath: path,
      };
    } catch (error) {
      throw new Error(`Error generating Solana wallet: ${error.message}`);
    }
  }
}

export default SolanaWalletGenerator;
