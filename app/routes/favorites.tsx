import type {Route} from "./+types/favorites";
import { useFetcher, useLoaderData } from "react-router";
import { TYPE_NAME, DEFAULT_TYPE } from "~/constants/pokemonTypes";
import { fetchGraphQL } from "~/lib/graphql";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { addFavorite, getFavorite, removeFavorite } from "~/lib/favoriteStroe.server";




async function getFavorites() {
    const favoritePokemonIds = getFavorite();
    const query = `
        query GetFavorites($ids: [Int!]) {
            pokemon(where: {id: {_in: $ids}}) {
                id
                name
                pokemontypes {
                    type {name}
                }
                pokemonsprites {
                    sprites
                }
            }
        }
    `
    const ids = favoritePokemonIds.map((id) => Number(id));
    const data = await fetchGraphQL(query,{ids})
    const result = data.pokemon;
    return {result,favoritePokemonIds};
}
export async function loader() {
    const { result, favoritePokemonIds }= await getFavorites();
    return {pokemonList:result,favoritePokemonIds}
}

function FavoriteItem({id}:{id:string}) {
    const fetcher = useFetcher();

    return (
        <div>
            <li key={id}></li>
            <fetcher.Form method="post">
                <input type="hidden" name="pokemonId" value={id}></input>
                <input type="hidden" name="intent" value="remove"></input>
                <Button type="submit" className={`p-2 mt-2 ml-4 mb-4`}>Xóa khỏi danh sách</Button>
            </fetcher.Form>
        </div>
        
        
        
    )
}
export default function Favorites({loaderData}:Route.ComponentProps) {
    const {pokemonList} = loaderData;
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="lg:text-2xl lg:mt-4 lg:font-extrabold font-extrabold mt-4 max-h-10">Danh sách yêu thích của bạn</h1>
            <ul className="grid lg:grid-cols-4 gap-4 p-10 mt-10">
                {pokemonList.map((pokemon: any) => (
                    <div key={pokemon.id} className="border-solid border-2 rounded-sm lg:transition lg:duration-200 lg:hover:-translate-y-1 lg:hover:shadow-lg">
                         <Link to={`/pokemon/${pokemon.id}`}>
                           <div className="w-full overflow-hidden  rounded-lg p-4">
                                <img src={pokemon.pokemonsprites[0].sprites.other.home.front_default} className="bg-gray-100 p-4"></img>
                            </div>
                            <li  className="lg:pl-4 lg:text-3xl lg:font-serif pl-4 text-2xl font-serif ">#{pokemon.id}</li>
                            <li  className="text-4xl font-bold p-4">{pokemon.name}</li>
                             <ul className="flex gap-4">{pokemon.pokemontypes.map((t:any) => {
                            
                                          const typeStyle = TYPE_NAME[t.type.name] ?? DEFAULT_TYPE;
                                           return (
                                          <li key={t.type.name} className={`${typeStyle.bg} ${typeStyle.color} rounded-sm text-white  text-sm font-bold leading-tight mr-2 py-2 px-3 text-center select-none whitespace-nowrap p-2 m-4`}>{t.type.name}</li>
                                        )
                                        }
                                       )}</ul>
                        </Link>
                         <FavoriteItem id={String(pokemon.id)}></FavoriteItem>
                    </div>
                   
                ))}
            </ul>
        </div>
    )
}

export async function action({request}:Route.ActionArgs) {
    const favoritePokemonIds = getFavorite(); 
    const formData = await request.formData();
    const pokemonId = formData.get("pokemonId") as string;
    const intent = formData.get("intent") as string;

    if(intent === "add" && !favoritePokemonIds.includes(pokemonId)) {
        addFavorite(pokemonId)
        return {success:true, message:`Đã thêm vào danh sách yêu thích`}
    }
    else if (intent === "remove") {
        removeFavorite(pokemonId)
        return {success:true, message:`Đã xóa khỏi danh sách`}
    }
    return {success:true}
}