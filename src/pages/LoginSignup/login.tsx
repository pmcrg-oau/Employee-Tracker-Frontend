import { FC, useContext, useEffect, useRef, useState } from 'react';
import useAxios from 'axios-hooks';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { LoginContext } from '../../Contexts/LoginContext';
import FeedbackText from '../../Components/FeedbackText';
import Loader from '../../Components/Loader';
import './LoginSignup.styles.scss';

/*
    This is the login page. UI and functionalities would be added here
*/

enum focusType {
	Add = 'ADD',
	Remove = 'REMOVE',
}

type FormValues = {
	username: string;
	password: string;
};

const Login: FC = () => {
	const [message, setMessage] = useState<string>('');
	const [passwordType, setPasswordType] = useState<string>('password');
	const [buttonActive, setButtonActive] = useState<boolean>(false);
	const passwordDiv = useRef<HTMLDivElement>(null);
	const { register, watch, handleSubmit } = useForm<FormValues>();
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

	const [{ loading }, handleLogin] = useAxios(
		{
			url: '/auth/login',
			method: 'post',
		},
		{ manual: true }
	);

	const onSubmit = async (data: FormValues) => {
		try {
			const response = await handleLogin({ data });
			const loggedInUser = {
				userId: response.data.data.user._id,
				username: response?.data?.data?.user?.username,
				token: response?.data?.data?.token,
			};
			localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
			setLoggedInUser(loggedInUser);
		} catch (error: any) {
			setMessage(error?.response?.data?.message);
			setTimeout(() => {
				setMessage('');
			},5000);
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

			<section id='login'>
				<div className='login__container'>
					<h1 className='get__started'>Welcome to Employees Get Information</h1>
					<div className='arrow__down'>{/* <ArrowDown /> */}</div>
					<form
						action=''
						className='login__form'
						onSubmit={handleSubmit(onSubmit)}
					>
						<h3 className='follow__up__text'>Login</h3>
						<div className='form__group'>
							<label htmlFor='username'></label>
							<input
								type='username'
								id='username'
								placeholder='Username'
								{...register('username', {
									required: true,
								})}
								required
							/>
						</div>
						<div className='form__group'>
							<label htmlFor='password'></label>
							<div className='password__eye__div' ref={passwordDiv}>
								<input
									type={passwordType}
									id='password'
									placeholder='Password'
									{...register('password', {
										required: true,
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
						</div>

						<button className='submit__button' disabled={!buttonActive}>
							{loading ? <Loader /> : 'LOG IN'}
						</button>

						{/* <div className='reset__password__link'>
							<p className='forgot__password'>
								Don't have an account? &nbsp;
								<Link to='/signup'>Signup</Link>
							</p>
						</div> */}
					</form>

					<p className='copyright__text'>© Copyright pmcrg 2021.</p>
				</div>
			</section>
		</>
	);
};

export default Login;
