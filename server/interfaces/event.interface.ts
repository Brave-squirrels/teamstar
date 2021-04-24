export default interface Event {
    _id: string,
    author: {
        id: string,
        name: string
    }
    title: string,
    start: Date,
    end: Date,
    desc?: string,
    fromHour: string,
    toHour: string
}