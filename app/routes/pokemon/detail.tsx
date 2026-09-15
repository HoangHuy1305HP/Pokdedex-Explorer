    import type {Route} from "./+types/detail";
    import { Button } from "~/components/ui/button";
    import { useFetcher } from "react-router";
    import { fetchGraphQL } from "~/lib/graphql";
    import { TYPE_NAME, DEFAULT_TYPE } from "~/constants/pokemonTypes";
    import { STAT_CONFIG } from "~/constants/statConfig";
    import { useEffect, useState } from "react";
    import { isLiked } from "~/lib/favoriteStroe.server";

    async function fetchPokemonById(id: string) {
        function cleanFlavorText(text:string) {
            return text.replace(/\n|\f/g, " ")
        }
        const query = `
        query GetPokemonDetail($id: Int!) {
        pokemon(where: { id: { _eq: $id } }) {
            id
            name
            pokemonsprites {
                sprites
            }
            pokemontypes { type { name } }
            pokemonstats { base_stat stat { name } }
            pokemonabilities { ability { name } }
            pokemonspecy {
                pokemonspeciesflavortexts(where: { language: { name: { _eq: "en" } } }, limit: 1) {
                    flavor_text
                }
                pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }, limit: 1) {
                    genus
                }
            }
        }
        }
    `;
        const data = await fetchGraphQL(query,{id:Number(id)})

        const pokemon = data.pokemon[0];
        if(!pokemon) {return null}
        const rawText = pokemon.pokemonspecy?.pokemonspeciesflavortexts[0]?.flavor_text ?? "";
        const description = cleanFlavorText(rawText);
        const genus = pokemon.pokemonspecy?.pokemonspeciesnames[0]?.genus ?? "";
        return {...pokemon,description,genus}
    }
    export async function loader({params}:Route.LoaderArgs) {
        const pokemon = await fetchPokemonById(params.id);
        if(!pokemon) {
            throw new Response("Not found", {status:404})
        }
        const isFav = isLiked(params.id)
        return {pokemon,isFav}
    }
    export default function PokemonDetail({loaderData}:Route.ComponentProps) {
        const {pokemon,isFav} = loaderData;
        const fetcher = useFetcher();
        const [showToast,setShowToast] = useState(false);
        const [likeState,setLikeState] = useState(isFav)
        
        useEffect(() => {
            if(fetcher.data?.message) {
                setLikeState(true);
                setShowToast(true);
                const timer = setTimeout(() => setShowToast(false),3000);
                return () => clearTimeout(timer)
            }
        },[fetcher.data]) 

        
        return (
            <div className="flex justify-center items-center m-10">
                <div className="lg:flex justify-center gap-20 ">
                    <div className="flex-shrink-0">
                        <img 
                            src={pokemon.pokemonsprites[0].sprites.other.home.front_default} 
                            className="bg-gray-200 rounded-sm object-contain size-[200px] lg:size-[450px]"
                        />
                    </div>

                    <div>
                        <div className="flex mt-6">
                            <h1 className="lg:text-[48px] font-semibold">{pokemon.name} | <h2 className="text-gray-300 lg:font-extralight">{pokemon.genus}</h2> </h1>
                        </div>
                        
                        <ul className="flex">{pokemon.pokemontypes.map((t:any) => {
                            const typeStyle = TYPE_NAME[t.type.name] ?? DEFAULT_TYPE;
                                        return (
                                            <div className="flex">
                                                <li key={t.type.name} className={`${typeStyle.bg} ${typeStyle.color} rounded-sm text-white  text-sm font-bold leading-tight mr-2 py-2 px-3 text-center select-none whitespace-nowrap`}>{t.type.name}</li>
                                            </div>
                                        
                                        )}
                            
                            )}
                        </ul>
                        <div className="mt-6">
                            <h3 className="text-3xl mb-3">Chỉ số</h3>
                            <ul className="lg:flex">{pokemon.pokemonstats.map((s:any) => {
                                const config = STAT_CONFIG[s.stat.name] ?? { label: s.stat.name, icon: null, color: "text-gray-500" };
                                const Icon = config.icon
                                return (
                                    <div className="gap-4 mr-4 ">
                                        <li key={s.stat.name} className={`flex ${config.bg} w-48 gap-2 mt-2 p-2 rounded-sm items-center text-center justify-center`}>
                                        {Icon && <Icon size={18} className={`${config.color}`}></Icon>}
                                        <span>{s.base_stat}</span>
                                    </li>
                                    </div>
                                    
                                )
                            }
                                
                            
                            )}
                            </ul>
                        </div>
                        
                        <div className="mt-6">
                            <h3 className="text-3xl mb-3">Kỹ năng đặc biệt</h3>
                            <ul className="flex gap-4">
                                {pokemon.pokemonabilities.map((a:any) => (
                                <li key={a.ability.name} className="bg-black text-white p-2 rounded-sm lg:hover:bg-white hover:text-black transition-colors">#{a.ability.name}</li>
                                ))}
                            </ul>
                        </div>
                        
                    
                            {!likeState && (
                                <div>
                                <fetcher.Form method="post" action="/favorites">
                                    <input type="hidden" name="pokemonId" value={pokemon.id} />
                                    <input type="hidden" name="intent" value="add" />
                                <Button type="submit" variant={"outline"} className={`mt-6 mb-2 gap-2 p-4 lg:text-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600`}>❤️ Yêu thích</Button>
                                </fetcher.Form>
                            </div>
                            ) }
                            
                        

                        
                        
                            {showToast &&
                            <div className="fixed top-40 left-14 lg:top-auto lg:left-auto  lg:bottom-6 lg:right-6 bg-black text-white px-4 py-3 rounded-lg shadow-lg">
                                {fetcher.data!.message}
                            </div>
                            }
                        
                        
                        
                    </div>
                    
                </div>
                
                
                
                
            </div>
        )
    }

