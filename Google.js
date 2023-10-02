

    const apiKey = 'AIzaSyALi5i6NbSfa1BgxcITlNCd2BoZ1O2P5c4'; 
            const cx = '16209a374f4134a71'; 
            const searchButton = document.getElementById("search-button");
            const searchInput = document.getElementById("searchbar");
            const googleResults = document.getElementById("results");

            searchButton.addEventListener("click", () => {
                const searchTerm = searchInput.value.trim();

                if (searchTerm !== "") {
                    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&cx=${cx}`;

                    fetch(apiUrl)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            
                            displayGoogle(data.items);
                        })
                        .catch((error) => {
                            
                            console.error('Fetch error:', error);
                        });
                }
            });

            function displayGoogle(results) {
                googleResults.innerHTML = ""; 

                if (results.length === 0) {
                    googleResults.innerHTML = "No results found.";
                }

                const ul = document.createElement("ul");

                results.forEach((result) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<a href="${result.link}" target="_blank">${result.title}</a>`;
                    ul.appendChild(li);
                });

                googleResults.appendChild(ul);
            }
        