import { Outlet } from "react-router"
function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDark, setIsDark] = useState(true);

  const currentPath = location.pathname.replace('/', '') || 'home';
  const activePage = (currentPath === '' ? 'home' : currentPath) as PageId;

  return (

   <div>
    <div className="bg-primary text-gray">Hello World</div>
    {/* the div above is  to be deleted */}
    
        <main>
            <Outlet/>
        </main>
   </div>
  )
}

export default Root;
