import clsx from "clsx";
import { useSearchParams } from "react-router";

import { Input } from "@/shared/components";
import { SearchIcon } from "@/shared/icons";

import { useSearch } from "../hooks/use-search";

import type { ISearchProps } from "./search.props";
import styles from "./styles.module.scss";

export const Search = ({ className, ...props }: ISearchProps) => {
	const { handleSearch } = useSearch();
	const [searchParams] = useSearchParams();

	const search = searchParams.get("q") ?? "";
	return (
		<form
			className={clsx(className, styles.search)}
			{...props}
			onSubmit={handleSearch}
		>
			<SearchIcon className={styles.icon} />
			<Input
				appearance="secondary"
				placeholder="Найти"
				name="search"
				defaultValue={search}
			/>
		</form>
	);
};
