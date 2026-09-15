import { Outlet, useNavigation } from "react-router";
import LoadingSpinner from "~/components/LoadingSpinner";
export default function CollectionLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading"
    return (
        <div>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : <Outlet></Outlet>}
        </div>
    )
}