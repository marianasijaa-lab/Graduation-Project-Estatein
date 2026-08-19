import { Outlet } from "react-router"
import { useTheme } from "./Context/ThemeContext";
import { ThemeToggleButton } from "./components/ThemeToggleButton";
function Root() {
  const { theme } = useTheme();
  return (

    <div className={`${theme === 'dark' ? 'bg-[#0E0E0E] text-white' : 'bg-gray-50 text-gray-900'}`} >
      <div className="bg-primary text-gray">Hello World</div>
      {/* the div above is  to be deleted */}

      <main>
        <Outlet />
      </main>
      <ThemeToggleButton />
    </div>
  )
}

export default Root