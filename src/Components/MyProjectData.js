import { SvgIcon } from '@mui/material';
import materialUi from '../Images/materialUi.png';
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