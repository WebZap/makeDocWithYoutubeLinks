const { google } = require("googleapis");
const fs = require('fs');
// const { API_KEY, PLAYLIST_ID } = require('./components/static');
const API_KEY = 'AIzaSyCcRSBJEAr4Pb9XMX0R6tyCXapYWJn-uyM';
const PLAYLIST_ID = 'PLC6SOxxIy7fkKO5PhfpO52El1njo1d7xm';

const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY
});


const getVideoLinks = async () => {
    try {
        const responce = await youtube.playlistItems.list({
            part: 'snippet',
            playlistId: PLAYLIST_ID,
            maxResults: 150,
        });

        const videoLinks = responce.data.items.map(item => {
            return `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId} \n ${item.snippet.title}`
        })


        fs.writeFileSync('video_links.txt', videoLinks.join('\n\n'))
    } catch (error) {
        console.log(error)
    }
}

getVideoLinks()

