
// const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data)
// const GetUserResume=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail)
// const UpdateResumeDetail=(id,data)=>axiosClient.put('user-resumes/'+id,data)
// const GetResumeById=(id)=>axiosClient.get('user-resumes/'+id)


// export default {
//     CreateNewResume,
//     GetUserResume,
//     UpdateResumeDetail,
//     GetResumeById
// }



import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = async (data) => {
    try {
        return await axiosClient.post('user-resumes', data);
    } catch (error) {
        console.error('Error creating new resume:', error);
        throw error;
    }
};

const GetUserResume = async (userEmail) => {
    try {
        const url = `user-resumes?filters[userEmail][$eq]=${userEmail}`;
        console.log('Fetching user resume from:', url);
        return await axiosClient.get(url);
    } catch (error) {
        console.error('Error fetching user resume:', error);
        throw error;
    }
};

const UpdateResumeDetail = async (id, data) => {
    try {
        return await axiosClient.put(`user-resumes/${id}`, data);
    } catch (error) {
        console.error('Error updating resume detail:', error);
        throw error;
    }
};

const GetResumeById = async (id) => {
    try {
        const url = `user-resumes/${id}?populate=*`;
        console.log('Fetching resume by ID from:', url);
        return await axiosClient.get(url);
        
    } catch (error) {
        console.error('Error fetching resume by ID:', error.response?.data || error.message);
        throw error;
    }
};
const DeleteResumeById = async (id) => {
    try {
        const url = `user-resumes/${id}`;
        console.log('Deleting resume by ID from:', url);
        return await axiosClient.delete(url);
    } catch (error) {
        console.error('Error deleting resume by ID:', error.response?.data || error.message);
        throw error;
    }
}


export default {
    CreateNewResume,
    GetUserResume,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};

// import axios from "axios"



// const API_KEY= import.meta.env.VITE_STRAPI_API

// const axiosClient= axios.create({
//     baseURL: 'http://localhost:1337/api/',
//     headers:{
//         'Content-Type':'application/json',
//         'Authorization':`Bearer ${API_KEY}`
//     }
// })



// const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data)
// const GetUserResume=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail)
// const UpdateResumeDetail=(id,data)=>axiosClient.put('user-resumes/'+id,data)
// const GetResumeById=(id)=>axiosClient.get('user-resumes/'+id)


// export default {
//     CreateNewResume,
//     GetUserResume,
//     UpdateResumeDetail,
//     GetResumeById
// }



// import axios from "axios";

// const API_KEY = import.meta.env.VITE_STRAPI_API;

// const axiosClient = axios.create({
//     baseURL: 'http://localhost:5000/api/',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//     }
// });

// const CreateNewResume = async (data) => {
//     try {
//         return await axiosClient.post('user-resumes', data);
//     } catch (error) {
//         console.error('Error creating new resume:', error);
//         throw error;
//     }
// };

// const GetUserResume = async (userEmail) => {
//     try {
//         const url = `user-resumes?userEmail=${userEmail}`;
//         console.log('Fetching user resume from:', url);
//         return await axiosClient.get(url);
//     } catch (error) {
//         console.error('Error fetching user resume:', error);
//         throw error;
//     }
// };

// const UpdateResumeDetail = async (id, data) => {
//     console.log('newly updated data', data);
//     try {
//         return await axiosClient.put(`user-resumes/${id}`, data);
//     } catch (error) {
//         console.error('Error updating resume detail:', error);
//         throw error;
//     }
// };

// const GetResumeById = async (id) => {
//     try {
//         const url = `user-resumes/${id}?populate=*`;
//         console.log('Fetching resume by ID from:', url);
//         return await axiosClient.get(url);
//         console.log(' errrrrrrrrrrrrr')
//     } catch (error) {
//         console.error('Error fetching resume by ID:', error.response?.data || error.message);
//         throw error;
//     }
// };


// export default {
//     CreateNewResume,
//     GetUserResume,
//     UpdateResumeDetail,
//     GetResumeById
// };
