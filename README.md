# Create T3 App

This is a [MERN Stack](`MongoDB Express React Node`) project bootstrapped with `create-react-app`.

REACT_APP_API_URL=http://localhost:5000
Cloudinary:
REACT_APP_UPLOAD_KEY= `https://console.cloudinary.com/settings` Upload presets `Mode:Unsigned`
REACT_APP_CLOUD_NAME= `https://console.cloudinary.com/console` Cloud Name

// https://cloudinary.com/documentation/upload_images#example_1_upload_multiple_files_using_a_form_unsigned
// The upload API method enables you to upload files with a direct call to Cloudinary
// by sending an HTTPS POST request to the following Cloudinary URL:
// https:api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload
export const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/video/upload`;
export const cloudinaryUrlImage = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
