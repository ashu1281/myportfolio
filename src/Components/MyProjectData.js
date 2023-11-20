import electronPorjectImg from '../Images/pojectImages/electronPoject.png';
import portfolioImg from '../Images/pojectImages/portfolio.png';
import {
	FaCss3Alt,
	FaDatabase,
	FaGitAlt,
	FaGithub,
	FaHtml5,
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
	SiMui,
	SiVisualstudiocode,
	SiC,
	SiCplusplus
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
	{ id: 107, title: 'Email: ', info: 'mr.ashishgg@gmail.com' },
	{ id: 108, title: 'Freelance: ', info: 'Available', color: '#01ef92' },
];

export const skills = [
	{ id: 201, title: 'C', icon: <SiC />, color: '#659ad2' },
	{ id: 202, title: 'C++', icon: <SiCplusplus />, color: '#06f' },
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
	{ id: 213, title: 'Material UI', icon: <SiMui />, color: 'rgb(0, 127, 255)' },
	{ id: 214, title: 'Github', icon: <FaGithub /> },
	{ id: 215, title: 'Git', icon: <FaGitAlt />, color: '#DE4C36' },
	{ id: 216, title: 'VS Code', icon: <SiVisualstudiocode/>, color: '#0066b8' },
];

export const Education = [
	{
		date: 'Jun/2016 - March/2017',
		title: 'SSC',
		organization: 'BhagatSingh Vidyalaya, Ashta',
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
		organization: 'Government College of Engineering, Jalgaon',
		icon: <FaLaptopCode />,
	},
	
];
export const Experience = [
	{
		date: 'Jan/2023 - April/2023',
		title: 'Internship in C++ and C#.NET at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <GiOpenBook />,
	},
	{
		date: 'Aug/2023 - present',
		title: 'Software Engineer at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <FaToolbox />,
	},
];

export const myProjects = [
	{
		id: 301,
		title: 'Scada Application',
		img: electronPorjectImg,
		link: '',
		githubLink: 'https://www.electronjs.org/',
		Language: ['Electron', 'React'],
		description:
		'Desktop SCADA application created using Electron.js and React.js. This application is used to monitor and control the devices connected to the server.',
	},
	{
		id: 302,
		title: "My Portfolio",
		img: portfolioImg,
		link: "https://ashishgaikwad.me",
		githubLink:"https://github.com/ashu1281/myportfolio",
		Language: ['React'],
		description:
					""
		},
	]