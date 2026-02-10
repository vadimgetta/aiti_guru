import clsx from "clsx";
import { useSearchParams } from "react-router";

import { ChevronLeftIcon, ChevronRightIcon } from "@/shared/icons";

import styles from "./styles.module.scss";

interface PaginationProps {
	currentPage: number;
	totalItems: number;
	pageSize: number;
	from: number;
	to: number;
	total: number;
}

export const Pagination = ({
	currentPage,
	totalItems,
	pageSize,
	from,
	to,
	total
}: PaginationProps) => {
	const totalPages = Math.ceil(totalItems / pageSize);
	const [searchParams, setSearchParams] = useSearchParams();

	const goToPage = (page: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), page: String(page) });
	};

	const getPageNumbers = (current: number, totalPages: number) => {
		const pages: (number | string)[] = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (current <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages);
			} else if (current >= totalPages - 2) {
				pages.push(
					1,
					"...",
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages
				);
			} else {
				pages.push(
					1,
					"...",
					current - 1,
					current,
					current + 1,
					"...",
					totalPages
				);
			}
		}

		return pages;
	};

	const pageNumbers = getPageNumbers(currentPage, totalPages);

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={styles.pagination}>
			<div className={styles.info}>
				<span className={styles.info__gray}>Показано </span>{" "}
				<span>
					{from}–{to}
				</span>
				<span className={styles.info__gray}>из </span>
				<span>{total}</span>
			</div>

			<div className={styles.actions}>
				<button
					disabled={currentPage === 1}
					className={styles.chevron}
					onClick={() => goToPage(currentPage - 1)}
				>
					<ChevronLeftIcon />
				</button>

				{pageNumbers.map((p, idx) =>
					typeof p === "number" ? (
						<button
							className={clsx(styles.page, {
								[styles.active]: p === currentPage
							})}
							key={idx}
							onClick={() => goToPage(p)}
						>
							{p}
						</button>
					) : (
						<span key={idx} className={styles.ellipsis}>
							{p}
						</span>
					)
				)}

				<button
					disabled={currentPage === totalPages}
					onClick={() => goToPage(currentPage + 1)}
					className={styles.chevron}
				>
					<ChevronRightIcon />
				</button>
			</div>
		</div>
	);
};
