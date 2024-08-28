export const buildLinks = (docs) => {
    let links = ''
    for (const doc of docs) {
       links += `\n[${doc.name}](${doc.url})`
    }

    return links
}
