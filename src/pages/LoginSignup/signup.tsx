import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import useAxios from 'axios-hooks';

import { LoginContext } from '../../Contexts/LoginContext';
import FeedbackText from '../../Components/FeedbackText';
import Loader from '../../Components/Loader';
import './LoginSignup.styles.scss';

/*
    This is the signup page. UI and functionalities would be added here
*/

enum focusType {
	Add = 'ADD',
	Remove = 'REMOVE',
}

type FormValues = {
	username: string;
	password: string;
};

const Signup: FC = () => {
	const [message, setMessage] = useState<string>('');
	const [passwordType, setPasswordType] = useState<string>('password');
	const [buttonActive, setButtonActive] = useState<boolean>(false);
	const passwordDiv = useRef<HTMLDivElement>(null);
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const { setLoggedInUser } = useContext(LoginContext)!;

	// watch for when the username and password values change
	const watchFields: string[] = watch(['username', 'password']);

	const focusHandler = (type: focusType) => {
		if (type === focusType.Add) {
			passwordDiv.current!.classList.add('focus');
		} else if (type === focusType.Remove) {
			passwordDiv.current!.classList.remove('focus');
		} else {
			return;
		}
	};

	const [{ loading }, handleSignup] = useAxios(
		{
			url: '/auth/register',
			method: 'post',
		},
		{ manual: true }
	);

	const onSubmit = async (data: FormValues) => {
		try {
			const response = await handleSignup({ data });
			const loggedInUser = {
				userId: response.data.result.user._id,
				username: response?.data?.result?.user?.username,
				token: response?.data?.result?.token,
			};
			localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
			setLoggedInUser(loggedInUser);
		} catch (error: any) {
			setMessage(error?.response?.data?.message);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	useEffect(() => {
		// disable or enable submit button based on username and password value length
		if (watchFields[0]?.length && watchFields[1]?.length) {
			setButtonActive(true);
		} else {
			setButtonActive(false);
		}
	}, [watchFields]);

	return (
		<>
			{message && <FeedbackText message={message} white />}

			<section id='signup'>
				<div className='signup__container'>
					<h1 className='get__started'>Welcome to Employees Get Information</h1>
					<div className='arrow__down'>{/* <ArrowDown /> */}</div>
					<form
						action=''
						className='signup__form'
						onSubmit={handleSubmit(onSubmit)}
					>
						<h3 className='follow__up__text'>Signup</h3>
						<div className='form__group'>
							<label htmlFor='username'></label>
							<input
								className={`${errors.username?.message ? 'red' : ''}`}
								type='text'
								id='username'
								placeholder='Username'
								{...register('username', {
									required: true,
									// pattern: {
									// 	value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									// 	message: 'username field is required',
									// },
								})}
								required
							/>
							{errors.username?.message && (
								<p className='error_message'>{errors.username?.message}</p>
							)}
						</div>
						<div className='form__group'>
							<label htmlFor='password'></label>
							<div
								className={`password__eye__div ${
									errors.password?.message ? 'red' : ''
								}`}
								ref={passwordDiv}
							>
								<input
									type={passwordType}
									id='password'
									placeholder='Password'
									{...register('password', {
										required: true,
										pattern: {
											value:
												/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
											message:
												'Password should be at least 8 characters, 1 uppercase letter, 1 lowercase leter, 1 number & 1 Symbol',
										},
									})}
									onFocus={() => focusHandler(focusType.Add)}
									onBlur={() => focusHandler(focusType.Remove)}
									required
								/>
								<span
									className={
										passwordType === 'password'
											? 'eye__slash'
											: 'eye__slash none'
									}
									onClick={() => setPasswordType('text')}
								>
									<AiFillEyeInvisible />
								</span>
								<span
									className={passwordType === 'text' ? 'eye' : 'eye none'}
									onClick={() => setPasswordType('password')}
								>
									<AiFillEye />
								</span>
							</div>
							{errors.password?.message && (
								<p className='error_message'>{errors.password?.message}</p>
							)}
						</div>

						<button className='submit__button' disabled={!buttonActive}>
							{loading ? <Loader /> : 'SIGNUP'}
						</button>

						<div className='reset__password__link'>
							<p className='forgot__password'>
								Already have an account? &nbsp;
								<Link to='/login'>Login</Link>
							</p>
						</div>
					</form>

					<p className='copyright__text'>© Copyright pmcrg 2021.</p>
				</div>
			</section>
		</>
	);
};

export default Signup;
