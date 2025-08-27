# Wallet Generator

Minimal CLI to generate multi-chain wallets and save them as **plaintext JSON**.  
No passwords, no keystores, no extra prompts — just standard, compatible keys.

---

## Features
- **EVM (Ethereum & L2s)**
  - BIP-39 mnemonic (24 words)
  - Derivation path: `m/44'/60'/0'/0/0`
- **Solana**
  - BIP-39 + ed25519 HD (SLIP-0010 style)
  - Derivation path: `m/44'/501'/0'/0'` (Phantom-compatible)
- **Transparent outputs**
  - `address`, `publicKey`, `privateKey`, `mnemonic`, `derivationPath`, `bip39Passphrase` (null if unset)
- **Safer file permissions**
  - Starts with `umask(0o077)` and tries `chmod 0600` on outputs (best-effort on POSIX)

> Other chains (Cosmos/IBC, Sui, TON) may be present depending on generators in `src/generators/`.

---

## Setup
$ git clone https://github.com/mirai-web3/Wallet-Generator  
$ cd Wallet-Generator  
$ npm install

**Requirements:** Node.js 18+ (ESM), npm or pnpm.

---

## Usage
Run the CLI and follow the prompt:

$ node src/main.js

Outputs are written to `./output/` as JSON files.

### Optional: BIP-39 passphrase
Used by BIP-39 generators (e.g., EVM, Solana). Changes derived keys.

macOS/Linux:
$ export WALLET_BIP39_PASSPHRASE="my-extra-passphrase"
$ node src/main.js

Windows (PowerShell):
> setx WALLET_BIP39_PASSPHRASE "my-extra-passphrase"
(restart terminal), then:
> node src/main.js

---

## Importing into wallets
- **EVM:** import by mnemonic (24 words), path `m/44'/60'/0'/0/0`.
- **Solana:** import by mnemonic, path `m/44'/501'/0'/0'` (Phantom-compatible).
- For other chains, check the specific generator in `src/generators/`.

---

## Notes
- Outputs are **plaintext**. Treat `./output/` like a safe; avoid synced/shared folders.
- On POSIX systems, files default to owner-only; permission tweaks are best-effort on non-POSIX.
- This tool **only generates** wallets; it does not sign transactions or interact with dapps.
