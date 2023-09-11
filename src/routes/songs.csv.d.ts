export interface SongSrc {
	'\ufeffname': string
	tags: string
	remark: string
}
export interface Song {
	name: string
	tags: string[]
	remark: string
}
const songs: SongSrc[]
export default songs
