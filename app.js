async function displayInformations() {
    const response = await fetch('recipes.json'); 
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      return data;
}

displayInformations().then((data) => {
    console.log(data);
})