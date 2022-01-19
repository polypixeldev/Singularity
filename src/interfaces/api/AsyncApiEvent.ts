export default interface AsyncApiEvent {
	code: number | Promise<number>;
}
