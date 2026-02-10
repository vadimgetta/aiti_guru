import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

import { queryClient } from "@/shared/api";
import { Button, CheckBox, Input, InputLabel, Spinner } from "@/shared/components";
import { PAGES_ROUTES } from "@/shared/config";
import { CloseIcon } from "@/shared/icons";

import { handleAuth, getMeOptions } from "../../api";
import type { IAuthParams, IAuthResponse } from "../../model";
import type { IAuthError } from "../../model/auth";
import { saveToken } from "../../utils";

import styles from "./styles.module.scss";

export const LoginForm = () => {
	const [authError, setAuthError] = useState<IAuthError | null>(null);
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<IAuthParams>({
		mode: "onSubmit"
	});

	const { mutate, isPending } = useMutation<IAuthResponse, Error, IAuthParams>({
		mutationFn: async (data: IAuthParams) => handleAuth(data),
		onSuccess: (data) => {
			saveToken(rememberMe, data.accessToken);
			queryClient.fetchQuery(getMeOptions);
			navigate(PAGES_ROUTES.PRODUCTS);
		},
		onError: (error) => {
			setAuthError({ message: error.message });
		}
	});

	const onSubmit: SubmitHandler<IAuthParams> = (data) => {
		setAuthError(null);
		mutate(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.inputs}>
				<InputLabel
					idForLabel="username"
					title="Логин"
					error={errors.username ? errors.username?.message : ""}
					disabled={isPending}
				>
					<div className={styles.inputWrapper}>
						<Input
							type="text"
							id="username"
							appearance="primary"
							placeholder="Логин"
							error={!!errors.username}
							{...register("username", { required: "Введите логин" })}
						/>
						<button
							className={styles.icon}
							onClick={() => setValue("username", "")}
						>
							<CloseIcon />
						</button>
					</div>
				</InputLabel>

				<InputLabel
					idForLabel="password"
					title="Пароль"
					disabled={isPending}
					error={errors.password ? errors.password?.message : ""}
				>
					<Input
						type="password"
						id="password"
						appearance="primary"
						placeholder="Пароль"
						error={!!errors.password}
						{...register("password", { required: "Введите пароль" })}
					/>
				</InputLabel>
				{!!authError && (
					<div className={clsx(styles.error, "centerText")}>
						{authError.message === "Invalid credentials"
							? "Неверный логин или пароль"
							: authError.message}
					</div>
				)}
			</div>

			<div className={styles.remember}>
				<CheckBox
					onChange={(e) => setRememberMe(e.target.checked)}
					checked={rememberMe}
				/>
				<span>Запомнить меня</span>
			</div>

			<Button
				type="submit"
				appearance="primary"
				size="lg"
				disabled={isPending}
				className={styles.button}
			>
				{isPending ? <Spinner appearence="secondary" size="sm" /> : "Войти"}
			</Button>
		</form>
	);
};
