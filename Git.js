


  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("searchbar");
    const githubResults = document.getElementById("github-results");

    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();

      if (searchTerm !== "") {
        
        const apiKey = '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';
        const apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}`;
        const headers = {
          Authorization: `token ${apiKey}`,
        };

        fetch(apiUrl, { headers })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            
            displayGit(data.items);
          })
          .catch((error) => {
            
            console.error('Fetch error:', error);
          });
      }
    });

    function displayGit(results) {
      githubResults.innerHTML = ""; 

      if (results.length === 0) {
        githubResults.innerHTML = "No results found.";
        return;
      }

      const ul = document.createElement("ul");

      results.forEach((result) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${result.html_url}" target="_blank">${result.full_name}</a>`;
        ul.appendChild(li);
      });

      githubResults.appendChild(ul);
    }
  });

