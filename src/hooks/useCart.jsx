import { useLocalStorage } from "@uidotdev/usehooks";

export const useCart = () => {
  const [cart, setCart] = useLocalStorage("cart", []);
  return { cart, setCart };
};
