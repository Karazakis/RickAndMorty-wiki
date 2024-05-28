import { FaTicketAlt } from 'react-icons/fa';

export default function CouponButton() {
  return (
    <button className="couponbutton w-full text-white py-4 px-8 flex font-bold justify-center items-center space-x-2 rounded-b-lg">
      <FaTicketAlt className="text-xl" />
      <span>Get a coupon</span>
    </button>
  );
}