import { createContext, useReducer } from "react";
const ThemeContexttt = createContext('light');

const initialData = {
  mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : 'Light',
  sun: 'fa-regular',
};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...firstState, mode: action.newMode };
    case "TOOGLE_SUN":
      return { ...firstState, sun: action.newValue };
    default:
      return firstState;
  }
}

export function DataProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changeMode = (clr) => {
    localStorage.setItem("mode", clr);
    // @ts-ignore
    dispatch({ type: "CHANGE_MODE", newMode: clr });
  };
  const toggleSun = (q) => {
    // @ts-ignore
    dispatch({ type: "TOOGLE_SUN", newValue: q});
  };
  return (
    <ThemeContexttt.Provider value={{ ...firstState, changeMode, toggleSun }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;