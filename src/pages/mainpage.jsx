import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Nav from "../components/nav";
import Dashboard from "./dashboard";
import Products from "./products";
import NewProducts from "./new-products";
import EditProducts from "./edit-products";
import ProductCategory from "./product-category";
import Promotions from "./promotions";
import Profile from "./profile";
import Settings from "./settings";
import Orders from "./orders";

export default function Mainpage() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (page) => {
    if (page === "logout") {
      window.location.href = "/";
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard isDark={isDark} onNavigate={handleNavigate} />;
      case "orders":
        return <Orders isDark={isDark} onNavigate={handleNavigate} />;
      case "products":
        return <Products isDark={isDark} onNavigate={handleNavigate} />;
      case "new-products":
        return <NewProducts isDark={isDark} />;
      case "edit-products":
        return <EditProducts isDark={isDark} />;
      case "product-category":
        return <ProductCategory isDark={isDark} />;
      case "promotions":
        return <Promotions isDark={isDark} />;
      case "profile":
        return <Profile isDark={isDark} />;
      case "settings":
        return <Settings isDark={isDark} />;
      default:
        return <Dashboard isDark={isDark} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className={`w-full h-screen flex font-montserrat ${isDark ? "bg-gray-950 text-gray-100" : "bg-[#f8fafc] text-gray-900"
        }`}
    >
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed md:hidden inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <Sidebar
        isDark={isDark}
        sidebarOpen={sidebarOpen}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Header */}
        <Nav
          isDark={isDark}
          toggleTheme={toggleTheme}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
          onNavigate={handleNavigate}
        />

        {/* Page Content */}
        {renderPage()}
      </div>
    </div>
  );
}
