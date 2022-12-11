import React from "react"

const useInstance = object => {
  const ref = React.useRef()
  ref.current = object

  return React.useCallback(() => ref.current, [])
}

export default useInstance
