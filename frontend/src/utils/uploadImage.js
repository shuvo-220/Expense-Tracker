import {API_PATHS} from './apiPath'
import axiosInstance from './axiosInstance'

const uploadImage=async(imageFile)=>{
    const formData = new FormData();
    formData.append('image', imageFile)
    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:'multipart/form-data'
        })
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error
    }
}
export default uploadImage;