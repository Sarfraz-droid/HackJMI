import React, { useContext } from "react";
import { DarkThemeContext } from "../pages/Home";
import tracksData from "../data/tracks";

function FeaturesBlocks() {
	const { setIsDarkTheme } = useContext(DarkThemeContext);

	return (
		<section className="relative" id="tracks">
			{/* Section background (needs .relative class on parent and next sibling elements) */}
			<div
				className="hidden absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-orange-600/20 pointer-events-none"
				aria-hidden="true"></div>
			<div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">
					{/* Section header */}
					<div className="mx-auto text-center pb-12 md:pb-20">
						<h2 className={`dark:text-white h2 mb-4`}>Tracks</h2>
						{/* <p className="text-xl italic text-gray-600">
							Will be announced soon!
						</p> */}
						<p className="py-5 flex flex-wrap justify-center">
							{tracksData.map((track, index) => {
								return (
									<div className="w-full md:w-1/3 p-2">
										<div
											className="p-3 w-full h-full flex flex-col  group border-t-4 
											border-black
											dark:border-white/40
											dark:rounded-none
											shadow-none transition-all
											 hover:scale-95
										">
											<div
												className={`text-orange-600 `}
												style={{
													textShadow: "0px 0px 10px #ffa6005e",
												}}>
												{track?.featured && "✨"} {track?.featured}
											</div>
											<div className="flex gap-2">
												<track.icon className="w-6 h-6 self-center dark:text-white" />
												<h1
													className="py-2 self-center text-xl font-semibold dark:text-white
												">
													{track.title}
												</h1>
											</div>
											<div className="flex flex-col">
												<div
													className="text-justify text-gray-500 track-description"
													dangerouslySetInnerHTML={{
														__html: track.description,
													}}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</p>
					</div>

					{/* Items */}
					<div className="max-w-sm mx-auto hidden  gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
						{/* 1st item */}
						<div className=" dk-color relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
							<svg
								className="w-16 h-16 p-1 -mt-1 mb-2"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fillRule="evenodd">
									<rect
										className="fill-current text-orange-600"
										width="64"
										height="64"
										rx="32"
									/>
									<g strokeWidth="2">
										<path
											className="stroke-current text-blue-300"
											d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
										/>
										<path
											className="stroke-current text-white"
											d="M20.571 37.714h5.715L36.57 26.286h8"
										/>
										<path
											className="stroke-current text-blue-300"
											strokeLinecap="square"
											d="M41.143 34.286l3.428 3.428-3.428 3.429"
										/>
										<path
											className="stroke-current text-white"
											strokeLinecap="square"
											d="M41.143 29.714l3.428-3.428-3.428-3.429"
										/>
									</g>
								</g>
							</svg>
							x{" "}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FeaturesBlocks;
