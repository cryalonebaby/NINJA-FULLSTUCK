import { Home, Hero } from "../../pages";
import { HOME_PATH, HERO_PATH } from "./paths";

export const PrivateRoutes = [
  {
    path: HOME_PATH,
    element: Home
  },
  {
    path: HERO_PATH,
    element: Hero
  },
]