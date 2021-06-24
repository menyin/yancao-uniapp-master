let BASE_URL = ''


if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'https://api.597.com' // 开发环境
} else {
	BASE_URL = 'https://api.597.com' // 生产环境
}
let staticDomainURL = 'https://cdn.597.com';

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default configService