import { NavLink } from "react-router-dom";
import { useAppSelector } from '../hooks';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' },
];

const NavLinks = () => {
  const user = useAppSelector((state) => state.user.user);

  const elems = links.map((link) => {
    const { id, url, text } = link;

    if ((url === 'checkout' || url === 'orders') && !user) {
      return null;
    }

    return (
      <li key={id}>
        <NavLink className="capitalize" to={url}>
          {text}
        </NavLink>
      </li>
    );
  });
  return (
    <>
      {elems}
    </>
  );
};

export default NavLinks;
