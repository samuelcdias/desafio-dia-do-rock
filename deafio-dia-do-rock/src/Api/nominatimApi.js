export default class NominatimApi {
    constructor() {
        this.baseUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';
        this.details = 1;
    }

    async getAddressDetails(query) {
        query = encodeURI(query);
        const response = await fetch(`${this.baseUrl}${query}&addressdetails=${this.details}`);
        const data = await response.json();
        const retorno = [];
        data.forEach((item) => {
            if(retorno.filter((x) => x.display_name === item.display_name).length === 0) {
                retorno.push(item);
            }
        })

        return retorno;
    }
}
