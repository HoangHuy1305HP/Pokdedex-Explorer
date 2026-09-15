const GRAPHQL_ENDPOINT = "https://graphql.pokeapi.co/v1beta2";

export async function fetchGraphQL(query:string, variables: Record<string,any> = {}) {
    const res = await fetch(GRAPHQL_ENDPOINT,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({query,variables})
    });
    const json = await res.json();
     if (json.errors) {
    console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
  }
    return json.data;
}