import { House } from "@prisma/client"
import {uuid as v4} from 'uuidv4'
import HouseCard from "../elements/cards/HouseCard"
import Container from "../elements/Container"



const HousesList = async ({houses}: {houses: House[]}) => {
    
    return (
        <Container>
    <div className="grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 mt-4">
        {houses.map((house) => (
            <HouseCard key={v4()} house={house}/>
        ))}
    </div>

        </Container>
  )
}

export default HousesList