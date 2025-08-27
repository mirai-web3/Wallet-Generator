import { ethers } from "ethers";
import BaseWalletGenerator from "../core/baseWallet.js";

class EVMWalletGenerator extends BaseWalletGenerator {
  async generateWallet() {
    try {
      const wallet = ethers.Wallet.createRandom();

      return {address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,, bip39Passphrase: (process?.env?.WALLET_BIP39_PASSPHRASE || null), derivationPath: "m/44'/60'/0'/0/0"};
    } catch (error) {
      throw new Error(`Error generating EVM wallet: ${error.message}`);
    }
  }
}

export default EVMWalletGenerator;
