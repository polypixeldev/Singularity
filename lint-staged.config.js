module.exports = {
	"*.ts": ["eslint --cache --fix", () => "tsc --noEmit"],
	"*": "prettier --write",
};
