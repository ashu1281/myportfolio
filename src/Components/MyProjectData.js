import { SvgIcon } from '@mui/material';
import materialUi from '../Images/materialUi.png';
import electronPorjectImg from '../Images/pojectImages/electronPoject.png';
import portfolioImg from '../Images/pojectImages/portfolio.png';
import {
	FaCss3Alt,
	FaDatabase,
	FaGitAlt,
	FaGithub,
	FaHtml5,
	FaLanguage,
	FaLaptopCode,
	FaNode,
	FaReact,
	FaToolbox,
} from 'react-icons/fa';
import { DiJavascript1 } from 'react-icons/di';
import {
	SiElectron,
	SiExpress,
	SiMongodb,
} from 'react-icons/si';
import { GiOpenBook } from 'react-icons/gi';
export const startLink = '';

export const myPersonalInfo = [
	{ id: 101, title: 'Frist Name: ', info: 'Ashish' },
	{ id: 102, title: 'Last Name: ', info: 'Gaikwad' },
	{ id: 103, title: 'Birthdate: ', info: '12 Aug 2001' },
	{ id: 104, title: 'Nationality: ', info: 'Indian' },
	{ id: 105, title: 'Langages: ', info: 'English, Hindi, Marathi' },
	{ id: 106, title: 'Phone: ', info: '+91 9021823547' },
	{ id: 107, title: 'Email: ', info: 'mr.ashishgg.com' },
	{ id: 108, title: 'Freelance: ', info: 'Available', color: '#01ef92' },
];

export const skills = [
	{ id: 201, title: 'C', icon: <FaLanguage />, color: '#A8B9CC' },
	{ id: 202, title: 'C++', icon: <FaLanguage />, color: '#00599C' },
	{ id: 203, title: 'SQL', icon: <FaDatabase />, color: '#F29111' },
	{ id: 204, title: 'HTML', icon: <FaHtml5 />, color: '#e56229' },
	{ id: 205, title: 'CSS', icon: <FaCss3Alt />, color: '#007FFF' },
	{ id: 206, title: 'JavaScript', icon: <DiJavascript1 />, color: '#EAD41C' },
	{ id: 207, title: 'Node.js', icon: <FaNode />, color: '#5CA74B' },
	{ id: 208, title: 'React', icon: <FaReact />, color: '#00CEF2' },
	{ id: 209, title: 'Electron', icon: <SiElectron /> , color: '#00CEF2'},
	{ id: 210, title: 'Express', icon: <SiExpress /> },
	{ id: 211, title: 'MongoDB', icon: <SiMongodb />, color: '#4E9E42' },
	{ id: 212, title:'Sqlite3', icon: <FaDatabase />, color: '#F29111' },
	
];

export const otherSkills = [
    
	// ...
	{ id: 213, title: 'Material UI', icon: <SvgIcon><img src={materialUi} alt="Material UI" /></SvgIcon>, color: '#007FFF' },
	{ id: 214, title: 'Github', icon: <FaGithub /> },
	{ id: 215, title: 'Git', icon: <FaGitAlt />, color: '#DE4C36' },
];

export const timelineData = [
	{
		date: 'Jun/2016 - March/2017',
		title: 'SSC',
		organization: 'BhagatSingh Vidalaya, Ashta',
		icon: <GiOpenBook />,
	},
	{
		date: 'Jul/2017 - Feb/2019',
		title: 'HSC',
		organization: 'Jay Krati Jr. Science College, Latur',
		icon: <GiOpenBook />,
	},
	{
		date: 'Aug/2019 - May/2023',
		title: 'B.Tech in Computer Engineering',
		organization: 'Govere College of Engineering, Jalgaon',
		icon: <FaLaptopCode />,
	},
	{
		date: 'Jan/2023 - present',
		title: 'Software Engineer at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <FaToolbox />,
	},
];


