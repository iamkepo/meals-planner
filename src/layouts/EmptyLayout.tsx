import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { toggleTheme, useThemeStore } from '../stores/themeStore';
import ModalComponent from '../components/ModalComponent';
import ToastComponent from '../components/ToastComponent';

const EmptyLayout: React.FC = () => {
  const { theme } = useThemeStore();
    
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
  }, [theme]);

  return (
    <section className={`container-full vh-100`}>
      <div className="float-end">
        <button
          type="button"
          aria-label={`Toggle theme to ${theme === "dark" ? "light" : "dark"}`}
          className={`btn btn-${theme}`}
          onClick={toggleTheme}
        >
          <i className={`bi bi-${theme === "dark" ? "sun" : "moon"}`}></i>
        </button>
      </div>
      <Outlet />

      <ModalComponent />
      <ToastComponent />
    </section>
  );
};

export default EmptyLayout;