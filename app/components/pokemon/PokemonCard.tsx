import { Link } from "react-router";
import { TYPE_NAME, DEFAULT_TYPE } from "~/constants/pokemonTypes";
export default function PokemonCard({pokemon,view}:{pokemon:any,view:"grid"|"list"}) {
    return (
        
        <div>
            {view === "grid" && (
              <div className="border-solid border-2 rounded-sm lg:transition lg:duration-200 lg:hover:-translate-y-1 lg:hover:shadow-lg">
                <Link to={`/pokemon/${pokemon.id}`}>
              <div className=" w-full overflow-hidden  rounded-lg p-4">
                <img src={pokemon.pokemonsprites[0].sprites.other.home.front_default} className="bg-gray-100 p-4 rounded-sm"></img>
              </div>
            <li  className="lg:pl-4 lg:text-3xl lg:font-serif pl-4 text-2xl font-serif ">#{pokemon.id}</li>
            <li  className="text-4xl font-bold p-4">{pokemon.name}</li>
            <ul className="flex gap-4">{pokemon.pokemontypes.map((t:any) => {

              const typeStyle = TYPE_NAME[t.type.name] ?? DEFAULT_TYPE;
               return (
              <li key={t.type.name} className={`${typeStyle.bg} ${typeStyle.color} rounded-sm text-white  text-sm font-bold leading-tight mr-2 py-2 px-3 text-center select-none whitespace-nowrap p-2 m-4`}>{t.type.name}</li>
            )
            })}
            </ul>
          </Link>
              </div>
                
            )}

            {view === "list" && (
              <Link to={`/pokemon/${pokemon.id}`}>
              <div className=" flex w-360px  lg:w-7xl lg:rounded-lg  border border-gray-400 m-5 hover:scale-105 hover:shadow-lg lg:duration-200">
                 
                <div className="overflow-hidden p-6">
                   <img src={pokemon.pokemonsprites[0].sprites.other.home.front_default} className="bg-gray-100 p-2 size-40"></img>
                </div>
                <div className="p-6 lg:p-4">
                   <li className="text-gray-600 lg:p-3 lg:text-3xl lg:font-serif">#{pokemon.id}</li>
                  <li className="lg:font-bold lg:text-4xl lg:p-2">{pokemon.name}</li>
                  <ul className="lg:flex justify-center">
                    {pokemon.pokemontypes.map((t:any) => {
                       const typeStyle = TYPE_NAME[t.type.name] ?? DEFAULT_TYPE;
                       return (
                        <li key={t.type.name} className={`${typeStyle.bg} ${typeStyle.color}  m-2 text-center px-2 py-1 p-2 lg:w-[120px] rounded-sm`}>{t.type.name}</li>
                       )
                    }
                     
                    )}
                  </ul>
                </div>
               
              </div>
              </Link>
             
            )} 
            
        </div>
    )
}