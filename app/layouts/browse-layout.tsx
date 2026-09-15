import { Outlet } from "react-router";
import { useNavigation } from "react-router";
import LoadingSpinner from "~/components/LoadingSpinner";
export default function BrowseLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
    <div>
      {isLoading ? <LoadingSpinner /> : <Outlet />}
    </div>
        
    )
}