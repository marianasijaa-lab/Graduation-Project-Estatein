import { Outlet } from "react-router"
import JourneyToday from "./components/JourneyToday"
import PageHero from "./components/PageHero"
function Root() {
  return (

   <div>
    <div className="bg-primary text-gray">Hello World</div>
    {/* the div above is  to be deleted */}
    
        <main>
        <PageHero
  title="Find Your Dream Property"
  description="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and designed to inspire your life. With expert guidance to suit every dream and every journey."
/>
            <JourneyToday/>
            <Outlet/>
        </main>
   </div>
  )
}

export default Root