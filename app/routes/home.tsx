import type { Route } from "./+types/home";
import { useState } from "react";
import { Link } from "react-router";
import ViewToggle from "~/components/ViewToggle";
import { TypeDropdown } from "~/components/TypeDropdown";
import { fetchGraphQL } from "~/lib/graphql";
import { TYPE_NAME, DEFAULT_TYPE } from "~/constants/pokemonTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptionView from "~/components/OptionView";
import PokemonCard from "~/components/pokemon/PokemonCard";
import { useViewStore } from "~/stores/useViewStore";
async function fetchPokemon(offset:number) {
  const query = `
        query GetPokemons($limit: Int, $offset: Int) {
          pokemon(limit:$limit,offset:$offset) {
            id
            name
            pokemontypes {
              type {
                name
              }
        }
            pokemonsprites {
              sprites
            }
          }
        }
  `
  const data = await fetchGraphQL(query, {limit:20,offset})
  return data.pokemon
}


export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset")) || 0;
  const pokemonList = await fetchPokemon(offset);
  return {pokemonList,offset}
}

export default function Home({loaderData}:Route.ComponentProps) {
  const viewMode = useViewStore((state) => state.viewMode)
  const setViewMode = useViewStore((state)=> state.setViewMode)
  const {pokemonList,offset} = loaderData;
  // const [viewMode, setViewMode] = useState<"grid"|"list">("grid");
  const limit = 20;
  const maxPages = 8;
  const currentPage = offset /limit +1
  if(!pokemonList) {
    return false
  }
  return (
    <div>
      
      <div className="  flex flex-col justify-center items-center w-full">
        <div className="realtive flex gap-20 mt-6 lg:m-10  items-center lg:gap-250 ">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode}></ViewToggle>
          <TypeDropdown></TypeDropdown>
        </div>
        {viewMode === "grid" && (
          <ul className="grid lg:grid-cols-4 gap-4 max-w-360 mt-10 p-6">
        {pokemonList.map((pokemon:any) => (
          
          <PokemonCard key={pokemon.id} pokemon={pokemon} view={"grid"}></PokemonCard>
         
          
          
        ))}
      </ul>
        )}

        {viewMode === "list" && (
          <ul>
            {pokemonList.map((pokemon:any) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} view={"list"}></PokemonCard>
            ))}
          </ul>
        )}

      
      <div className="flex justify-between mt-12 mb-2">
        {offset > 0 && (
        <Link to={`/?offset=${offset - limit}`}><ChevronLeft size={50} className={`bg-black text-white p-3 rounded-sm`}/></Link>
      )}
        <p className="lg:text-2xl lg:font-light lg:mx-10 lg:justify-center lg:items-center lg:flex">{currentPage} / {maxPages}</p>
        {currentPage < maxPages && (
          <Link to={`/?offset=${offset + limit}`}><ChevronRight size={50} className={`bg-black text-white p-3 rounded-sm `}/></Link>
        )}
        
      </div>
      
    </div>

    </div>
    
  )
}
