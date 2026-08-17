import { Outlet } from "react-router"
function Root() {
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

export default Root