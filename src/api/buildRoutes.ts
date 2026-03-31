export async function buildRoutes(){
    const response = await fetch(`http://localhost:3001/ride/get-routes`);
   const json = await response.json()
   return {response, json}
}