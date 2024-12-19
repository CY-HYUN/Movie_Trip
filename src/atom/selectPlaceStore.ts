import { CommonPlaceDataType, MoviePlaceDataType } from "@/type/movieType";
import { atom } from "recoil";

export const selectPlaceState = atom<MoviePlaceDataType[]>({
    key: 'selectPlaceState',
    default: []
})