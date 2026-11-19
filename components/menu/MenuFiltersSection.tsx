import MenuFilters from "@/components/menu/MenuFilters";
import { getMenuLocations } from "@/lib/fetch";

// loads the list of areas on the server, then hands it to the filters
export default async function MenuFiltersSection() {
    const locations = await getMenuLocations();
    return <MenuFilters locations={locations} />
}
