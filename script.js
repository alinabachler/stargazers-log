async function loadStarredRepositories() {
  const list = document.querySelector("#starred");
  const status = document.querySelector("#status");

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();
    if (
      !Array.isArray(events) ||
      !events.every(
        (event) =>
          event !== null &&
          typeof event === "object" &&
          typeof event.name === "string" &&
          typeof event.starred === "string"
      )
    ) {
      throw new Error("Repository data has an invalid format");
    }

    if (events.length === 0) {
      status.textContent = "No starred repositories found.";
      return;
    }

    const items = events.map((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      return item;
    });
    list.replaceChildren(...items);
    status.textContent = `${events.length} starred repositories loaded.`;
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    status.textContent =
      "Could not load starred repositories. Please try again later.";
  }
}

loadStarredRepositories();
