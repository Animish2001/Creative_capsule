document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("searchbar");
    const resultsDiv = document.getElementById("resultsDiv");
    const googleTab = document.getElementById("google-tab");
    const youtubeTab = document.getElementById("youtube-tab");
    const stackTab = document.getElementById("stack-tab");
    const githubTab = document.getElementById("github-tab");

    
    function clearResults() {
        resultsDiv.innerHTML = "";
    }

    
    function performSearch(searchTerm) {
        clearResults();

        if (googleTab.classList.contains("active")) {
            searchGoogle(searchTerm);
        } else if (youtubeTab.classList.contains("active")) {
            searchYouTube(searchTerm);
        } else if (stackTab.classList.contains("active")) {
            searchStackOverflow(searchTerm);
        } else if (githubTab.classList.contains("active")) {
            searchGitHub(searchTerm);
        }
    }
    googleTab.addEventListener("click", () => {
    window.location.href = "./Google/Google.html";
});
    youtubeTab.addEventListener("click", () => {
    window.location.href = "./Youtube/youtube.html";
});
    stackTab.addEventListener("click", () => {
    window.location.href = "./StackOverflow/stack.html";
});
    githubTab.addEventListener("click", () => {
    window.location.href = "./Github/Git.html";
});

    
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            performSearch(searchTerm);
        }
    });

    
    // googleTab.addEventListener("click", () => {
    //     googleTab.classList.add("active");
    //     youtubeTab.classList.remove("active");
    //     stackTab.classList.remove("active");
    //     githubTab.classList.remove("active");
    // });

    // youtubeTab.addEventListener("click", () => {
    //     youtubeTab.classList.add("active");
    //     googleTab.classList.remove("active");
    //     stackTab.classList.remove("active");
    //     githubTab.classList.remove("active");
    // });

    // stackTab.addEventListener("click", () => {
    //     stackTab.classList.add("active");
    //     googleTab.classList.remove("active");
    //     youtubeTab.classList.remove("active");
    //     githubTab.classList.remove("active");
    // });

    // githubTab.addEventListener("click", () => {
    //     githubTab.classList.add("active");
    //     googleTab.classList.remove("active");
    //     youtubeTab.classList.remove("active");
    //     stackTab.classList.remove("active");
    // });

    
    function searchGoogle(searchTerm) {
        const API_KEY = 'AIzaSyALi5i6NbSfa1BgxcITlNCd2BoZ1O2P5c4';
                const cx = '16209a374f4134a71'; 
                const API_URL = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}&cx=${cx}`;

                fetch(API_URL)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Google api error! STATUS: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        
                        displayResults(data.items);
                    })
                    .catch((error) => {
                        console.error('Google api error:', error);
                    });
        resultsDiv.innerHTML = "Google search results for: " + searchTerm;
    }

    // Placeholder function for YouTube search
    function searchVideos(searchTerm) {
        const API_KEY = 'AIzaSyC9to1CoE0MapAMAwITl_Pu2rNACGdR-m0';
                const API_URL = `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}&part=snippet`;

                fetch(API_URL)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Youtube api error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        
                        displayVideos(data.items);
                    })
                    .catch((error) => {
                        console.error('Youtube api error:', error);
                    });
        resultsDiv.innerHTML = "YouTube search results for: " + searchTerm;
    }

    // Placeholder function for Stack Overflow search
    function searchStackOverflow(searchTerm) {
        const API_KEY = 'iMCRRph3520TyQiLF3BJdw((';
                const API_URL = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${encodeURIComponent(searchTerm)}&site=stackoverflow&key=${API_KEY}`;

                fetch(API_URL)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`StackOverflow api error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        
                        displayStack(data.items);
                    })
                    .catch((error) => {
                        console.error('StackOverflow api error:', error);
                    });
        resultsDiv.innerHTML = "Stack Overflow search results for: " + searchTerm;
    }

    // Placeholder function for GitHub search
    function searchGitHub(searchTerm) {
        const API_KEY = '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';
                const API_URL = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchTerm)}`;

                fetch(API_URL, {
                    headers: {
                        Authorization: `token ${API_KEY}`,
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Github api error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        
                        displayGitHub(data.items);
                    })
                    .catch((error) => {
                        console.error('Github api error:', error);
                    });
        resultsDiv.innerHTML = "GitHub search results for: " + searchTerm;
    }
    function displayResults(results) {
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "No results found.";
        return;
    }

    const ul = document.createElement("ul");

    results.forEach((result) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${result.link}" target="_blank">${result.title}</a>`;
        ul.appendChild(li);
    });

    resultsDiv.appendChild(ul);
}

});
