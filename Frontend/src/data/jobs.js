const jobCategories = [
    "Software Development",
    "Marketing",
    "Design",
    "Sales",
    "Human Resources",
    "Finance",
    "Customer Service",
    "IT Support"
];

const citiesInCameroon = [
    "Douala",
    "Yaoundé",
    "Bamenda",
    "Buea",
    "Limbe",
    "Kribi",
    "Garoua",
    "Maroua",
    "Ngaoundéré",
    "Ebolowa",
    "Bafoussam",
    "Kumba",
    "Dschang",
    "Bertoua",
    "Foumban",
    "Nkongsamba",
    "Tiko",
    "Mbalmayo",
    "Bafia",
    "Mamfe"
];

const jobs = [
    // Jobs matching categories on the landing page
    ...Array.from({ length: 40 }, (_, i) => {
        const category = jobCategories[i % jobCategories.length];
        const city = citiesInCameroon[i % citiesInCameroon.length];
        return {
            id: i + 1,
            job_title: `${category} Specialist - ${50_000 + i * 1_000} FCFA - ${300_000 + i * 1_000} FCFA`,
            description: `We are looking for a skilled ${category} Specialist to join our team. Responsibilities include delivering high-quality work and collaborating with cross-functional teams. Salary: ${50_000 + i * 1_000} FCFA - ${300_000 + i * 1_000} FCFA.`,
            location: i % 2 === 0 ? `Remote/${city}` : `Onsite/${city}`,
            contact_email: `${category.toLowerCase().replace(/\s+/g, '')}${i + 1}@example.com`,
            date_posted: new Date(Date.now() - i * 86400000).toISOString(),
            category: category.toLowerCase()
        };
    }),

    // Additional jobs for variety
    ...Array.from({ length: 60 }, (_, i) => {
        const category = i % 3 === 0 ? "Technical" : i % 3 === 1 ? "Arts" : "Science";
        const city = citiesInCameroon[i % citiesInCameroon.length];
        return {
            id: i + 41,
            job_title: `${category} Job ${i + 1} - ${40_000 + i * 500} FCFA - ${200_000 + i * 500} FCFA`,
            description: `Join our team as a ${category} professional to work on exciting projects and deliver exceptional results. Salary: ${40_000 + i * 500} FCFA - ${200_000 + i * 500} FCFA.`,
            location: i % 2 === 0 ? `Onsite/${city}` : `Remote/${city}`,
            contact_email: `${category.toLowerCase()}${i + 41}@example.com`,
            date_posted: new Date(Date.now() - (i + 100) * 86400000).toISOString(),
            category: category.toLowerCase()
        };
    })
];

export default jobs;
