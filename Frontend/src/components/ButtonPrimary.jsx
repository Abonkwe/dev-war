import { Link } from 'react-router-dom';

const ButtonPrimary = ({ label, onClick }) => {
    return (
        <button
            className="md:bg-[#19995C] min-w-[3em] bg-white transition-all duration-300 hover:bg-[#19995be8] hover:shadow-md text-white font-bold p-3 rounded-sm text-center inline-block"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default ButtonPrimary;