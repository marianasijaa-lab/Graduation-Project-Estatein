import { SectionHeader } from "../components/common/SectionHeader"
import { ContactForm } from "../components/sections/contact/ContactForm"
import PageHero from "../components/sections/hero/PageHero"
import { PropitySearchSection } from "../components/sections/property/PropertySearchSection"
import { PropertiesGrid } from "../components/sections/property/PropertiesGrid"
import { MdCall, MdEmail } from "react-icons/md"


const ProperityPage = () => {
    return (
        <div>
            <PageHero
                title="Find Your Dream Property"
                description="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world.
                        Explore our curated selection of properties, each offering a unique story and a chance to redefine your life.
                        With categories to suit every dreamer, your journey"
                className="pb-24 md:pb-32"
            />
            <PropitySearchSection className="-mt-10 md:-mt-20" />
            <section className="w-full">
              <div className="site-container py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Discover a World of Possibilities' subtitle='Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home' />
                <PropertiesGrid />
              </div>
            </section>
            <section className="w-full">
              <div className="site-container py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Lets Make it Happen' subtitle='Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Dont wait; lets embark on this exciting journey together.' />
                <ContactForm
                    columns={4}
                    extraFields={[
                        { name: 'location', label: 'Preferred Location', type: 'dropdown', placeholder: 'Select Location', options: ['Dubai', 'Malibu'] },
                        { name: 'propertyType', label: 'Property Type', type: 'dropdown', placeholder: 'Select Property Type', options: ['Villa', 'Apartment'] },
                        { name: 'bathrooms', label: 'No. of Bathrooms', type: 'dropdown', placeholder: 'Select no. of Bathrooms', options: ['1', '2', '3+'] },
                        { name: 'bedrooms', label: 'No. of Bedrooms', type: 'dropdown', placeholder: 'Select no. of Bedrooms', options: ['1', '2', '3+'] },
                        { name: 'budget', label: 'Budget', type: 'dropdown', placeholder: 'Select Budget', options: ['$100k-$500k', '$500k+'], colSpan: 2 },
                        {
                            name: 'prefNumber',
                            label: 'Preferred Contact Method',
                            type: 'input',
                            placeholder: 'Enter Your Number',
                            icon: MdCall,
                            hasDot: true,
                            dotSelected: true
                        },
                        {
                            name: 'prefEmail',
                            type: 'input',
                            placeholder: 'Enter Your Email',
                            icon: MdEmail,
                            hasDot: true,
                            dotSelected: false
                        },
                    ]}
                />
              </div>
            </section>
        </div>
    )
}

export default ProperityPage
