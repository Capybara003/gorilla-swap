import { useTheme } from 'next-themes'
import { FC } from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";


export const ThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      style={{background: 'transparent', border: 'none'}}
      >
      {resolvedTheme === 'light' ? <MdLightMode style={{color:'rgb(98 111 4)', width:'30px', height:'30px'}}/> : <MdDarkMode style={{color:'rgb(217 245 9)', width:'30px', height:'30px'}}/>}
    </button>
  )
}
