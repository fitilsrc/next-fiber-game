import { ConiferForests } from "@/features/terrain/components/conifer-forests-model"
import { DeciduousForests } from "@/features/terrain/components/deciduous-forests-model"
import { TreeMaterial, TreeUniforms } from "@/features/terrain/components/materials/tree.material";
import { extend, ShaderMaterialProps } from "@react-three/fiber";

extend({ TreeMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      treeMaterial: ShaderMaterialProps & Partial<TreeUniforms>;
    }
  }
}


export const ForestsLayer = () => {
  return (
    <group>
      <ConiferForests />
      <DeciduousForests />
    </group>
  )
}
