// Original background image path before editing: "url('/bg.jpg')"
import ButtonNext from "./ButtonNext";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { Link } from "react-router-dom"; // Add this import

const CtaComponent = () => {
    return (
        <div className="relative h-[400px] p-10 text-white bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
            {/* Ensure the image exists at `public/assets/images/bg.jpg`. */}
            {/* Overlay for faint effect */}
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="flex flex-col justify-center h-full relative z-10 text-center">
                <h1 className="text-4xl font-extrabold my-4">
                    Find Your Dream Job or The Perfect Candidate with LanceCAM
                </h1>
                <p className="my-4 font-medium text-lg">
                    Start your freelancing journey today with top opportunities waiting for you.
                </p>
                <div className="actions flex justify-center gap-5 mt-6">
                    <Link to={"/explore"}> <ButtonNext label={"Explore Jobs"} /></Link>
                    <Link to={"/postjob"}><ButtonSecondary label={"Post a Job"} /></Link>
                </div>
            </div>
        </div>
    );
}

export default CtaComponent;
