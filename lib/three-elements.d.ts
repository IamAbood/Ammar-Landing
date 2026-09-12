// React 19's JSX types live under `React.JSX`, not the old global `JSX` namespace that
// @react-three/fiber v8 augments — so its `<mesh>`, `<group>`, etc. intrinsics need to be
// re-declared here against the namespace TypeScript actually resolves against.
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
