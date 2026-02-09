import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Heading, Input, Modal } from "@/shared/components";
import { PlusIcon } from "@/shared/icons";

import type { IProductForm } from "../model/add-product-form";

import styles from "./styles.module.scss";

export const AddProduct = () => {
	const [openForm, setOpenForm] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IProductForm>({
		mode: "onSubmit"
	});
	return (
		<>
			<Button
				appearance="primary"
				onClick={() => setOpenForm(true)}
				className={styles.button}
			>
				<PlusIcon /> Добавить
			</Button>
			<Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
				<Heading centred level={3}>
					Добавить товар
				</Heading>
				<form className={styles.form}>
					<label htmlFor="">
						<Input
							placeholder="Название"
							type="text"
							{...register("title")}
							appearance="primary"
						/>
					</label>
					<label htmlFor="">
						<Input
							placeholder="Артикул"
							type="text"
							{...register("sku")}
							appearance="primary"
						/>
					</label>
					<label htmlFor="">
						<Input
							placeholder="Вендор"
							type="text"
							{...register("brand")}
							appearance="primary"
						/>
					</label>
					<label htmlFor="">
						<Input
							placeholder="Категория"
							type="text"
							{...register("category")}
							appearance="primary"
						/>
					</label>
					<label htmlFor="">
						<Input
							placeholder="Цена"
							type="number"
							{...register("price")}
							appearance="primary"
						/>
					</label>
					<label htmlFor="">
						<Input
							placeholder="Количество"
							type="number"
							{...register("stock")}
							appearance="primary"
						/>
					</label>
				</form>
			</Modal>
		</>
	);
};
