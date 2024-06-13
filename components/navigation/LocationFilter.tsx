"use client";
import { useEffect, useState } from "react";
import Container from "../elements/Container";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import useLocation from "@/hooks/useLocations";
import { v4 as uuidv4 } from "uuid";
import { ICity, IState } from "country-state-city";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const LocationFilter = () => {
   const router = useRouter();
   const params = useSearchParams();

   const [country, setCountry] = useState("");
   const [state, setState] = useState("");
   const [city, setCity] = useState("");
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);

   const { getAllCountries, getCountryStates, getStateCities } = useLocation();

   const countries = getAllCountries();

   useEffect(() => {
      const countryStates = getCountryStates(country);

      if (countryStates) {
         setStates(countryStates);
         setState("");
         setCity("");
      }
   }, [country]);

   useEffect(() => {
      const stateCities = getStateCities(country, state);

      if (stateCities) {
         setCities(stateCities);
         setCity("");
      }
   }, [country, state]);

   useEffect(() => {
      if (country === "" && state === "" && city === "") {
         return router.push("/");
      }

      let currentQuery: any = {};

      if (params) {
         currentQuery = qs.parse(params.toString());
      }

      if (country) {
         currentQuery = {
            ...currentQuery,
            country,
         };
      }
      if (state) {
         currentQuery = {
            ...currentQuery,
            state,
         };
      }
      if (city) {
         currentQuery = {
            ...currentQuery,
            city,
         };
      }

      if (state === "" && currentQuery.state) {
         delete currentQuery.state;
      }
      if (city === "" && currentQuery.city) {
         delete currentQuery.city;
      }

      const url = qs.stringifyUrl(
         {
            url: "/",
            query: currentQuery,
         },
         { skipNull: true, skipEmptyString: true }
      );

      router.push(url);
   }, [country, state, city]);

   const handleClear = () => {
      router.push("/");
      setCountry("");
      setState("");
      setCity("");
   };

   return (
      <div className="flex flex-col items-center text-sm w-full">
         <div className="flex justify-between text-xs font-medium w-full mb-3">
            <p>Filtres</p>
            <p
               className="text-red-500 cursor-pointer"
               onClick={() => handleClear()}
            >
               Annuler
            </p>
         </div>
         <div className="w-full flex flex-col gap-1">
            {/* Pays */}
            <div>
               <Select
                  value={country}
                  onValueChange={(value) => setCountry(value)}
               >
                  <SelectTrigger className="bg-background">
                     <SelectValue placeholder="Pays" />
                  </SelectTrigger>
                  <SelectContent>
                     {countries.map((country) => (
                        <SelectItem value={country.isoCode} key={uuidv4()}>
                           {country.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            {/* Régions */}
            <div className="w-full">
               <Select value={state} onValueChange={(value) => setState(value)}>
                  <SelectTrigger className="bg-background">
                     <SelectValue placeholder="Région" />
                  </SelectTrigger>
                  <SelectContent>
                     {!!states.length &&
                        states.map((state) => (
                           <SelectItem value={state.isoCode} key={uuidv4()}>
                              {state.name}
                           </SelectItem>
                        ))}
                  </SelectContent>
               </Select>
            </div>
            {/* Villes */}
            <div>
               <Select value={city} onValueChange={(value) => setCity(value)}>
                  <SelectTrigger className="bg-background">
                     <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                     {!!cities.length &&
                        cities.map((city) => (
                           <SelectItem value={city.name} key={uuidv4()}>
                              {city.name}
                           </SelectItem>
                        ))}
                  </SelectContent>
               </Select>
            </div>
         </div>
      </div>
   );
};

export default LocationFilter;
