
export default () =>({
    AWS_REGION: process.env.AWS_REGION || 'not defined',
    AWS_ACCESS_KEY_ID :  process.env.AWS_ACCESS_KEY_ID || 'not defined',
    AWS_SECRET_ACCESS_KEY : process.env.AWS_ACCESS_KEY_ID || 'not defined',
    AWS_PUBLIC_BUCKET_NAME : process.env.AWS_PUBLIC_BUCKET_NAME || 'not defined',
    VALID_FILE_EXTENSIONS : ['png','jpeg'],
    VALID_FILE_TYPES : ['image/jpeg','image/png'],
    MAX_SIZE : 14500000
})