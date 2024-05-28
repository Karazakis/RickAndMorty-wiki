
import React from "react";
import Image from "next/image";

const Index = () => {
    return (
        <div className="flex flex-col">
            <footer className="footer bg-black shadow-md fixed bottom-0 left-0 flex h-10 w-full items-center justify-center lg:relative lg:h-20 lg:px-4">
                <a
                    className="flex place-items-center gap-2 p-2"
                    href="https://www.linkedin.com/in/antonio-koutsoumadis/"
                >
                    Powered By{" "}
                    <Image
                        src="/aklogo.webp"
                        alt="ak Logo"
                        width={70}
                        height={24}
                        priority
                    />
                </a>
            </footer>
        </div>
    );
}

export default Index;
