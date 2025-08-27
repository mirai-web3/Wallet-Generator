import WalletGeneratorService from "./services/walletService.js";

// Restrict default file permissions for new files
process.umask(0o077);

async function main() {
  const service = new WalletGeneratorService();
  await service.generateWallets();
}

main().catch(console.error);