


            const API_KEY = 'AIzaSyBq3Bcf1P0SRGKyMsEnK3viuVCfbkC9CKw'; // Replace with your YouTube Data API key
            const API_URL = 'https://www.googleapis.com/youtube/v3/search';

            const searchbar = document.getElementById('searchbar');
            const resultsDiv = document.getElementById('results');

            document.getElementById('search-button').addEventListener('click', () => {
                searchVideos();
            });

            searchbar.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    searchVideos();
                }
            });

            function searchVideos() {
                const query = searchbar.value.trim();
                if (query === '') {
                    alert('Please enter a search term.');
                    return;
                }

                const url = `${API_URL}?key=${API_KEY}&part=snippet&q=${query}&maxResults=10`;

                fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Network response was not ok: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // Displaying results
                        displayYoutube(data.items);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            }

            function displayYoutube(videos) {
        const resultsDiv = document.getElementById("resultsDiv");

        resultsDiv.innerHTML = '';

        videos.forEach((video) => {
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;
            const videoThumbnail = video.snippet.thumbnails.medium.url;

            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';

            const videoLink = document.createElement('a');
            videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
            videoLink.target = '_blank';

            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = videoThumbnail;
            thumbnailImg.alt = videoTitle;

            const titleDiv = document.createElement('div');
            titleDiv.textContent = videoTitle;

            videoLink.appendChild(thumbnailImg);
            videoLink.appendChild(titleDiv);
            videoContainer.appendChild(videoLink);

            resultsDiv.appendChild(videoContainer);
        });
    }

    

