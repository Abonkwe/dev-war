import { Link } from 'react-router-dom';

const ButtonSecondary = ({ label, onclick })=>{
    return (
        <button className="border-2 md:text-[#19995C] text-white transition-all duration-300 font-bold p-2 hover:shadow-md text-center rounded-sm text" onClick={onclick}>
          { label }
        </button>
    )
}

export default ButtonSecondary;