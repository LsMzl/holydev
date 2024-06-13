"use client";
import React, { useEffect, useState } from "react";

// Components
import {
   Select,
   SelectContent,
   SelectItem,
   SelectValue,
} from "../ui/select";

// Hooks
import useLocation from "@/hooks/useLocations";

// Libraries
import { v4 as uuidv4 } from "uuid";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { CountrySelect, CountrySelectTrigger } from "../ui/countrySelect";

const CountryFilter = () => {
   const [country, setCountry] = useState("");
   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
   const countries = getAllCountries();

   const router = useRouter();
   const params = useSearchParams();

   useEffect(() => {
      if (country === "") {
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

      const url = qs.stringifyUrl(
         {
            url: "/",
            query: currentQuery,
         },
         { skipNull: true, skipEmptyString: true }
      );

      router.push(url);
   }, [country]);

   return (
      <div>
         <CountrySelect
            value={country}
            onValueChange={(value) => setCountry(value)}
         >
            <CountrySelectTrigger className="bg-background">
               <SelectValue placeholder="Pays" />
            </CountrySelectTrigger>
            <SelectContent>
               {countries.map((country) => (
                  <SelectItem value={country.isoCode} key={uuidv4()}>
                     {country.name}
                  </SelectItem>
               ))}
            </SelectContent>
         </CountrySelect>
      </div>
   );
};

export default CountryFilter;
