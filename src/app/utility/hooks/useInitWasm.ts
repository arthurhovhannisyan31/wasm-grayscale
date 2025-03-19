import { useEffect, useState } from "react";

export interface WasmModule {
  grayscale: (val: string) => void;
}

export const useInitWasm = (): WasmModule | undefined => {
  const [wasmModule, setWasmModule] = useState<WasmModule>();

  useEffect(() => {
    async function loadWasm() {
      try {
        const wasm = await import("../../../../pkg");
        if (wasm) {
          setWasmModule(wasm);
        }
      } catch (e) {
        console.log(e);
      }
    }

    loadWasm();
  }, []);

  return wasmModule;
};
