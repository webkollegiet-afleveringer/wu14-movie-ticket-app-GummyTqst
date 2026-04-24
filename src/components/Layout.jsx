import { Outlet, useLocation } from "react-router";
import BottomNav from "./BottomNav";

const hideNavRoutes = [
  '/movie/:id',
  '/movie/:id/select-seats',
  '/movie/:id/checkout',
  '/tickets'
];

export default function Layout() {
  const location = useLocation();
  
  const shouldHideNav = hideNavRoutes.some(route => {
    const regex = new RegExp('^' + route.replace('/:id', '/[^/]+') + '$');
    return regex.test(location.pathname);
  });
  
  return (
    <div className={shouldHideNav ? "px-4" : "pb-28 px-4"}>
      <Outlet />
      {!shouldHideNav && <BottomNav />}
    </div>
  )
}