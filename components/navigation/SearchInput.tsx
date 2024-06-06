import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import qs from "query-string";
import { useDebounceValue } from "@/hooks/useDebounceValue";

const SearchInput = () => {
   const searchParams = useSearchParams();
   const title = searchParams.get("title");

   const [value, setValue] = useState(title || "");

   const pathname = usePathname();
   const router = useRouter();

   const debounceValue = useDebounceValue<string>(value);

   useEffect(() => {
      const query = {
         title: debounceValue,
      };

      const url = qs.stringifyUrl(
         {
            url: window.location.href,
            query,
         },
         { skipNull: true, skipEmptyString: true }
      );

      router.push(url);
   }, [debounceValue, router]);

   const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(event.target.value);
   };

   return (
      <div className="flex">
         <input
            className="border-r-0 rounded-r-0 border rounded-l-full border-gray-500 py-1.5 px-3"
            value={value}
            onChange={onChange}
         />
         <button
            className="border border-l-0 border-gray-500 rounded-r-full pr-2 bg-background"
            type="submit"
         >
            <Search size={20} className="mx-2" />
         </button>
      </div>
   );
};

export default SearchInput;