export const myProjects = [
	{
		id: 301,
		title: 'Devita Watchs',
		img: electronPorjectImg,
		link: 'https://devita-watchs.vercel.app/',
		githubLink: 'https://github.com/e-mustafa/devita-watchs',
		Language: ['HTML', 'CSS', 'Material Ui', 'Javascript', 'React', 'Next'],
		description:
			'Online store for selling wristwatches, Developed using Next js 13 app dirctory, static & dynamic metadata, shopping cart, favorite list, With notifications toast.',
	},
	{
		id: 302,
		title: "My Portfolio",
		img: portfolioImg,
		link: "https://ashishgaikwad.me",
		githubLink:"https://github.com/ashu1281/myportfolio",
		Language: ["HTML", "CSS", "Bootstrap", "Javascript"],
		description:
			"Coffee shop template with edit bootstrap default colors and JavaScript shopping cart, favorite list, register and sign in with validate. With notifications toast. You need to register and sign in to checkout and add items to favorite list.",
	},
	{
		id: 303,
		title: 'Rocher-Furniture Tamplate',
		img: electronPorjectImg,
		link: 'https://e-mustafa.github.io/Tamplate-102-Rocher-Furniture',
		githubLink: 'https://github.com/e-mustafa/Tamplate-102-Rocher-Furniture',
		Language: ['HTML5', 'CSS3'],
		description: 'Rocher-Furniture Tamplate html and some css3.',
	},
	{
		id: 304,
		title: 'Architectural Design Template',
		img: electronPorjectImg,
		link: 'https://e-mustafa.github.io/Tamplate-101/',
		githubLink: 'https://github.com/e-mustafa/Tamplate-101',
		Language: ['HTML', 'CSS'],
		description: 'Architectur Design template html & css only.',
	},
	{
		id: 305,
		title: 'Simple Movies with Redux',
		img: electronPorjectImg,
		link: 'https://simplemovies-redux.netlify.app',
		githubLink: 'https://github.com/e-mustafa/moviesApp-redux',
		Language: ['HTML', 'CSS', 'Material Ui', 'Javascript', 'React', 'Redux'],
		description:
			'Simple movies website to discover popular movies, and add to favorite list, with using Redux.',
	},
	{
		id: 306,
		title: 'Simple Movies',
		img: electronPorjectImg,
		link: 'https://simplemovies-app.netlify.app',
		githubLink: 'https://github.com/e-mustafa/sempleMoviesApp',
		Language: ['HTML', 'CSS', 'Material Ui', 'Javascript', 'React'],
		description:
			'Simple movies website to discover popular movies, and add to favorite list.',
	},
	{
		id: 307,
		title: 'Lusion Shopping',
		img: electronPorjectImg,
		link: 'https://react-lusion-app.netlify.app',
		githubLink: 'https://github.com/e-mustafa/React-Lusion-App',
		Language: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'React'],
		description:
			'Lustion ecommerce web responsive with many pages and form validation.',
	},
	{
		id: 308,
		title: 'Cara Shoping',
		img: electronPorjectImg,
		link: 'https://cara-shoping.vercel.app',
		githubLink: 'https://github.com/e-mustafa/Cara-Shoping',
		Language: ['HTML', 'CSS', 'Bootstrap', 'Javascript'],
		description:
			'responsive ecommerce website main page, sign up and sign in made with js.',
	},
	{
		id: 309,
		title: 'Currency Exchange',
		img: electronPorjectImg,
		link: 'https://currency-exchange-mu.vercel.app',
		githubLink: 'https://github.com/e-mustafa/currencyExchange',
		Language: ['HTML', 'CSS', 'Bootstrap', 'Javascript'],
		description:
			'This is a simple Currency Converter application, I took help from this website, "exchangerate-api" to create an API connection.',
	},
	{
		id: 310,
		title: 'Basic Calculator',
		img: electronPorjectImg,
		link: 'https://basic-calculator-self.vercel.app',
		githubLink: 'https://github.com/e-mustafa/basic-Calculator',
		Language: ['HTML', 'CSS', 'Bootstrap', 'Javascript'],
		description:
			'Basic Calculator for doing simple mathematical operations: addition, subtraction, multiplication, division. This is a simplified version of the online.',
	},
	{
		id: 311,
		title: 'Watch Products',
		img: electronPorjectImg,
		link: 'https://watch-products.vercel.app',
		githubLink: 'https://github.com/e-mustafa/Watch-Products',
		Language: ['HTML', 'CSS', 'Bootstrap'],
		description: 'single page responsive website.',
	},
	{
		id: 312,
		title: 'Template W Carousel',
		img: electronPorjectImg,
		link: 'https://template-w-carousel.vercel.app',
		githubLink: 'https://github.com/e-mustafa/template-w-carousel',
		Language: ['HTML', 'CSS', 'Bootstrap'],
		description: 'single page responsive website.',
	},
];