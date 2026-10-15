const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    if (repositories.length === 0) {
      statusMessage.textContent = "No starred repositories yet.";
      return;
    }

    const items = repositories.map((repository) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const description = document.createElement("p");
      description.className = "repository-description";
      description.textContent = repository.description;

      const date = document.createElement("p");
      date.className = "repository-date";
      date.textContent = `Starred on ${new Date(repository.starredAt).toLocaleDateString()}`;

      item.append(link, description, date);
      return item;
    });

    repositoryList.replaceChildren(...items);
    statusMessage.textContent = `${repositories.length} starred repositories`;
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
  }
}

loadRepositories();
