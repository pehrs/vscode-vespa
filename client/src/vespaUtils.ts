
export async function fetchWithTimeout(resource, timeout: number = 2000): Promise<Response> {
    const options = { timeout: timeout };

    return fetch(resource, {
        ...options,
        // signal: controller.signal
        signal: AbortSignal.timeout(timeout)
    });
}

export function fetchJson(endpoint: URL): Promise<any> {
    return fetchWithTimeout(endpoint)
        .then(response => response.json())
        .then(theJson => {
            return {
                state: "ok",
                endpoint: endpoint,
                response: theJson,
            };
        })
        .catch(reason => {
            return {
                state: "ERROR",
                endpoint: endpoint,
                reason: reason,
            };
        });
}

export function getEndpointFromCatalogData(clusterCatalogData: any) {
    const links = clusterCatalogData.metadata.links;
    if (links) {
        return links.filter(link => {
            return link.type === "vespa-endpoint";
        }).map(link => {
            return link.url;
        }).shift();
    } else {
        return undefined;
    }
}



// FIXME: Lookup the application config values
// App config values
const tenant = "default";
const application = "default";
const environment = "prod";
const region = "default";
const instance = "default";

// export const vespa_content_path_prefix = `/application/v2/tenant/${tenant}/application/${application}/environment/${environment}/region/${region}/instance/${instance}/content`;

// export function vespaContentURL(endpoint: string, contentPath: string): URL {
//     const url = `${endpoint}${vespa_content_path_prefix}/${contentPath}`;
//     return new URL(url);
// }

// export async function fetchVespaContentAsyncDeprecated(endpoint: string, clusterName: string, contentPath: string): Promise<any> {
//     if (endpoint === undefined) {
//         return undefined;
//     }
//     return fetch(vespaContentURL(endpoint, contentPath));
// }

