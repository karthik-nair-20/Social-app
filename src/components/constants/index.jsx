import StreamLabsLogo from "../../assets/streamer.jpeg";
import BroadcastlyLogo from "../../assets/broadcastly-logo.png";
import LiveStreamerLogo from "../../assets/livestreamer-logo.png";
import CloudCastLogo from "../../assets/cloudcast-logo.png";

import streamImage from "../../assets/streamer.jpeg";
import chart from "../../assets/chart.png";
import optimize from "../../assets/optimize.jpeg";
import audienceEngagementImage from "../../assets/audience.jpeg";
import monetizeImage from "../../assets/monetize.jpeg";
import automationImage from "../../assets/automation.jpeg";
// import user1 from "../assets/user1.jpeg";
// import user2 from "../assets/user2.jpeg";
// import user3 from "../assets/user3.jpeg";
// import user4 from "../assets/user4.jpeg";
// import user5 from "../assets/user5.jpeg";
// import user6 from "../assets/user6.jpeg";

import {
	RiBarChart2Line,
	RiSettings2Line,
	RiTeamLine,
	RiTwitchLine,
	RiYoutubeLine,
	RiCalendarLine,
} from "@remixicon/react";

export const HERO_CONTENT = {
	badgeText: "🌊 Now Live: A Better Way to Connect",
	mainHeading: "Where Real Connections\nHappen",
	subHeading:
		"Bluewave is a social space to meet people, share ideas, and grow meaningful connections—whether you're networking, collaborating, or just starting conversations that matter.",
	callToAction: {
		primary: "Join Bluewave",
		secondary: "Explore the Community",
	},
	trustedByText: "Trusted by professionals, creators, and communities worldwide",
};

export const BRAND_LOGOS = [
	{ src: StreamLabsLogo, alt: "StreamLabs" },
	{ src: BroadcastlyLogo, alt: "Broadcastly" },
	{ src: LiveStreamerLogo, alt: "LiveStreamer" },
	{ src: CloudCastLogo, alt: "CloudCast" },
];

export const HOW_IT_WORKS_CONTENT = {
	sectionTitle: "How Bluewave Works",
	sectionDescription:
		"Connecting with people on Bluewave is simple and natural. From setting up your profile to building meaningful relationships, every step is designed to feel effortless and authentic.",
	steps: [
		{
			title: "Create Your Profile",
			description:
				"Set up a profile that reflects who you are. Share your interests, goals, and experiences so others can get to know you beyond just a username.",
			imageSrc: streamImage,
			imageAlt: "Profile Setup",
		},
		{
			title: "Discover Like-Minded People",
			description:
				"Explore communities, topics, and profiles tailored to your interests. Find people who genuinely align with what you care about.",
			imageSrc: audienceEngagementImage,
			imageAlt: "Discover People",
			users: ["[user1, user2, user3, user5]"],
		},
		{
			title: "Start Meaningful Conversations",
			description:
				"Engage through thoughtful posts, comments, and direct messages. Bluewave encourages real conversations, not just quick reactions.",
			imageSrc: chart,
			imageAlt: "Conversations and Engagement",
		},
		{
			title: "Grow Your Network",
			description:
				"Build lasting connections by staying active, sharing insights, and supporting others in your network—professionally and personally.",
			imageSrc: optimize,
			imageAlt: "Grow Your Network",
		},
		{
			title: "Share Ideas and Experiences",
			description:
				"Post updates, share knowledge, and highlight moments that matter to you. Your voice helps shape the community.",
			imageSrc: monetizeImage,
			imageAlt: "Sharing Content",
		},
		{
			title: "Stay Connected Effortlessly",
			description:
				"With smart notifications and a clean interface, Bluewave helps you stay connected without feeling overwhelmed.",
			imageSrc: automationImage,
			imageAlt: "Stay Connected",
		},
	],
};


export const KEY_FEATURES_CONTENT = {
	sectionTitle: "Everything You Need to Connect on Bluewave",
	sectionDescription:
		"Core features designed to help you connect, share, and build relationships in a secure and intuitive social environment.",
	features: [
		{
			id: 1,
			icon: <RiBarChart2Line className="w-8 h-8" />,
			title: "Secure Authentication",
			description:
				"Sign up and log in with confidence using a secure and reliable authentication system that keeps your account protected.",
		},
		{
			id: 2,
			icon: <RiSettings2Line className="w-8 h-8" />,
			title: "Follow & Build Your Network",
			description:
				"Follow people you find interesting and grow a personalized network based on shared interests and meaningful interactions.",
		},
		{
			id: 3,
			icon: <RiTeamLine className="w-8 h-8" />,
			title: "Create & Share Content",
			description:
				"Create posts, edit updates, and share thoughts easily. Bluewave gives you full control over what you publish.",
		},
		{
			id: 4,
			icon: <RiTwitchLine className="w-8 h-8" />,
			title: "Edit with Ease",
			description:
				"Update your posts anytime. Make changes effortlessly while keeping your content fresh and relevant.",
		},
		{
			id: 5,
			icon: <RiYoutubeLine className="w-8 h-8" />,
			title: "Manage Your Content",
			description:
				"Delete or organize your posts whenever you need. Your content, your control—always.",
		},
		{
			id: 6,
			icon: <RiCalendarLine className="w-8 h-8" />,
			title: "Privacy & Control",
			description:
				"Decide who sees your content and manage your connections with simple, transparent privacy controls.",
		},
	],
};


