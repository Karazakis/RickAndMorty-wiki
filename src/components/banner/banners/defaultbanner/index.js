import Image from 'next/image';
import CouponButton from '../../components/couponbutton';

export default function DefaultBanner(props) {
    const { fetchPriority, ...safeProps } = props;

    return (
        <div className="defaultbanner w-full flex flex-col items-center text-sm font-mono pt-24 bg-gray-100 rounded-t-xl mt-10">
            <div className="flex flex-col md:flex-row w-full max-w-full mx-auto shadow-xl">
                <div className="flex flex-col justify-center items-center md:w-1/2 px-10 py-8 order-2 md:order-1">
                    <div className="flex flex-col text-center w-full justify-center items-center">
                        <h1 className="hidden md:flex text-4xl font-bold font-mono">Rick and Morty</h1>
                        <h3 className="hidden md:flex text-xl font-mono">The ultimate wiki</h3>
                        <p className="md:text-lg text-s">Welcome to the Ultimate Wiki of Rick and Morty! Dive deep into the multiverse of Rick Sanchez and Morty Smith as they embark on bizarre and outlandish adventures across infinite realities.</p>
                        <p className="md:text-lg text-s">Get <strong>access to exclusive coupons</strong>, behind-the-scenes footage, and more by <strong>signing up for our newsletter.</strong></p>
                    </div>
                </div>
                <div className="flex justify-center items-center md:w-1/2 p-8 order-1 md:order-2">
                    <div className="w-full md:w-5/6">
                        <Image
                            src="/rick-and-morty.png"
                            alt="Rick and Morty Logo"
                            width={360} // Base width for desktop
                            height={74} // Base height for desktop
                            className="mx-auto" // Centers image horizontally
                            style={{ width: '65%', height: 'auto' }} // Resize on mobile
                        />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <CouponButton />
            </div>
        </div>
    );
}
