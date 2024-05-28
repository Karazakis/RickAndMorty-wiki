import Image from 'next/image';

export default function ArchiveBanner() {
    return (
        <div className="archivebanner w-full flex items-center text-sm font-mono z-10 mt-20">
            <div className="flex flex-row w-full max-w-full mx-auto shadow-xl">
                <div className="w-full h-24 relative overflow-hidden">
                    <Image
                        src="/archive.webp"
                        alt="Archive Logo"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
