import { all, call, put, takeLatest } from "typed-redux-saga/macro"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesSuccess, fetchCategoriesError } from "./category.action"
import { CATEGORIES_ACTION_TYPES } from "./category.types"


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments)
        yield* put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield* put(fetchCategoriesError(error as Error))
    }
}

export function* onFetchCategories(){
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* catgoriesSaga() {
    yield* all([call(onFetchCategories)])


}