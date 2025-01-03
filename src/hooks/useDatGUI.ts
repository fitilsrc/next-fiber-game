import { useEffect, useRef } from "react";

import GUI from "lil-gui";

export function useDatGUI() {
  const gui = useRef<GUI>(null!)

  useEffect(() => {
      gui.current = new GUI()
      return () => {
          gui.current.destroy()
      }
  }, [])

  return gui
}