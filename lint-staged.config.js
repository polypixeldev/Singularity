export default {
	"*.ts": ["eslint --cache --fix", () => "tsc --noEmit"],
	"*": "prettier --write",
};
