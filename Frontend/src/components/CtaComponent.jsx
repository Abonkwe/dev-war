import ButtonNext from "./ButtonNext";
import ButtonSecondary from "./ButtonSecondary";
const CtaComponent = ()=>{
    return(
        <div className="cta-main mx-40 ">
            <div className="text">
                <h1 className="text-3xl font-black my-10">
                     LanceCAM   Your One Stop for Job Search and employee Finding.
                </h1>
                <p>
                    your frelanceing starts here
                </p>
                <ButtonNext label={"Explore Jobs"}/>
                <ButtonSecondary label={"Post a job"}/>
            </div>
            <div className="actions">

            </div>
        </div>
    )
}

export default CtaComponent;