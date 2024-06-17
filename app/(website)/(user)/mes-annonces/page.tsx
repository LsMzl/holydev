// Components
import Container from "@/components/elements/Container";
import HousesList from "@/components/home/HousesList";
import { getAllCategories } from "@/queries/getAllCategories";
import { getAllHouseTypes } from "@/queries/getAllHouseTypes";

// Datas
import { getHousesByUserId } from "@/queries/getHousesByUserId";

const UserHouses = async () => {
  const houses = await getHousesByUserId();
  const categories = await getAllCategories();
  const houseTypes = await getAllHouseTypes();

  if (!houses) {
    return <div>Aucune annonce trouvée</div>;
  }

  return (
    <Container>
      <h2 className="text-2xl font-medium">Mes annonces</h2>
      <HousesList houses={houses} categories={categories} houseTypes={houseTypes}/>
    </Container>
  );
}

export default UserHouses;
