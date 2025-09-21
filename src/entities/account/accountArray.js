import Overview from "./AccountPages/Overview/Overview";
import Profile from "./AccountPages/Profile/Profile";
import Favorites from "./AccountPages/Favorites/Favorites";
import Addresses from "./AccountPages/Addresses/Addresses";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";

export const accountArray = [
  {
    id: 1,
    title: "Մուտք",
    link: "/login",
    component: Login,
  },
  {
    id: 2,
    title: "Գրանցում",
    link: "/register",
    component: Register,
  },
  {
    id: 3,
    title: "📊 Ակնարկում",
    link: "/overview",
    visibleFor: ["user", "admin"],
    component: Overview,
  },
  {
    id: 4,
    title: "👤 Պրոֆիլ",
    link: "/profile",
    visibleFor: ["user", "admin"],
    component: Profile,
  },
  {
    id: 5,
    title: "📍 Հասցեներ",
    link: "/addresses",
    visibleFor: ["user", "admin"],
    component: Addresses,
  },
  {
    id: 6,
    title: "❤️ Սիրված ուտեստներ",
    link: "/favorites",
    visibleFor: ["user", "admin"],
    component: Favorites,
  },
  {
    id: 7,
    title: "🚪 Ելք",
    link: "/logout",
    visibleFor: ["user", "admin"],
    component: null,
  },
];