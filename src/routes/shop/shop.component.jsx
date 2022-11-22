import { Routes, Route} from "react-router-dom"
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategories = async () => {
         const categoriesMap = await  getCategoriesAndDocuments()
         dispatch(setCategoriesMap(categoriesMap))
        }
        getCategories();
     }, [])
    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    )
        
}

export default Shop;