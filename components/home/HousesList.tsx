import { House } from "@prisma/client"
import {v4 as uuidv4} from 'uuid'
import HouseCard from "../elements/cards/HouseCard"
import Container from "../elements/Container"



const HousesList = async ({houses}: {houses: House[]}) => {
    
    return (
        <Container>
    <div className="grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 mt-4">
        {houses.map((house) => (
            <HouseCard key={uuidv4()} house={house}/>
        ))}
    </div>

        </Container>
  )
}

export default HousesList