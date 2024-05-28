import Link from "next/link";
import React, { useState } from "react";
import ContactButton from "./components/contactbutton";
import SearchBar from "../searchbar";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 fixed top-0 w-full px-10 z-50 flex items-center">
      <div className="flex-1 flex items-center justify-center md:justify-start space-x-4 md:space-x-0">
        <Link href="/" className="flex flex-col flex-row items-center space-x-0 md:space-x-2">
          <h1 className="text-4xl font-bold rick-and-morty-font">Rick and Morty</h1>
          <h3 className="text-xl font-mono">The ultimate wiki</h3>
        </Link>
        <button className="text-3xl md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      <nav className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-black w-64 md:w-auto md:relative md:translate-x-0 flex flex-col md:flex-row items-center justify-center py-4 md:items-center`}>
        <div className="w-full md:hidden"> {/* SearchBar visible only in mobile */}
          <SearchBar placeholder="Search for characters, episodes, locations" />
        </div>
        <Link href="/character" className="font-mono p-2 hover:bg-gray-700 active:bg-gray-800 text-white w-full md:w-auto text-center md:text-left">
          Characters
        </Link>
        <Link href="/episode" className="font-mono p-2 hover:bg-gray-700 active:bg-gray-800 text-white w-full md:w-auto text-center md:text-left">
          Episodes
        </Link>
        <Link href="/location" className="font-mono p-2 hover:bg-gray-700 active:bg-gray-800 text-white w-full md:w-auto text-center md:text-left">
          Locations
        </Link>
        <div className="md:hidden"> {/* ContactButton visible only in mobile */}
          <ContactButton />
        </div>
      </nav>
      <div className="hidden md:flex flex-1 items-center justify-end">
        <SearchBar placeholder="Search for characters, episodes, locations" />
        <ContactButton />
      </div>
    </header>
  );
};

export default Index;
