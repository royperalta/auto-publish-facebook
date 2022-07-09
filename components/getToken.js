import fetch from 'node-fetch';
async function getToken() {
    try {
        (await import('dotenv')).config({ path: ".env" })
        const response = await fetch(`https://graph.facebook.com/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.ClIENT_SECRET}&grant_type=client_credentials`)
        const { access_token } = await response.json()
        console.log(access_token)
    } catch (e) {
        console.log(e)
    }
}
export default getToken
