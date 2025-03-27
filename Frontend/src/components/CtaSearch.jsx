import ButtonPrimary from "./ButtonPrimary"

const CtaSearch = ()=>{
    return(
        <div className="search bg-slate-300 my-5 rounded-sm p-1.5 flex justify-between items-center">
            <input type="text" />
            <ButtonPrimary label={"Search for a job"}/>
        </div>
    )
}

export default CtaSearch;