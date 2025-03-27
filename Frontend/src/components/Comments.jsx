const CommentsSection = () => {
    const testimonials = [
        {
            id: 1,
            user: "User123",
            comment: "Great job opportunities here!",
            svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='w-6 h-6'><path d='M12 2v20m10-10H2'/></svg>"
        },
        {
            id: 2,
            user: "JobSeeker456",
            comment: "I found my dream job through this site.",
            svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='w-6 h-6'><path d='M12 2v20m10-10H2'/></svg>"
        },
        {
            id: 3,
            user: "CareerFinder789",
            comment: "The application process was seamless!",
            svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='w-6 h-6'><path d='M12 2v20m10-10H2'/></svg>"
        }
    ];

    return (
        <div className="comments-section bg-white p-10 rounded shadow mt-10 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-[#19995C]">What Our Users Say</h2>
            <div className="comment-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="comment bg-[#f9f9f9] border border-[#19995C] rounded-lg p-5 shadow-md transition-transform transform hover:scale-105">
                        <div className="svg-icon mb-3" dangerouslySetInnerHTML={{ __html: testimonial.svg }} />
                        <strong className="text-[#19995C]">{testimonial.user}</strong>
                        <p>{testimonial.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;