import ButtonNext from "./ButtonNext";
import ButtonSecondary from "./ButtonSecondary";
const CtaComponent = ()=>{
    return(
        <div className="cta-main mx-40 ">
            <div className="text">
                <h1 className="text-3xl font-black my-10">
                     LanceCAM   Your One Stop for Job Search and employee Finding.
                </h1>
                <p className="my-10 font-bold">
                    your frelanceing starts here
                </p>
                
            </div>
            <div className="actions flex gap-20">
            <ButtonNext label={"Explore Jobs"}/>
            <ButtonSecondary label={"Post a job"}/>
            </div>
        </div>
    )
}

export default CtaComponent;