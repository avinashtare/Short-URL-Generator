export const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    // Get components
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();

    // Format as "08:43:49 06-30-2024"
    return `${hours}:${minutes}:${seconds} ${month}-${day}-${year}`;
}