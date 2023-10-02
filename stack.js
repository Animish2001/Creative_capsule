
  document.addEventListener("DOMContentLoaded", () => {
      const searchButton = document.getElementById("search-button");
      const searchInput = document.getElementById("searchbar");
      const resultsDiv = document.getElementById("results");

      searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
          
          const apiKey = 'iMCRRph3520TyQiLF3BJdw((';
          const apiUrl = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${encodeURIComponent(searchTerm)}&site=stackoverflow`;

          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              
              displayStack(data.items);
            })
            .catch((error) => {
              
              console.error('Fetch error:', error);
            });
        }
      });

      function displayStack(results) {
        resultsDiv.innerHTML = ""; 

        if (results.length === 0) {
          resultsDiv.innerHTML = "No results found.";
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
  
