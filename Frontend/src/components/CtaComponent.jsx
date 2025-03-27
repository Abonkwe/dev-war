import ButtonNext from "./ButtonNext";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import CtaSearch from "./CtaSearch";
import { Link } from "react-router-dom";
const CtaComponent = () => {
    return (
        <div class="bg-white mx-40">
            <div class="w-full sm:px-6 sm:py-32 ">
                <div class=" flex otems-center justify-center overflow-hidden sm:rounded-3xl sm:px-16 md:pt-10 lg:flex lg:gap-60 lg:pt-0 lg:mx-0">
                    <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Boost your productivity. Start using our app today.</h2>
                        <p class="mt-6 text-lg/8 text-pretty text-black">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
                        <CtaSearch/>
                        <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link to={"/explore"}><ButtonPrimary label={"Get started"}/></Link>
                            <ButtonSecondary label={"earn more"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CtaComponent;