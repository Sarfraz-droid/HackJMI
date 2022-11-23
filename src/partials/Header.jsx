import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useComponentSize } from "../hooks/useComponentSize";

function Header() {
	const [top, setTop] = useState(true);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const menuRef = useRef(null);
	const menuSize = useComponentSize(menuRef);

	// detect whether user has scrolled the page down by 10px
	useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, [top]);

	const [observerMap, setObserverMap] = useState({});
	const [tabData, setTabData] = useState([
		{
			name: "About",
			href: "#about",
		},
		{
			name: "Tracks",
			href: "#tracks",
		},
		{
			name: "Schedule",
			href: "#schedule",
		},
		{
			name: "Sponsors",
			href: "#sponsors",
		},
		{
			name: "Register",
			href: "#register",
		},
		{
			name: "FAQ",
			href: "#faq",
		},
	]);

	useEffect(() => {
		const observers = tabData.map((tab) => {
			const section = document.querySelector(tab.href);
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setObserverMap((prev) => ({
								...prev,
								[tab.href]: true,
							}));
						} else {
							setObserverMap((prev) => ({
								...prev,
								[tab.href]: false,
							}));
						}
					});
				},
				{ threshold: 0.5 }
			);
			observer.observe(section);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer.disconnect());
		};
	}, [observerMap]);

	return (
		<React.Fragment>
			<div
				className="md:hidden absolute z-10 bg-black/40 transition-all"
				style={{
					top: menuSize?.height,
					height: document.body.scrollHeight - menuSize?.height,
					width: "100%",
					opacity: isNavOpen ? 1 : 0,
					pointerEvents: isNavOpen ? "all" : "none",
				}}
			/>

			<header
				className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
					!top && "bg-white backdrop-blur-sm shadow-lg "
				}`}
				ref={menuRef}>
				<div className="max-w-6xl mx-auto px-5 sm:px-6 ">
					<div className="flex items-center justify-between h-16 md:h-20">
						{/* Site branding */}
						<div className="flex-shrink-0 mr-4">
							{/* Logo */}
							<a href="#" className="flex gap-2" aria-label="Cruip">
								<svg
									className="w-8 h-8"
									viewBox="0 0 32 32"
									xmlns="http://www.w3.org/2000/svg">
									<defs>
										<radialGradient
											cx="21.152%"
											cy="86.063%"
											fx="21.152%"
											fy="86.063%"
											r="79.941%"
											id="header-logo">
											<stop stopColor="#F9931C" offset="0%" />
											<stop stopColor="#F9931C" offset="25.871%" />
											<stop stopColor="#F8B05C" offset="100%" />
										</radialGradient>
									</defs>
									<rect
										width="32"
										height="32"
										rx="16"
										fill="url(#header-logo)"
										fillRule="nonzero"
									/>
								</svg>
								<p className="self-center font-bold text-orange-600">#ACK</p>
								<p className="self-center font-semibold">JMI</p>
							</a>
						</div>

						{/* Site navigation */}
						<nav className="md:flex flex-grow hidden">
							<ul className="flex flex-grow justify-end flex-wrap items-center">
								{tabData.map((tab, index) => (
									<li>
										<a
											href={tab.href}
											className={`font-medium text-gray-600 px-5 py-3 flex items-center transition duration-150 ease-in-out 
                      ${observerMap[tab.href] && "text-orange-600 "}
										`}>
											{tab.name}
										</a>
									</li>
								))}
							</ul>
						</nav>

						{/* Mobile menu button */}
						<div className="md:hidden flex items-center">
							<button onClick={() => setIsNavOpen(!isNavOpen)}>
								{!isNavOpen ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>
						</div>

						{/* Mobile menu */}

						<div
							className={`md:hidden absolute w-full bg-white shadow-lg overflow-hidden transition-all`}
							style={{
								top: menuSize?.height,
								maxHeight: !isNavOpen ? 0 : "100vh",
							}}>
							<div className="px-2 pt-2 pb-3 sm:px-3">
								<ul className="flex flex-col flex-grow justify-end flex-wrap items-center">
									{tabData.map((tab, index) => (
										<li key={index}>
											<a
												href={tab.href}
												className={`font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out
											${document.location.hash === tab.href && "text-orange-600 font-semibold"}
										`}>
												{tab.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
		</React.Fragment>
	);
}

export default Header;
