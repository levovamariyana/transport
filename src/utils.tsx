export async function getConnections(from: string, to: string, date: string, time: string) {
    const params = `from=${from}&to=${to}&date=${date}&time=${time}`;

    try {
        const response = await fetch(`https://transport.opendata.ch/v1/connections?${params}`,
            {
                method: "GET",
            });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export function getTimeFromDate(date: Date) {
    // reference: https://bobbyhadz.com/blog/javascript-get-minutes-with-leading-zero
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}