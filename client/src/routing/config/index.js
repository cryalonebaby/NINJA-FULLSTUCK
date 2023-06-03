import { Home, Hero, CreateHero, EditHero } from "../../pages";
import { HOME_PATH, HERO_PATH, CREATE_PATH, EDIT_PATH } from "./paths";

// array for routes from pages and paths
export const PrivateRoutes = [
  {
    path: HOME_PATH,
    element: Home
  },
  {
    path: HERO_PATH,
    element: Hero
  },
  {
    path: CREATE_PATH,
    element: CreateHero
  },
  {
    path: EDIT_PATH,
    element: EditHero
  },
]