import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
        
        route("pokemon/:id","routes/pokemon/detail.tsx"),
        layout("layouts/browse-layout.tsx", [
            index("routes/home.tsx"),
            route("search","routes/search.tsx"),
            route("type/:name","routes/type.tsx"),
            route("favorites","routes/favorites.tsx")
            
            
        ])
    ] satisfies RouteConfig;
