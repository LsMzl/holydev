import { Country, State, City } from "country-state-city";


/** */
const useLocation = () => {
   /**
    * Permet de récupérer un pays grâce à un code donné.
    * @returns Pays demandé.
    */
   const getCountryByCode = (countryCode: string) => {
      return Country.getAllCountries().find(
         (country) => country.isoCode === countryCode
      );
   };
   /**
    * Permet de récupérer l'état d'un pays grâce à son code.
    * @param countryCode String - Code du pays dans lequels récupérer l'état.
    * @param stateCode String - Code de l'état.
    */
   const getStateByCode = (countryCode: string, stateCode: string) => {
      const state = State.getAllStates().find(
         (state) =>
            state.countryCode === countryCode && state.isoCode === stateCode
      );

      if (!state) return null;

      return state;
   };

   /**
    * Permet de récupérer tous les états d'un pays grâce au code du pays.
    * @param countryCode String - Code du pays dans lequels récupérer les états.
    * @returns Array - Tableau contenant les états d'un pays.
    */
   const getCountryStates = (countryCode: string) => {
      return State.getAllStates().filter(
         (state) => state.countryCode === countryCode
      );
   };

   /**
    * Permet de récupérer toutes les villes d'un état grâce au code du pays et de l'état.
    * @param countryCode String - Code du pays dans lequels récupérer les villes.
    * @param stateCode String - Code de l'état dans lequels récupérer les états.
    * @returns Array - Tableau contenant les villes d'un état.
    */
   const getStateCities = (countryCode: string, stateCode?: string) => {
      return City.getAllCities().filter(
         (city) =>
            city.countryCode === countryCode && city.stateCode === stateCode
      );
   };

   return {
      getAllCountries: Country.getAllCountries,
      getCountryByCode,
      getStateByCode,
      getCountryStates,
      getStateCities
   }
};

export default useLocation;