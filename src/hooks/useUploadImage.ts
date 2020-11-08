import axios from 'axios'

export default () => {
    return async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("api_key", "429129422882794")
        formData.append("upload_preset", "museumgo")
        const fileURL = (await axios.post("https://api.cloudinary.com/v1_1/dbuulurmr/image/upload", formData)).data.secure_url
        return fileURL
    }
}

