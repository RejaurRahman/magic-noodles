import React from "react"
import useInstance from "./useInstance"

const useThemeMode = ({ themes = {}, initThemeMode }) => {
  const themeRef = React.useRef({})
  const getInstance = useInstance(themeRef.current)

  const [themeMode, setThemeMode] = React.useState(initThemeMode)
  const [themeConfig, setThemeConfig] = React.useState(themes[initThemeMode])

  const availableThemeModes = React.useMemo(() => {
    return Object.keys(themes).reduce((result, theme) => {
      if (theme === themeMode) return result
      return [...result, theme]
    }, [])
  }, [themes, themeMode])

  const isValidThemeMode = React.useCallback(
    name => {
      return themes[name] ? true : false
    },
    [themes]
  )

  const changeThemeMode = React.useCallback(
    name => {
      if (!isValidThemeMode(name)) return
      setThemeMode(name)
      setThemeConfig(themes[name])
      return
    },
    [themes, isValidThemeMode]
  )

  Object.assign(getInstance(), {
    availableThemeModes,
    themeMode,
    themeConfig,
    changeThemeMode,
  })

  return getInstance()
}

export default useThemeMode
