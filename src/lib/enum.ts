type EnumInitializer = Record<string | number, string | number>;

type ReverseEnum<T extends EnumInitializer> = {
	[K in keyof T]: T[K];
} & {
	[K in T[keyof T]]: Extract<keyof T, string | number>;
} & {
	_name: string;
	_values: readonly T[keyof T][];
};

export function Enum<T extends EnumInitializer>(
	name: string,
	enumObj: T & Record<keyof T, T[keyof T]>
): ReverseEnum<T> {
	const values = Object.values(enumObj);
	const result = {
		...enumObj,
		...Object.fromEntries(Object.entries(enumObj).map(([key, value]) => [value, key])),
		_name: name,
		_values: values
	} as unknown as ReverseEnum<T>;

	return result;
}
