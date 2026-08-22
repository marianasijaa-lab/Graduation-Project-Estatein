import PageHero from "../components/PageHero"
import { PropitySearchSection } from "../components/PropitySearchSection"


const ProperityPage = () => {
    return (
        <div>
            <PageHero title="Find Your Dream Property"
                description="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world.
                        Explore our curated selection of properties, each offering a unique story and a chance to redefine your life.
                        With categories to suit every dreamer, your journey"/>
            <PropitySearchSection />

        </div>
    )
}

export default ProperityPage
