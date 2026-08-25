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
              <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Discover a World of Possibilities' subtitle='Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home' />
                <PropertiesGrid />
              </div>
            </section>
            <section className="w-full">
              <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Lets Make it Happen' subtitle='Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Dont wait; lets embark on this exciting journey together.' />
                <ContactForm
                    columns={4}
                    extraFields={[
                        { name: 'location', type: 'dropdown', placeholder: 'Select Location', options: ['Dubai', 'Malibu'] },
                        { name: 'propertyType', type: 'dropdown', placeholder: 'Select Property Type', options: ['Villa', 'Apartment'] },
                        { name: 'bedrooms', type: 'dropdown', placeholder: 'Select no. of Bedrooms', options: ['1', '2', '3+'] },
                        { name: 'bathrooms', type: 'dropdown', placeholder: 'Select no. of Bedrooms', options: ['1', '2', '3+'] },
                        { name: 'budget', type: 'dropdown', placeholder: 'Select Budget', options: ['$100k-$500k', '$500k+'], colSpan: 2 },
                        {
                            name: 'prefNumber',
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
