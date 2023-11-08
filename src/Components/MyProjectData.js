import {
	FaCss3Alt,
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
	SiChakraui,
	SiElectron,
	SiExpress,
	SiMongodb,
} from 'react-icons/si';
import { GiOpenBook } from 'react-icons/gi';
export const startLink = '';

export const myPersonalInfo = [
	{ id: 201, title: 'Frist Name: ', info: 'Ashish' },
	{ id: 202, title: 'Last Name: ', info: 'Gaikwad' },
	{ id: 203, title: 'Birthdate: ', info: '12 Aug 2001' },
	{ id: 204, title: 'Nationality: ', info: 'Indian' },
	{ id: 205, title: 'Langages: ', info: 'English, Hindi, Marathi' },
	{ id: 206, title: 'Phone: ', info: '+91 9021823547' },
	{ id: 207, title: 'Email: ', info: 'mr.ashishgg.com' },
	{ id: 208, title: 'Freelance: ', info: 'Available', color: '#01ef92' },
];

export const skills = [
	{ id: 201, title: 'HTML', icon: <FaHtml5 />, color: '#e56229' },
	{ id: 202, title: 'CSS', icon: <FaCss3Alt />, color: '#007FFF' },
	{ id: 203, title: 'JavaScript', icon: <DiJavascript1 />, color: '#EAD41C' },
	{ id: 204, title: 'React', icon: <FaReact />, color: '#00CEF2' },
	{ id: 205, title: 'Electron', icon: <SiElectron /> },
	{ id: 206, title: 'Node.js', icon: <FaNode />, color: '#5CA74B' },
	{ id: 207, title: 'Express', icon: <SiExpress /> },
	{ id: 208, title: 'MongoDB', icon: <SiMongodb />, color: '#4E9E42' },
];

export const otherSkills = [
    
	{ id: 210, title: 'Material UI', icon: document.querySelector("#__next > header > div > a > svg"), color: '#007FFF' },
	{ id: 209, title: 'Chakra UI', icon: <SiChakraui />, color: '#38B2AC' },
	{ id: 211, title: 'Github', icon: <FaGithub /> },
	{ id: 212, title: 'Git', icon: <FaGitAlt />, color: '#DE4C36' },
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