import node_geocoder from "node-geocoder";

const options = {
    provider: "openstreetmap"
}

const geocoder = node_geocoder(options)

export async function getCoordinates(address) {
    try {
        const res = await geocoder.geocode(address);
        console.log(res[0]);
        const coordinates = res[0];
        return coordinates
    } catch (error) {
        console.error("Geocoding error", error);
    }
}