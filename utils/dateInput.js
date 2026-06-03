export function getTodayDateInputValue() {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${now.getFullYear()}-${month}-${day}`;
}

export function parseDateInputValue(value) {
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day, 12, 0, 0);
}
