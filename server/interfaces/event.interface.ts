export default interface Event {
    creator: {
        id: string,
        name: string
    }
    title: string,
    start: Date,
    end: Date,
    desc?: string
}