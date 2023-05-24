import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductsService from "../api/services/ProductsService";

const CATEGORIES_KEY = "categories";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const queryClient = useQueryClient();

  useQuery([CATEGORIES_KEY], ProductsService.getCategories, {
    onSuccess(data) {
      setCategories(data);
      queryClient.setQueryData(CATEGORIES_KEY, data);
    },
  });

  return (
    <div>
      {categories?.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  );
};

export default CategoriesPage;
