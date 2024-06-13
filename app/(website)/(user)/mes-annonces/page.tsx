// Components
import Container from "@/components/elements/Container";
import HousesList from "@/components/home/HousesList";
import { getAllCategories } from "@/queries/getAllCategories";

// Datas
import { getHousesByUserId } from "@/queries/getHousesByUserId";

const UserHouses = async () => {
  const houses = await getHousesByUserId();
  const categories = await getAllCategories();

  if (!houses) {
    return <div>Aucune annonce trouvée</div>;
  }

  return (
    <Container>
      <h2 className="text-2xl font-medium">Mes annonces</h2>
      <HousesList houses={houses} categories={categories}/>
    </Container>
  );
}

export default UserHouses;
