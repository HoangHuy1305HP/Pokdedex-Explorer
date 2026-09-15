let favoritedPokemonIds: string[] = []

export function getFavorite() {
    return favoritedPokemonIds
}
export function addFavorite(id:string) {
     favoritedPokemonIds.push(id)
}

export function removeFavorite(id:string) {
    return favoritedPokemonIds =  favoritedPokemonIds.filter((fid) => fid !== id)
}

export function isLiked(id:string) {
    return favoritedPokemonIds.includes(id)
}