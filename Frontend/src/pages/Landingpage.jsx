import Navbar from "../components/NavBar";
import CtaComponent from "../components/CtaComponent";
import Trusted from "../components/Trusted";
import JobCategoryPage from "../components/JobCategory";
import CommentsSection from "../components/Comments";
import Footer from "../components/Footer";
const Landingpage = () => {
    return (
        <>
            <Navbar />
            <CtaComponent />
            <Trusted />
            <JobCategoryPage />
            <CommentsSection />
            <Footer />
        </>
    )
}

export default Landingpage;