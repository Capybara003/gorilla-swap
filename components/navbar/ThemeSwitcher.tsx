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
      {resolvedTheme === 'light' 
      ? <MdLightMode style={{color:'yellow', width:'30px', height:'30px', textShadow:'0 0 10px 10px rgba(0, 0, 0, 0.5)'}}/> 
      : <MdDarkMode style={{color:'yellow', width:'30px', height:'30px', textShadow:'0 0 10px 10px rgba(0, 0, 0, 0.5)'}}/>}
    </button>
  )
}
