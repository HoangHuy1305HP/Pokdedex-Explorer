import { fetchGraphQL } from "~/lib/graphql"
import type {Route} from "./+types/type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { TYPE_NAME, DEFAULT_TYPE} from "~/constants/pokemonTypes";
import ViewToggle from "~/components/ViewToggle";
import { TypeDropdown } from "~/components/TypeDropdown";
import { useViewStore } from "~/stores/useViewStore";
import PokemonCard from "~/components/pokemon/PokemonCard";
async function getPokemonByType(typeName:string,offset:number) {
  const query = `
    query GetPokemonByType($typeName:String!, $limit:Int!, $offset:Int!) {
        pokemon (
          where: { pokemontypes: { type: { name: { _eq: $typeName } } }, id: {_lte:160} }
          limit:$limit
          offset:$offset
        ) {
          id
          name
          pokemonsprites {
                sprites
          }
          pokemontypes {
            type {
              name
            }
          }  
        }
        pokemon_aggregate ( where: { pokemontypes: { type: { name: { _eq: $typeName } } }, id:{_lte:160} } ) {
          aggregate {
            count
                    }
        }
      }
  `
  const data = await fetchGraphQL(query, {typeName,limit:20,offset});
  const pokemons = data.pokemon;
  const totalCount = data.pokemon_aggregate.aggregate.count 
  return {pokemons,totalCount,offset,typeName}

}
export async function loader({params,request}:Route.LoaderArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset")) || 0;
  const data = await getPokemonByType(params.name,offset)
  if(!data) throw new Response("Not found 404",{status:404})
  return {pokemons:data.pokemons, totalCount:data.totalCount,offset,typeName:data.typeName}
}
export default function TypePokemon({loaderData}:Route.ComponentProps) {
  const {pokemons,totalCount,offset,typeName} = loaderData;
  const limit = 20;
  const maxPages = Math.ceil(totalCount/limit);
  const currentPage = offset/limit + 1
  const viewMode = useViewStore((state) => state.viewMode)
  const setViewMode = useViewStore((state) => state.setViewMode)

  return (
    <div className="  flex flex-col justify-center items-center w-full">
         <div className="realtive flex gap-20 mt-6 lg:m-10  items-center lg:gap-250 ">
                   <ViewToggle viewMode={viewMode} setViewMode={setViewMode}></ViewToggle>
                   <TypeDropdown></TypeDropdown>
          </div>
    <div className="flex flex-col justify-center items-center">
      <h3 className={`${TYPE_NAME[typeName].bg} text-white p-3 rounded-sm mt-6`}> {`${typeName}`}</h3>
      {viewMode === "grid" && (
                <ul className="grid lg:grid-cols-4 gap-4 max-w-360 mt-10 p-6">
              {pokemons.map((pokemon:any) => (
                
                <PokemonCard key={pokemon.id} pokemon={pokemon} view={"grid"}></PokemonCard>
               
                
                
              ))}
            </ul>
              )}
      
              {viewMode === "list" && (
                <ul>
                  {pokemons.map((pokemon:any) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} view={"list"}></PokemonCard>
                  ))}
                </ul>
              )}
      
      <div className="flex justify-between mt-12 mb-2">
        {offset > 0 && (
        <Link to={`/type/${typeName}/?offset=${offset - limit}`}><ChevronLeft size={50} className={`bg-black text-white p-3 rounded-sm`}/></Link>
      )}
        <p className="lg:text-2xl lg:font-light lg:mx-10 lg:justify-center lg:items-center lg:flex">{currentPage} / {maxPages}</p>
        {currentPage < maxPages && (
          <Link to={`/type/${typeName}/?offset=${offset + limit}`}><ChevronRight size={50} className={`bg-black text-white p-3 rounded-sm `}/></Link>
        )}
        
      </div>
      
    </div>
            
    </div>
    
    
  )
}