export const PLANS_CONTENT = {
	sectionTitle: "Choose Your Plan",
	sectionDescription:
		"Streamerzz offers flexible pricing plans to fit every streamer’s needs, from beginner to pro.",
	popularBadge: "Most Popular",
	ctaText: "Get Started",
	plans: [
		{
			name: "Basic",
			price: "$9.99/month",
			description:
				"Perfect for beginners just starting their streaming journey.",
			features: [
				"Basic analytics",
				"Custom overlays",
				"Viewer engagement tools",
				"Stream up to 720p",
			],
		},
		{
			name: "Pro",
			price: "$19.99/month",
			description:
				"For streamers who want more advanced tools to grow their audience.",
			features: [
				"Advanced analytics",
				"Custom alerts & notifications",
				"HD streaming up to 1080p",
				"Real-time audience insights",
				"Unlimited support",
			],
			popular: true,
		},
		{
			name: "Elite",
			price: "$49.99/month",
			description:
				"For professional streamers who need cutting-edge tools and insights.",
			features: [
				"Premium analytics & reporting",
				"4K Ultra HD streaming",
				"Dedicated account manager",
				"Full API access",
				"Custom branding & overlays",
			],
		},
	],
};

export const TESTIMONIALS_CONTENT = {
	sectionTitle: "What Our Streamers Say",
	sectionDescription:
		"Hear from some of the top streamers who use Streamerzz to engage with their audience and grow their channels.",
	reviews: [
		{
			name: "Alice Johnson",
			title: "Content Creator",
			review: "Bluewave has revolutionized the way we manage our content subscriptions. The intuitive dashboard and real-time analytics have made it easier to track our progress and optimize our offerings. Highly recommended!",
			image: "user1",
		},
		{
			name: "Bob Smith",
			title: "Marketing Specialist",
			review: "The team at Bluewave has been fantastic! Their support is responsive and knowledgeable. The platform itself is versatile and has helped us streamline our subscription management, saving us time and increasing efficiency.",
			image: "user2",
		},
		{
			name: "Carla Mendes",
			title: "Product Manager",
			review: "Bluewave's automated billing and comprehensive analytics have been game-changers for our product team. We can now easily track user engagement and make data-driven decisions to enhance our service offerings.",
			image: "user3",
		},
		{
			name: "David Lee",
			title: "Customer Success Manager",
			review: "Using Bluewave, we’ve been able to increase our customer retention rates. The platform's user-friendly interface and powerful features have provided our customers with a seamless experience, leading to higher satisfaction.",
			image: "user4",
		},
		{
			name: "Ella Fernandez",
			title: "UX Designer",
			review: "Bluewave's flexibility and ease of use have made it a key tool in our design process. We can quickly adjust our subscription plans and monitor the impact on user engagement, allowing for a more responsive approach.",
			image: "user5",
		},
		{
			name: "Frank Wilson",
			title: "Data Analyst",
			review: "Bluewave provides us with detailed insights into our subscription metrics. The advanced reporting tools have enabled us to identify trends and make informed decisions to optimize our growth strategy.",
			image: "user6",
		},
	],
};

export const FOOTER_CONTENT = {
	sections: [
		{
			title: "TOOLS & SERVICES",
			links: [
				{ text: "Real-time Analytics", url: "#" },
				{ text: "Customizable Alerts", url: "#" },
				{ text: "Integrated Chat Systems", url: "#" },
				{ text: "Instant Notifications", url: "#" },
				{ text: "Overlays & Visuals", url: "#" },
				{ text: "Mobile Streaming Support", url: "#" },
				{ text: "4K Stream Capabilities", url: "#" },
				{ text: "Stream Scheduling Tool", url: "#" },
			],
		},
		{
			title: "SUPPORT & RESOURCES",
			links: [
				{ text: "Subscription Plans", url: "#" },
				{ text: "Affiliate Program", url: "#" },
				{ text: "Frequently Asked Questions", url: "#" },
				{ text: "Company Blog", url: "#" },
				{ text: "Subscribe to Newsletter", url: "#" },
				{ text: "Latest Features", url: "#" },
				{ text: "Merchandise Store", url: "#" },
				{ text: "Workshops & Events", url: "#" },
			],
		},
		{
			title: "CONNECT WITH US",
			links: [
				{ text: "Twitter", url: "#" },
				{ text: "Facebook", url: "#" },
				{ text: "TikTok", url: "#" },
				{ text: "LinkedIn", url: "#" },
				{ text: "YouTube", url: "#" },
				{ text: "Twitch", url: "#" },
				{ text: "Discord", url: "#" },
			],
		},
		{
			title: "LEARN & EXPLORE",
			links: [
				{ text: "Engage Viewers with Custom Alerts", url: "#" },
				{
					text: "Top Streaming Strategies for New Streamers",
					url: "#",
				},
				{ text: "How to Stream in 4K for Maximum Quality", url: "#" },
				{ text: "Efficient Stream Scheduling Techniques", url: "#" },
				{ text: "Using Analytics to Boost Engagement", url: "#" },
				{ text: "Create Stunning Overlays for Streams", url: "#" },
				{ text: "Advanced Analytics for Streamers: A Guide", url: "#" },
			],
		},
	],
	platformsText:
		"Streaming Platforms | Twitch | YouTube | Discord | Facebook Gaming",
	copyrightText: "© 2025 Bluewave, Inc. All rights reserved.",
};
