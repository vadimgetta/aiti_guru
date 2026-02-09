import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { queryClient } from "@/shared/api";
import {
	Button,
	Heading,
	Input,
	InputLabel,
	Modal,
	Spinner,
	Notification
} from "@/shared/components";
import { QUERY_KEYS } from "@/shared/config";
import { PlusIcon } from "@/shared/icons";
import type { IProduct, IProductResponse } from "@/shared/model";

import { createProduct } from "../api/create-product";
import type { IProductForm } from "../model/add-product-form";

import styles from "./styles.module.scss";

export const AddProduct = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [isOpenNotification, setIsOpenNotification] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IProductForm>({
		mode: "onSubmit"
	});

	const { mutate, isPending } = useMutation<IProduct, Error, IProductForm>({
		mutationFn: (data) => createProduct(data),
		onSuccess: (newProduct) => {
			// Если был бы настоящий сервер
			// queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
			// Это для теста
			queryClient.setQueriesData<InfiniteData<IProductResponse>>(
				{ queryKey: [QUERY_KEYS.PRODUCTS] },
				(oldData) => {
					if (!oldData) {
						return oldData;
					}
					return {
						...oldData,
						pages: oldData.pages.map((page, index) =>
							index === 0
								? {
										...page,
										products: [newProduct, ...page.products],
										total: page.total + 1
									}
								: page
						)
					};
				}
			);
			setIsOpenForm(false);
			reset();
			setIsOpenNotification(true);
		}
	});

	const onSubmit = async (data: IProductForm) => {
		mutate(data);
		setIsOpenForm(false);
	};
	return (
		<>
			<Button
				appearance="primary"
				onClick={() => setIsOpenForm(true)}
				className={styles.button}
			>
				<PlusIcon /> Добавить
			</Button>
			<Modal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
				<Heading centred level={3}>
					Добавить товар
				</Heading>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<InputLabel
						error={errors.title?.message}
						idForLabel="title"
						title="Название"
						disabled={isPending}
					>
						<Input
							placeholder="Название"
							type="text"
							{...register("title", { required: "Введите логин" })}
							appearance="primary"
							error={!!errors.title}
						/>
					</InputLabel>
					<InputLabel
						idForLabel="brand"
						title="Вендор"
						error={errors.brand?.message}
						disabled={isPending}
					>
						<Input
							placeholder="Вендор"
							type="text"
							{...register("brand", { required: "Введите вендор" })}
							appearance="primary"
							error={!!errors.brand}
						/>
					</InputLabel>
					<InputLabel
						idForLabel="category"
						title="Категория"
						error={errors.category?.message}
						disabled={isPending}
					>
						<Input
							placeholder="Категория"
							type="text"
							{...register("category", { required: "Введите категорию" })}
							appearance="primary"
							error={!!errors.category}
						/>
					</InputLabel>
					<InputLabel
						idForLabel="price"
						title="Цена"
						error={errors.price?.message}
						disabled={isPending}
					>
						<Input
							placeholder="Цена"
							type="number"
							step="0.01"
							min={0}
							{...register("price", {
								required: "Введите цену",
								valueAsNumber: true,
								validate: (value) => {
									if (isNaN(value)) {
										return "Цена должна быть числом";
									}
									if (value < 0) {
										return "Цена не может быть отрицательной";
									}
									return true;
								}
							})}
							appearance="primary"
							error={!!errors.price}
						/>
					</InputLabel>
					<InputLabel
						idForLabel="stock"
						title="Количество"
						error={errors.stock?.message}
						disabled={isPending}
					>
						<Input
							placeholder="Количество"
							type="number"
							{...register("stock", {
								required: "Введите количество",
								valueAsNumber: true
							})}
							appearance="primary"
						/>
					</InputLabel>
					<InputLabel
						idForLabel="rating"
						title="Рейтинг"
						error={errors.rating?.message}
						disabled={isPending}
					>
						<Input
							placeholder="Рейтинг"
							type="number"
							step="1"
							{...register("rating", {
								required: "Введите рейтинг",
								valueAsNumber: true,
								validate: (value) => {
									if (isNaN(value)) {
										return "Рейтинг должен быть числом";
									}
									if (value < 1 || value > 5) {
										return "Рейтинг должен быть от 1 до 5";
									}
									return true;
								}
							})}
							appearance="primary"
						/>
					</InputLabel>

					<Button type="submit" disabled={isPending} appearance="primary">
						{isPending ? (
							<Spinner size="sm" appearence="secondary" />
						) : (
							"Добавить"
						)}
					</Button>
				</form>
			</Modal>
			<Notification
				message="Товар успешно добавлен"
				isOpen={isOpenNotification}
				type="success"
				onClose={() => setIsOpenNotification(false)}
			/>
		</>
	);
};
