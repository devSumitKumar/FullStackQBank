import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { getCategoryApi } from "../../store/slices/category/getCategory/getCategoryAPi";
import { IAddCategoryReq, ICategory, ICategoryPaths } from "../../types";
import { Code, FileCode, House, Mail, Server, Smartphone } from "lucide-react";
import { addCategoryApi } from "../../store/slices/category/addCategory/addCategoryApi";
import { showLoading, hideLoading } from "../../store/slices/loaderSlice";

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

  type CategoryKey = "JavaScript" | "ReactJS" | "NodeJS" | "DSA";

  const categoryConfig: Record<CategoryKey, { icon: any }> = {
    JavaScript: {
      icon: (
        <FileCode
          size={24}
          className={darkMode ? "text-blue-400" : "text-blue-600"}
        />
      ),
    },
    ReactJS: {
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

  // Add loader here
  const fetchCategoryList = async () => {
    let response = [] as ICategory[];
    
    try {
      dispatch(showLoading())
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
          categoryConfig[item.categoryType as CategoryKey] ?? defaultConfig;
        return {
          title: item.categoryType,
          description: item.description,
          icon: config.icon,
          path: `/questions/${item.categoryType}`,
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
        {
          title: "Add Qs",
          path: "/addnotes",
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

      const adminMenuItems = [
        {
          title: "Add Qs",
          path: "/addnotes",
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
      // const finalMenuItems =
      //   isAuthenticated && user?.isAdmin
      //     ? [...nonAdminMenuItems, ...adminMenuItems]
      //     : nonAdminMenuItems;
      const finalMenuItems =
        
           [...nonAdminMenuItems]
          
      setMenuItems(finalMenuItems);
    } catch (error) {
      console.error("Failed to fetch category list:", error);
    } finally {
      dispatch(hideLoading())
    }
  };


  const addNewCategory = async (categoryTitle: string, description : string) => {

    try {
      const category: IAddCategoryReq = {
        categoryType: categoryTitle,
        description: description,
      };
      await dispatch(addCategoryApi(category)).unwrap();
    } catch (error) {
      console.error("Failed to add new category:", error);

    }

  };

  return { categoryList, categoryListPath, menuItems, addNewCategory };
}
