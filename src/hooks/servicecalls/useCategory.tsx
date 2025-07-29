import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { getCategoryApi } from "../../store/slices/category/getCategory/getCategoryAPi";
import { ICategory, ICategoryPaths } from "../../types";
import { Code, FileCode, House, Mail, Server, Smartphone } from "lucide-react";
import { addCategoryApi } from "../../store/slices/category/addCategory/addCategoryApi";

export default function useCategory() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [categoryList, setCategoryList] = useState<Array<ICategory>>([]);
  const [categoryListPath, setCategoryListPath] = useState<
    Array<ICategoryPaths>
  >([]);
  const [menuItems, setMenuItems] = useState<Array<ICategoryPaths>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const categoryState = useSelector((state: RootState) => state.category);

  type CategoryKey = "JavaScript" | "React" | "NodeJS" | "DSA";

  const categoryConfig: Record<CategoryKey, { icon: any }> = {
    JavaScript: {
      icon: (
        <FileCode
          size={24}
          className={darkMode ? "text-blue-400" : "text-blue-600"}
        />
      ),
    },
    React: {
      icon: (
        <Code
          size={24}
          className={darkMode ? "text-blue-400" : "text-blue-600"}
        />
      ),
    },
    NodeJS: {
      icon: (
        <Server
          size={24}
          className={darkMode ? "text-blue-400" : "text-blue-600"}
        />
      ),
    },
    DSA: {
      icon: (
        <Smartphone
          size={24}
          className={darkMode ? "text-blue-400" : "text-blue-600"}
        />
      ),
    },
  };

  const defaultConfig = {
    icon: (
      <FileCode
        size={24}
        className={darkMode ? "text-blue-400" : "text-blue-600"}
      />
    ),
  };

  useEffect(() => {
    fetchCategoryList();
  }, [dispatch, isAuthenticated, user]);

  const fetchCategoryList = async () => {
    let response = [] as ICategory[];
    try {
      if (categoryState.category.length > 0) {
        console.log("Using cached category list");
        response = categoryState.category;
      } else {
        console.log("Fetching category list from API");
        response = (await dispatch(getCategoryApi()).unwrap()) as ICategory[];
      }

      setCategoryList(response);
      const categoryItems = response.map((item) => {
        const config =
          categoryConfig[item.category as CategoryKey] ?? defaultConfig;
        return {
          title: item.category,
          description: item.description,
          icon: config.icon,
          path: `/questions/${item.category}`,
        } as ICategoryPaths;
      });
      setCategoryListPath(categoryItems);
      const nonAdminMenuItems = [
        {
          title: "House",
          path: "/",
          icon: <House size={20} />,
          description: "",
        },
        ...categoryItems,
      ];

      const adminMenuItems = [
        {
          title: "Add Qs",
          path: "/add-notes",
          icon: <Mail size={20} />,
          description: "",
        },
        {
          title: "Add category",
          path: "/AddCategory",
          icon: <Mail size={20} />,
          description: "",
        },
      ];
      const finalMenuItems =
        isAuthenticated && user?.isAdmin
          ? [...nonAdminMenuItems, ...adminMenuItems]
          : nonAdminMenuItems;
      setMenuItems(finalMenuItems);
    } catch (error) {
      console.error("Failed to fetch category list:", error);
    }
  };


  const addNewCategory = async (categoryTitle: string, description : string) => {

    try {
      const category: ICategory = {
        id: new Date().toISOString(),
        category: categoryTitle,
        description: description,
      };
      await dispatch(addCategoryApi(category)).unwrap();
    } catch (error) {
      console.error("Failed to add new category:", error);

    }

  };

  return { categoryList, categoryListPath, menuItems, addNewCategory };
}
