import { create } from "zustand";

interface WalletStore {
  walletName: string;
  updateWalletName: (walletName: string) => void;
}

const useWalletStore = create<WalletStore>((set) => ({
  walletName: "",
  updateWalletName: (walletName) => set(() => ({ walletName: walletName })),
}));

export default useWalletStore;
