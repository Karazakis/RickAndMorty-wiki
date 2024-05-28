
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "../header/index.js";
import Footer from "../footer/index.js";
import Banner from "../banner/index.js";


const Index = ({children}) => {
    return <main>
        <Header />
        <div className="flex flex-col min-h-screen">
            <Banner />
            <div className="flex-grow w-full mt-4 px-4">
                    {children}
            </div>
            <Footer />
        </div>
    </main>;
}

export default Index;