import { RiFileWarningFill } from 'react-icons/ri'

const EmptyState = () => {
  return (
       <div className="flex p-10 flex-col justify-center items-center">
         < RiFileWarningFill  size={300} color="#9d9c9c" className="my-6"/>
         <h3 className="text-4xl font-bold mb-6">NO RESULT FOUND</h3>
         <p className="text-md font-light text-gray-400/80">Sorry for the inconvenience there was no match for your search maybe try different set of filters</p>
       </div>
  )
}

export default EmptyState