// var RNFS = require('react-native-fs');
var FileUpload = require('NativeModules').FileUpload;

var youtube = {

	postVideo(file){
		var url = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&access_token=ya29.QQISs1W8EuT_Ojd4m6gcYKq0JV_iLCu4bXvC5YUHNH2KyNc_ah54puPYeOWNtVwpaR7k';
		var body = {
			snippet: {
				title: 'my first wormie!',
				description: 'pleaseeeee wormie',
				tags: ['wormie']
			},
			status: {
				privacyStatus: 'private'
			}
		};
		var filename = file.split('/');
		filename = filename[filename.length-1];
		
		var obj = {
			uploadUrl: url,
			method: 'POST', // default 'POST',support 'POST' and 'PUT'
			headers: {
				'Accept': 'application/json',
			},
			fields: body,
			files: [
				{
					// name: 'one', // optional, if none then `filename` is used instead
					filename: filename, // require, file name
					filepath: file, // require, file absoluete path
					// filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
				},
			]
    };

    FileUpload.upload(obj, function(err, result) {
          console.log('upload:', err, result);
        });

		// console.log('about to post the video to youtube');
	 //  return fetch(url, {
	 //    method: 'post',
	 //    body: RNFS.readFile(file, 'base64')
	 //  }).then((res) => {
	 //  	console.log('i heard back from youtube, and they said: ', res);
	 //  	res.json()
	 //  });
	}

};

module.exports = youtube;










































// var Youtube = require("youtube-api");

// var CREDENTIALS = {
// 	client_id: '934911620716-r9sjo3531jmot6k3vbsjgkjietjhcbna.apps.googleusercontent.com'
// 	client_secret: '0jT8y-JIHsgLQMeyXloux8zC'
// 	redirect_uri: 'http://www.nickfujita.com'
// 	access_token: 'QzXfi1JZ_0Ta05_C_LvohdUsPfPPhMfz3rnO0qF7Bck#'
// }

// // Authenticate 
// // You can access the Youtube resources via OAuth2 only. 
// // https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts 
// var oauth = Youtube.authenticate({
//     type: "oauth"
//   , client_id: CREDENTIALS.client_id
//   , client_secret: CREDENTIALS.client_secret
//   , redirect_url: CREDENTIALS.redirect_uri
// });

// oauth.setCredentials(CREDENTIALS.access_token);

		// Youtube.videos.insert({
		//             resource: {
		//                 // Video title and description 
		//                 snippet: {
		//                     title: "Testing YoutTube API NodeJS module"
		//                   , description: "Test video upload via YouTube API"
		//                 }
		//                 // I don't want to spam my subscribers 
		//               , status: {
		//                     privacyStatus: "private"
		//                 }
		//             }
		//             // This is for the callback function 
		//           , part: "snippet,status"
		 
		//             // Create the readable stream to upload the video 
		//           , media: {
		//                 // body: Fs.createReadStream("video.mp4")
		//                 body: file

		//             }
		//         }, function (err, data) {
		//             if (err) { return lien.end(err, 400); }
		//             lien.end(data);
		//         });
