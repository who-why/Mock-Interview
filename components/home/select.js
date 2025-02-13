"use client";

import React, { useContext } from "react";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectGroup, 
  SelectLabel, 
  SelectItem 
} from "@/components/ui/select";
import { MyContext } from "@/context/context";

const LevelSelect = () => {
  const { Explvl, setExplvl } = useContext(MyContext);

  return (
    <Select 
      className="w-full mt-3" 
      value={Explvl} 
      onValueChange={(value) => setExplvl(value)}
    >
      <SelectTrigger className="w-[200px] px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition-all duration-200">
        <SelectValue placeholder="Select Level" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <SelectGroup>
          <SelectLabel className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Engineering Levels</SelectLabel>
          <SelectItem value="junior" className="py-2 hover:bg-blue-100 dark:hover:bg-blue-700 rounded-md transition-all duration-150">
            Junior Engineer
          </SelectItem>
          <SelectItem value="mid" className="py-2 hover:bg-blue-100 dark:hover:bg-blue-700 rounded-md transition-all duration-150">
            Mid Level Engineer
          </SelectItem>
          <SelectItem value="senior" className="py-2 hover:bg-blue-100 dark:hover:bg-blue-700 rounded-md transition-all duration-150">
            Senior Engineer
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LevelSelect;
