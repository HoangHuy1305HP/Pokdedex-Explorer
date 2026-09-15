
import type {Route} from "./+types/search"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import  ViewToggle  from "~/components/ViewToggle";
import { TypeDropdown } from "~/components/TypeDropdown";
import { TYPE_NAME, DEFAULT_TYPE } from "~/constants/pokemonTypes";
import { Form } from "react-router";
import { fetchGraphQL } from "~/lib/graphql";
import PokemonCard from "~/components/pokemon/PokemonCard";
import { useViewStore } from "~/stores/useViewStore";
async function searchPokemon(name:string,offset:number) {
    const query = `
        query SearchPokemon($name: String!,$limit:Int,$offset:Int) {
        pokemon(where: { name: { _iregex: $name }, id:{ _lte:160} },limit:$limit,offset:$offset) {
            id
            name
            pokemontypes {
                type { name }
            }
            pokemonsprites {
                sprites
            }
        }
        pokemon_aggregate(where: {name: {_iregex: $name}, id: {_lte: 160}}) {
            aggregate {
            count
                    }
        }
}
    `
    const data = await fetchGraphQL(query,{name,limit:20,offset})
    return {
        results: data.pokemon,
        totalCount: data.pokemon_aggregate.aggregate.count
    }
}

export async function loader({request}: Route.LoaderArgs) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const offset = Number(url.searchParams.get("offset")) || 0
    if (!query) {
    return { result: [], query: null };
  }
    const {results,totalCount} = await searchPokemon(query,offset);
    return {result:results,query,offset,totalCount}
}
export default function SearchPokemon({loaderData}: Route.ComponentProps) {
    const viewMode = useViewStore((state) => state.viewMode)
  const setViewMode = useViewStore((state)=> state.setViewMode)
    const {result,query,offset,totalCount} = loaderData
        const limit = 20;
        const maxPages = Math.ceil(totalCount/limit);
         if(!offset) {
            return (
                <div>
                    <div className="  flex flex-col justify-center items-center w-full">
                        <div className="relative flex gap-20 mt-6 lg:m-10 items-center lg:gap-250">
                            <ViewToggle viewMode={viewMode} setViewMode={setViewMode}></ViewToggle>
                            <TypeDropdown></TypeDropdown>
                        </div>
                        <h1 className="lg:mt-4 lg:font-bold lg:text-4xl">Search Result: </h1>
                        {viewMode === "grid" && (
                          <ul className="grid lg:grid-cols-4 gap-4 max-w-360 mt-10 p-6">
                            {result.map((pokemon:any) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} view={"grid"}></PokemonCard>))}
                        </ul>
                        )}
                        {viewMode === "list" && (
                        <ul>
                            {result.map((pokemon:any) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} view={"list"}></PokemonCard>
                            ))}
                      </ul>)}
                    </div>
                </div>
               
            )
        }
        const currentPage = offset /limit +1;
       
    return (
        <div>
            <div className="relative flex gap-20 mt-6 lg:m-10 items-center lg:gap-[250px]">
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode}></ViewToggle>
                <TypeDropdown></TypeDropdown>
            </div>
            <h1 className="lg:mt-4 lg:font-bold lg:text-4xl">Search Result: </h1>
            {viewMode === "grid" && (
                      <ul className="grid lg:grid-cols-4 gap-4 max-w-360 mt-10 p-6">
                    {result.map((pokemon:any) => (
                      
                      <PokemonCard key={pokemon.id} pokemon={pokemon} view={"grid"}></PokemonCard>
                     
                      
                      
                    ))}
                  </ul>
                    )}
            
                    {viewMode === "list" && (
                      <ul>
                        {result.map((pokemon:any) => (
                          <PokemonCard key={pokemon.id} pokemon={pokemon} view={"list"}></PokemonCard>
                        ))}
                      </ul>
                    )}
            <div className="flex justify-between mt-12">
        {offset > 0 && (
        <Link to={`/search?q=${query}&offset=${offset - limit}`}><ChevronLeft size={50} className={`bg-black text-white p-3 rounded-sm`}/></Link>
      )}
        <p className="lg:text-2xl lg:font-light lg:mx-10 lg:justify-center lg:items-center lg:flex">{currentPage} / {maxPages}</p>
        {currentPage < maxPages && (
          <Link to={`/search?q=${query}&offset=${offset + limit}`}><ChevronRight size={50} className={`bg-black text-white p-3 rounded-sm `}/></Link>
        )}
        
      </div>
        </div>
    )
}